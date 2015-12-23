'use strict';

angular.module('myApp.text', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/text', {
            templateUrl: 'text/text.html',
            controller: 'TextCtrl'
        });
    }])

    .controller('TextCtrl', ['$scope', function ($scope) {
        $scope.neuron = {
            title: "LivaRava",

        }
    }]);