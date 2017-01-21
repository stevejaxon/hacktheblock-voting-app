require('datejs');

contract('RankedVote', function() {
    var account_one = '0x540a0854d74c90c8269c891739b4e1938438a149';

    it("should not be possible to create an issue in the past", function() {
        var rankedVote = RankedVote.deployed();
        var start = Date.today().add(-1).days();
        var end = start.add(2).days();
        var description = "Test";
        var names = ["0x0000000000000000000000", "0x0000000000000001"];

        return rankedVote.createIssue(1, start.getTime(), end.getTime(), description, names, {from: account_one}).then(function(tx_id) {
            assert.isNotNull(rankedVote.issues, "Expected that the vote has issues.");
            assert.equal(0, rankedVote.issues.length, "Expected there to be no issues in the contract.")
        });
    });

    it("should not be able possible to create a contract with an end date the same as the start date", function() {
        var rankedVote = RankedVote.deployed();
        var start = Date.today();
        var end = start;
        var description = "Test";
        var names = ["0x0000000000000000000000", "0x0000000000000001"];

        return rankedVote.createIssue(1, start.getTime(), end.getTime(), description, names, {from: account_one}).then(function(tx_id) {
            assert.isNotNull(rankedVote.issues, "Expected that the vote has issues.");
            assert.equal(0, rankedVote.issues.length, "Expected there to be no issues in the contract.")
        });
    });

    it("should be able to add a create an issue as the chairman", function() {
        var rankedVote = RankedVote.deployed();
        var start = Date.today();
        var end = Date.today().add(1).days();
        var description = "Test";
        var names = ["0x0000000000000000000000", "0x0000000000000001"];

        console.log('parameters: ' + 1 + ', ' + start.getTime() + ', ' + end.getTime() + ', ' + description + ', ' + names + ', ' + '{from: account_one, gas: 300000}');

        return rankedVote.createIssue(0, start.getTime(), end.getTime(), description, names, {from: account_one, gas: 300000}).then(function(tx_id) {
            assert.isNotNull(rankedVote.issues, "Expected that the vote has issues.");
            return rankedVote.issues.call(0).then(function (issue) {
                assert.isNotNull(issue, "Expected there to be an issue created");
                console.log('Issue details: ' + issue);
                console.log('Issue start date: ' + issue.begin);
            });


        });
    });
});