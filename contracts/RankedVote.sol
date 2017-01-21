
pragma solidity ^0.4.4;

contract RankedVote{

    address public chairman; // Has the right.
    mapping (uint256 => mapping(address => bool)) public authorization; // authorization[groupID][voter] == true if voter belongs to voting group ID.
    string[] public votingGroupNames;

    struct Issue {
        uint256 voterGroup; // Voter group allowed on an issue.
        uint256 begin; // Timestamp the vote begins.
        uint256 end; // Timestamp the vote ends.
        bytes32[] proposals;
        uint256[][] votes; // List of list of order.
        mapping (address => bool) hasVoted;
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
    function createIssue(uint256 _voterGroup, uint256 _begin, uint256 _end, bytes32[] names) onlyChairman returns(uint256) {
        if (_end < _begin) // Vote must last some time.
            throw;
        if (_begin < now) // Can't start in the past
            throw;

        uint256 issueID = issues.length++;
        issues[issueID].voterGroup=_voterGroup;

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

        issue.votes.push(order); // Add the votes.
    }



    // **************************** //
    // *     Constant Getters     * //
    // **************************** //

    //function n() returns(uint256) constant {return now;}

    //function getProposalName() returns(string) constant {return "";}


}


