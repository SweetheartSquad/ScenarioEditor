'use strict';

angular.module('scenarioEditor.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lineView', {
    templateUrl: 'lineView/lineView.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

}]);