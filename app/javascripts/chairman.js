var rankedVote = RankedVote.deployed();

function addIssue(id, startDate, endDate, description, options) {

    return rankedVote.createIssue(id, startDate.getTime(), endDate.getTime(), description, options, {from: chairmanAccount, gas: 300000}).then(function(tx_id) {
        console.log(tx_id);
    });
}

function createVotingGroup(name) {

    return rankedVote.createVotingGroup(name, {from: chairmanAccount, gas: 300000}).then(function(tx_id) {
        console.log(tx_id);
    });
}

function retrieveVotingGroups() {
    return rankedVote.votingGroupNames.then(function(groups) {
        console.log(rankedVote.votingGroupNames);
        console.log(groups);
        return groups;
    })
    .catch(function (e) {
        console.log(e);
    });
}

function test() {
    createVotingGroup("test 1");
    createVotingGroup("test 1");
    createVotingGroup("test 1");
}

function test2() {
    console.log(retrieveVotingGroups());
}


