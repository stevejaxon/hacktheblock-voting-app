core = {};

var readyCore = function() {
  core.hideSetup()
  core.readyShowSetup()
};

$(document).on('page:load ready', readyCore);

core.hideSetup = function() {
  $('.setup').hide()
}

core.readyShowSetup = function() {
  $('.start-setup').on('click', function(e) {
    core.showSetup()
    core.hideIntro()
  });
}

core.showSetup = function() {
  $('.setup').show()
}

core.hideIntro = function() {
  $('.intro').hide()
}
