'use strict';

angular.module('scenarioEditor.charView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/charView', {
    templateUrl: 'charView/charView.html',
    controller: 'CharCtrl'
  });
}])

.controller('CharCtrl', [function() {

}]);