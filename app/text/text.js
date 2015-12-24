'use strict';

angular.module('myApp.text', ['ui.router'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('text', {
            url: '/text',
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
        $scope.filters = _.chain(neuron.neurons).pluck('type').uniq().value();
        $scope.filter = null;
        $scope.filteredNeurons = neuron.neurons;

        $scope.setFilter = function (newFilter) {
            $scope.filter = newFilter;
            $scope.filteredNeurons = $scope.neuron.neurons.filter(function (n) {
                return !$scope.filter || n.type === $scope.filter;
            });
        }
    }]);