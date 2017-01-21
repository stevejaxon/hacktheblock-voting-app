
pragma solidity ^0.4.4;

contract RankedVote{

    address public chairman; // Has the right.
    mapping (uint256 => mapping(address => bool)) public authorization; // authorization[groupID][voter] == true if voter belongs to voting group ID.
    string[] public votingGroupNames;

    struct Issue {
        string name; // Description of the issue.
        uint256 voterGroup; // Voter group allowed on an issue.
        uint256 begin; // Timestamp the vote begins.
        uint256 end; // Timestamp the vote ends.
        bytes32[] proposals;
        uint256[][] votes; // List of list of order.
        mapping (address => bool) hasVoted;
        uint256 winner;
    }


    Issue[] public issues;

    modifier onlyChairman() {
        if (msg.sender != chairman)
            throw;
        _;
    }

    // Constructor.
    function RankedVote() {
        chairman=msg.sender;
    }

    // Create a new group of voters.
    function createVotingGroup(string name) onlyChairman {
        votingGroupNames.push(name);
    }

    // Add rights to vote.
    function addVotingRights(address[] voters, uint256 groupID) onlyChairman {
        for (uint256 i;i<voters.length;++i)
            authorization[groupID][voters[i]]=true;
    }

    // Remove rights to vote.
    function removeVotingRights(address[] voters, uint256 groupID) onlyChairman {
        for (uint256 i;i<voters.length;++i)
            authorization[groupID][voters[i]]=false;
    }

    // Create an issue.
    function createIssue(uint256 _voterGroup, uint256 _begin, uint256 _end, string _name, bytes32[] names) onlyChairman returns(uint256) {
        if (_end < _begin) // Vote must last some time.
            throw;
        if (_begin < now) // Can't start in the past.
            throw;

        uint256 issueID = issues.length++;
        Issue issue = issues[issueID];

        issue.name = _name;
        issue.voterGroup = _voterGroup;
        issue.begin = _begin;
        issue.end = _end;


        for (uint256 i;i<names.length;++i)
            issues[issueID].proposals.push(names[i]);
        return issueID;
    }




    // Vote.
    function vote(uint256 issueID, uint256[] order) {
        Issue issue=issues[issueID];
        if (authorization[issue.voterGroup][msg.sender]) // Voter does not belong to the pool of voters.
            throw;
        if (issue.hasVoted[msg.sender]) // Has already voted.
            throw;
        if (issue.end<now) // Vote is over.
            throw;
        if (issue.begin>now) // Vote has not started yet.
            throw;
        if (order.length != issue.proposals.length) // Everything was not ranked.
            throw;

        issue.votes.push(order); // Add the votes.
    }

    // Set a new winner who would win his duel against the current one.
    function condorcetImprove(uint256 issueID, uint256 betterProposal) {
        Issue issue = issues[issueID];
        if (getVictories(issueID,betterProposal, issue.winner) > getVictories(issue.winner, issueID,betterProposal) )
            issue.winner = betterProposal; // If better proposal is effectively winning this duel, make it the winner.
    }





    // **************************** //
    // *     Constant Getters     * //
    // **************************** //

    function n() constant returns(uint256)  { return now; }

    function getProposalName(uint256 issueID, uint256 proposalID)  returns(bytes32)  { return issues[issueID].proposals[proposalID]; }

    function getOrder(uint256 issueID, uint256 voteID, uint256 proposalID) constant returns(uint256) { return issues[issueID].votes[voteID][proposalID]; }

    function getNumberIssues() constant returns(uint256) { return issues.length; }

    function getNumberProposals(uint256 issueID) constant returns(uint256) { return issues[issueID].proposals.length; }




    // Note that this gas use is unbounded.
    // TODO: Make possibility to split this in multiple transactions.
    function getVictories(uint256 issueID, uint256 proposalA, uint256 proposalB) constant returns(uint256) {
        Issue issue = issues[issueID];
        uint256 victories;
        for (uint256 i;i<issue.proposals.length;++i) // Count the number of victories
            victories += (issue.votes[i][proposalA]<issue.votes[i][proposalB] ? 1 : 0);
        return victories;
    }

}


