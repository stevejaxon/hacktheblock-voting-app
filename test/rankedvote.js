require('datejs');

contract('RankedVote', function() {
    it("should not be possible to create an issue in the past", function() {
        var rankedVote = RankedVote.deployed();
        var dateInThePast = Date.today().add(-1).days();

        rankedVote.createIssue().then(function(issueId) {
            assert.isNotNull(issueId, "Expected that the issue id would be returned.");
            assert.isNotNull(rankedVote.issues, "Expected that the vote has issues.");
            assert.isNotNull(rankedVote.issues[issueId], "Expected that the issue was not created for the vote.");
        });
    });

    it("should not be able possible to create a contract with an end date as the start date", function() {
        var rankedVote = RankedVote.deployed();
        console.log(Date.today().add(5).days());

        rankedVote.createIssue().then(function(issueId) {
            assert.isNotNull(issueId, "Expected that the issue id would be returned.");
            assert.isNotNull(rankedVote.issues, "Expected that the vote has issues.");
            assert.isNotNull(rankedVote.issues[issueId], "Expected that the issue was not created for the vote.");
        });
    });

    it("should be able to add a create an issue as the chairman", function() {
        var rankedVote = RankedVote.deployed();
        console.log(Date.today().add(5).days());

        rankedVote.createIssue().then(function(issueId) {
            assert.isNotNull(issueId, "Expected that the issue id would be returned.");
            assert.isNotNull(rankedVote.issues, "Expected that the vote has issues.");
            assert.isNotNull(rankedVote.issues[issueId], "Expected that the issue was not created for the vote.");
        });
    });
});