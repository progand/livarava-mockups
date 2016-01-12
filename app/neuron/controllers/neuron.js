'use strict';

angular.module('myApp.text', ['ui.router', 'angularFileUpload'])

    .config(['$stateProvider', 'textNeuronFixture', ($stateProvider, textNeuronFixture) => {
        $stateProvider.state('text', {
            url: '/text',
            templateUrl: 'neuron/controllers/neuron.html',
            controller: 'TextCtrl',
            resolve: {
                neuron: () => textNeuronFixture
            }
        });
    }])

    .controller('TextCtrl', ['$scope', 'neuron', ($scope, neuron) => {
        $scope.neuron = neuron;
    }]);