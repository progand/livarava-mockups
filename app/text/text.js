'use strict';

angular.module('myApp.text', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/text', {
            templateUrl: 'text/text.html',
            controller: 'TextCtrl',
            resolve: {
                neuron: function () {
                    return window['text-neuron-data'];
                }
            }
        });
    }])

    .controller('TextCtrl', ['$scope', 'neuron', function ($scope, neuron) {
        $scope.neuron = neuron;
    }]);