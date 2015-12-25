'use strict';

angular.module('myApp.text')
    .controller('NeuronConnectionsCtrl', ['$scope', 'neuronParser', function ($scope, neuronParser) {
        $scope.filters = _.chain($scope.neuron.neurons).pluck('type').uniq().value();
        $scope.filter = null;
        $scope.filteredNeurons = $scope.neuron.neurons;
        $scope.newNeuronText = '';
        $scope.newNeuronForm = 'text';

        $scope.filteredNeurons = function () {
            return $scope.neuron.neurons.filter(function (n) {
                return !$scope.filter || n.type === $scope.filter;
            });
        };

        $scope.setFilter = function (newFilter) {
            $scope.filter = newFilter;
        };
        $scope.showNewNeuronForm = function (newNeuronForm) {
            $scope.newNeuronForm = newNeuronForm;
        };

        $scope.addNewNeuron = function () {
            $scope.neuron.neurons.unshift(neuronParser.parse(this.newNeuronText));
            this.newNeuronText = '';
        }
    }]);