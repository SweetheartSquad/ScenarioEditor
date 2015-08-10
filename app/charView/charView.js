'use strict';

angular.module('scenarioEditor.charView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/charView', {
    templateUrl: 'charView/charView.html',
    controller: 'CharCtrl'
  });
}])

.service('charService', function () {
	var charData = [
		{'id':0,'name':'','other':''}
	];

	var charId = 0;

	var currChar = 0;

	return {
		chars:function () {
			return charData;
		},
		addChar:function () {
			charId++;
			charData.push({'id':charId,'name':'',other:''});
		},
		deleteChar:function (character) {
			charData.splice(charData.indexOf(character),1);
		},
		editChar:function (character) {
			currChar = character.id;
		},
		getCurrChar:function () {
			return currChar;
		}
	};
})

.controller('CharCtrl', ['$scope', 'charService', function($scope, charService) {
	$scope.editVisible = false;

	$scope.getChars = function () {
		return charService.chars();
	};

	$scope.addChar = function () {
		return charService.addChar();
	};

	$scope.deleteChar = function (chara) {
		return charService.deleteChar(chara);
	};

	$scope.editChar = function (chara) {
		$scope.editVisible = true;
		return charService.editChar(chara);
	};

	$scope.getCurrChar = function () {
		return charService.getCurrChar();
	}

}]);