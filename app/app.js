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
}]).
service('convoService', function () {
    var convoData = [
        {'id':'Conversation 0'}
    ];

    var currConversation = 0;

    return {
        conversations:function () {
            return convoData;
        },
        addConversation:function () {
            currConversation++;
            convoData.push({'id':'Conversation '+currConversation});
        },
        editConversation:function (id) {
            //TODO: Make this work
        },
        deleteConversation:function (id) {
            var index = convoData.indexOf(id);
            convoData.splice(index, 1);  
        }
    };
});

var scenarioEditor = angular.module('scenarioEditor');

scenarioEditor.controller('EditorCtrl', ['$scope', '$http', 'convoService',
  function ($scope,$http,convoService) {
    //ABSTRACTION LAYER
    $scope.getConvos = function () {
      return convoService.conversations();
    };

    $scope.addConvo = function () {
      convoService.addConversation();
    };

    $scope.editConvo = function (id) {
      if(id in getConvos()){
        convoService.editConversation(id);
      }
    };

    $scope.deleteConvo = function (id) {
      if(id in getConvos()){
        convoService.deleteConversation(id);
      }
    };

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

    //CHECK FOR CHANGES
    $scope.$watch('getConvos()', function() { $scope.msg = '*'; $scope.dlVisible = false; }, true);
    $scope.$watch('lines', function() { $scope.msg = '*'; $scope.dlVisible = false; }, true);
    $scope.$watch('characters', function() { $scope.msg = '*'; $scope.dlVisible = false; }, true);

    //SAVE JSON FILE
    $scope.dlVisible = false;

    $scope.save = function() {
    	$scope.convos = $scope.getConvos();

      $scope.dataObj = {
        characters : $scope.characters,
        conversations : $scope.convos
      };

    	$http.post('postHandler.php', angular.toJson($scope.dataObj)).then(function(data) {
      	$scope.msg = 'Data saved.';
        $scope.dlVisible = true;
    	});

    	$scope.msg2 = 'Data sent: '+ $scope.jsonData;
    };
  }
]);