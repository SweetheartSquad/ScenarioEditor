'use strict';

// Declare app level module which depends on views, and components
angular.module('scenarioEditor', [
  'ngRoute',
  'scenarioEditor.charView',
  'scenarioEditor.lineView',
  'scenarioEditor.convoView',
  'scenarioEditor.version'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/charView'});
}])

.service('charService', function () {
  var charData = [
    {'id':0,'name':'','other':''}
  ];

  var currChar = 0;

  return {
    chars:function () {
      return charData;
    },
    addChar:function () {
      currChar++;
      charData.push({'id':currChar,'name':'',other:''});
    },
    deleteChar:function (character) {
      charData.splice(charData.indexOf(character),1);
    }
  };
})

.service('convoService', function () {
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
        editConversation:function (convo) {
            //TODO: Make this work
        },
        deleteConversation:function (convo) {
          convoData.splice(convoData.indexOf(convo),1);
        }
    };
})

.service('lineService', function () {
  var lineData = [
    {'id':0,'character':'','text':''}
  ];

  var currLine = 0;

  return {
    lines:function () {
      return lineData;
    },
    addLine:function () {
      currLine++;
      lineData.push({'id':currLine,'character':'',text:''});
    },
    deleteLine:function (character) {
      lineData.splice(lineData.indexOf(character),1);
    }
  };
});


var scenarioEditor = angular.module('scenarioEditor');

scenarioEditor.controller('EditorCtrl', ['$scope', '$http', 'convoService', 'charService', 'lineService',
  function ($scope,$http,convoService,charService,lineService) {
    // ABSTRACTION LAYER
    $scope.getChars = function () {
      return charService.chars();
    };

    $scope.getConvos = function () {
      return convoService.conversations();
    };

    $scope.getLines = function () {
      return lineService.lines();
    };


    // CHECK FOR CHANGES
    $scope.$watch('getChars()', function() { $scope.msg = '*'; $scope.dlVisible = false; }, true);
    $scope.$watch('getConvos()', function() { $scope.msg = '*'; $scope.dlVisible = false; }, true);
    $scope.$watch('getLines()', function() { $scope.msg = '*'; $scope.dlVisible = false; }, true);
   
    // SAVE JSON FILE
    $scope.dlVisible = false;

    $scope.save = function() {
      $scope.dataObj = {
        characters : $scope.getChars(),
        conversations : $scope.getConvos()
      };

    	$http.post('postHandler.php', angular.toJson($scope.dataObj)).then(function(data) {
      	$scope.msg = 'Data saved.';
        $scope.dlVisible = true;
    	});

    	$scope.msg2 = 'Data sent: '+ $scope.jsonData;
    };
  }
]);