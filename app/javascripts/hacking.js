core = {};

var readyCore = function() {
  core.hideSetup()
  core.readyShowSetup()
  core.readyShowVote()
};

$(document).on('page:load ready', readyCore);

core.hideSetup = function() {
  $('.setup').hide()
  $('.vote').hide()
  $('.thankyou').hide()
}

core.readyShowSetup = function() {
  $('.start-setup').on('click', function(e) {
    core.showSetup()
    core.hideIntro()
  });
}

core.readyShowVote = function() {
  $('.vote-button').on('click', function(e) {
    core.hideIntro()
    core.showVote()
    core.readyThankyou()
  });
}

core.showSetup = function() {
  $('.setup').show()
}

core.hideIntro = function() {
  $('.intro').hide()
}

core.showVote = function() {
  $('.vote').show()
}

core.readyThankyou = function() {
  $('.submit-vote-button').on('click', function(e) {
    $('.fake-voting').hide()
    $('.thankyou').show()
  });
}
