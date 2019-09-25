var create3DRenderer;
var generateSwitchMode = require('../switchMode')

module.exports = function($scope, $routeParams, $http, $location) {
  $scope.name = ' ' + $routeParams.pkgId;

  $scope.switchMode = generateSwitchMode($location, $routeParams, true);

  $scope.exportModel = function() {};

  var graphBuilder = require('../graphBuilder')($routeParams.pkgId, $routeParams.version, $http);
  graphBuilder.start.then(function() {
    // todo: check if it supports webgl
    if (!$scope.$$phase) {
      $scope.$apply(function() { $scope.canSwitchMode = true; });
    } else {
      $scope.canSwitchMode = true;
    }
  });

  var graph = graphBuilder.graph;

  if (!create3DRenderer) {
    $http.get('renderer3d.js')
      .then(function (data) {
        eval(data.data); // yeah, this is bad... How would you make it better?
        create3DRenderer = require('renderer3d');
        render();
      });
  } else {
    render();
  }

  function render() {
    var renderer = create3DRenderer(graph, document.querySelector('.graphView'));
    renderer.run();

    $scope.$on('$destroy', function() {
      renderer.dispose();
    });
  }
};
