'use strict';

angular.module('myApp.text', ['ui.router', 'ngFileUpload'])

    .config(['$stateProvider', 'textNeuronFixture', function ($stateProvider, textNeuronFixture) {
        $stateProvider.state('text', {
            url: '/text',
            templateUrl: 'text/text.html',
            controller: 'TextCtrl',
            resolve: {
                neuron: function () {
                    return textNeuronFixture;
                }
            }
        });
    }])

    .controller('TextCtrl', ['$scope', 'neuron', function ($scope, neuron) {
        $scope.neuron = neuron;
    }]);