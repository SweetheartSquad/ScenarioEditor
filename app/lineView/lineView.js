'use strict';

angular.module('scenarioEditor.lineView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lineView', {
    templateUrl: 'lineView/lineView.html',
    controller: 'LineCtrl'
  });
}])

.controller('LineCtrl', [function() {

}]);