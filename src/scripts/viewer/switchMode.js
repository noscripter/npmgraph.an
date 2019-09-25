var getLocation = require('./getLocation.js');

module.exports = function generateSwitchMode($location, $routeParams, is2d) {
  return function switchMode() {
    var path = getLocation($routeParams, is2d);
    $location.path(path);
  };
};
