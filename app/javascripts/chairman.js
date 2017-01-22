debugger;

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
    var promises = [];

    for(var j = 0; j < 3; j++) {
        promises.push(rankedVote.votingGroupNames.call(j));
    }
    console.log(promises);

    Promise.each(promises, function (value) {
        votingGroupNames.push(value);
    }).then(function () {
        return votingGroupNames;
    });
    console.log('after');
}

function test() {
    createVotingGroup("test 1");
    createVotingGroup("test 1");
    createVotingGroup("test 1");
}


