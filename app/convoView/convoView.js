'use strict';

angular.module('scenarioEditor.convoView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/convoView', {
    templateUrl: 'convoView/convoView.html',
    controller: 'ConvoCtrl'
  });
}])

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
        editConversation:function (id) {
            //TODO: Make this work
        },
        deleteConversation:function (id) {
            var index = convoData.indexOf(id);
            convoData.splice(index, 1);  
        }
    };
})

.controller('ConvoCtrl', ['$scope', 'convoService', function($scope, convoService) {
	$scope.getConvos = function () {
    return convoService.conversations();
  };

  $scope.addConvo = function () {
    convoService.addConversation();
  };

  $scope.editConvo = function (id) {
    convoService.editConversation(id);
  };

  $scope.deleteConvo = function (id) {
    convoService.deleteConversation(id);
  };

}]);