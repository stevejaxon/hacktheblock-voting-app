require('datejs');
require('bluebird');

contract('RankedVote', function(chairmanAccount) {
    var account_one = '0x392c79d389baad8ff44f11fa30af660d7891f2bf';

    it("should not be possible to create an issue in the past", function() {
        var rankedVote = RankedVote.deployed();
        var start = Date.today().add(-1).days();
        var end = start.add(2).days();
        var description = "Test";
        var names = ["0x0000000000000000000000", "0x0000000000000001"];

        return rankedVote.createIssue(1, start.getTime(), end.getTime(), description, names, {from: account_one}).then(function(tx_id) {
            console.log(tx_id);
        }).catch(function (e) {
            console.log(e);
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
        var description = "Test vote";
        var names = ["Spend the money", "Don't spend the money"];

        console.log('parameters: ' + 1 + ', ' + start.getTime() + ', ' + end.getTime() + ', ' + description + ', ' + names + ', ' + '{from: account_one, gas: 300000}');

        return rankedVote.createIssue(0, start.getTime(), end.getTime(), description, names, {from: account_one, gas: 300000}).then(function(tx_id) {
            assert.isNotNull(rankedVote.issues, "Expected that the vote has issues.");
            return rankedVote.issues.call(2).then(function (issue) {
                assert.isNotNull(issue, "Expected there to be an issue created");
                console.log('Issue details: ' + issue);
                console.log(issue[0]);
                console.log(issue[1].toNumber());
                console.log('Issue start date: ' + issue[2].toNumber());
                console.log('Issue end date: ' + issue[3].toNumber());
                console.log(issue[4]);
                console.log(issue[4][0]);
                var prop1;
                issue[4].call(0).then(function (proposal) {
                    assert.isNotNull(proposal);
                    console.log('The first proposal ' + proposal);
                    prop1 = proposal;
                });
                console.log(prop1);
            }).catch(function (e) {
                console.log(e);
            });


        });
    });

    it("should be able possible to retrieve all of the groups", function() {
        var rankedVote = RankedVote.deployed();

        console.log('in');
        return rankedVote.createVotingGroup("test 1", {from: account_one, gas: 300000}).then(function(tx_id) {
            return  rankedVote.createVotingGroup("test 2", {from: account_one, gas: 300000}).then(function(tx_id) {
                return rankedVote.createVotingGroup("test 3", {from: account_one, gas: 300000}).then(function(tx_id) {
                    var votingGroupNames = [];

                    var promises = [];

                    for(var j = 0; j < 3; j++) {
                        promises.push(rankedVote.votingGroupNames.call(j));
                        console.log(typeof promises[j]);
                    }

                    Promise.each(promises, function (value) {
                        console.log(value);
                        votingGroupNames.push(value);
                    }).then(function () {
                        assert.equal(3, votingGroupNames.length);
                        console.log(votingGroupNames);
                    });
                });
            });
        });
    });
});