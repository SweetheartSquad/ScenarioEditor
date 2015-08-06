'use strict';

// Declare app level module which depends on views, and components
angular.module('scenarioEditor', [
  'ngRoute',
  'scenarioEditor.charView',
  'scenarioEditor.lineView',
  'scenarioEditor.convoView',
  'scenarioEditor.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/charView'});
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

    //CONVERSATIONS
    $scope.currConversation = 0;

    $scope.conversations = [
      {'id': 'Conversation '+$scope.currConversation}
    ];

    $scope.addConversation = function () {
      $scope.currConversation++;
      $scope.conversations.push(
        {'id':'Conversation '+$scope.currConversation}
      );
    };

    //TODO: to make all this easier, i'm going to set up some services...

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

    //CHECK FOR CHANGES
    $scope.$watch('lines', function() { $scope.msg = '*'; $scope.dlVisible = false; }, true);
    $scope.$watch('characters', function() { $scope.msg = '*'; $scope.dlVisible = false; }, true);

    //SAVE JSON FILE
    $scope.dlVisible = false;

    $scope.save = function() {
    	$scope.dataObj = {
        characters : $scope.characters,
        conversations : $scope.lines
      };

    	$http.post('postHandler.php', angular.toJson($scope.dataObj)).then(function(data) {
      	$scope.msg = 'Data saved.';
        $scope.dlVisible = true;
    	});

    	$scope.msg2 = 'Data sent: '+ $scope.jsonData;
    };
  }
]);