'use strict';

angular.module('scenarioEditor.convoView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/convoView', {
    templateUrl: 'convoView/convoView.html',
    controller: 'ConvoCtrl'
  });
}])

.controller('ConvoCtrl', [function() {

}]);