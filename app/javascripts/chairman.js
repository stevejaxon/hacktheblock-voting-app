var rankedVote = RankedVote.deployed();

function addIssue(id, startDate, endDate, description, options) {

    return rankedVote.createIssue(0, start.getTime(), end.getTime(), description, names, {from: chairmanAccount, gas: 300000}).then(function(tx_id) {
        console.log(tx_id);
    });
}
