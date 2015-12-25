'use strict';

angular.module('myApp.text')
    .controller('NeuronConnectionsCtrl', ['$scope', 'neuronParser', function ($scope, neuronParser) {
        $scope.filter = null;
        $scope.filteredNeurons = $scope.neuron.neurons;
        $scope.newNeuronText = '';
        $scope.newNeuronForm = '';
        $scope.newNeuron = null;

        $scope.filters = function () {
            return _.chain($scope.neuron.neurons).pluck('type').uniq().value();
        };

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
            $scope.neuron.neurons.unshift($scope.newNeuron);
            this.newNeuronText = '';
            $scope.newNeuron = null;
        };
        $scope.onNewNeuronTextChange = function () {
            $scope.newNeuron = neuronParser.parse(this.newNeuronText);
        };
        $scope.deleteFromNeurons = function(neuron){
            $scope.neuron.neurons = _.without($scope.neuron.neurons, neuron)
        }
    }]);