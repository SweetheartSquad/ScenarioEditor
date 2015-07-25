'use strict';

// Declare app level module which depends on views, and components
angular.module('scenarioEditor', [
  'ngRoute',
  'scenarioEditor.view1',
  'scenarioEditor.view2',
  'scenarioEditor.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

var scenarioEditor = angular.module('scenarioEditor');

scenarioEditor.controller('EditorCtrl', ['$scope', '$http',
  function ($scope,$http) {
    //CHARACTERS
		$scope.currChar = 0;

    $scope.characters = [
      {'id':0,
      	'name': '',
      'other': ''},
    ];

    $scope.addChar = function () {
      $scope.currChar++;
      $scope.characters.push(
        {'id':$scope.currChar,
        	'name': '',
         'other': ''}
      );
    };

    //LINES OF DIALOGUE
		$scope.currLine = 0;

    $scope.lines = [
      {'id': 0,
       'character': '',
       'text': ''},
    ];

    $scope.addLine = function () {
      $scope.currLine++;
      $scope.lines.push(
        {'id':$scope.currLine,
         'character': '',
         'text': ''}
      );
    };

    //SAVE JSON FILE
		$scope.allData = [];

    $scope.save = function() {
    	$scope.allData = [];
    	$scope.allData.push($scope.characters);
    	$scope.allData.push($scope.lines);
    	$scope.jsonData = JSON.stringify($scope.allData);

    	$http.post('cool.json', $scope.jsonData).then(function(data) {
      	$scope.msg = 'Data saved';
      	$scope.msg2 = 'Data sent: '+ $scope.jsonData;
    	});

    	$scope.msg2 = 'Data sent: '+ $scope.jsonData;
    };
  }
]);