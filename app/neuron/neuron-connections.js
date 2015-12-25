'use strict';

angular.module('myApp.text')
    .controller('NeuronConnectionsCtrl', ['$scope', function ($scope) {
        $scope.filters = _.chain($scope.neuron.neurons).pluck('type').uniq().value();
        $scope.filter = null;
        $scope.filteredNeurons = $scope.neuron.neurons;
        $scope.newNeuronText = '';
        $scope.newNeuronForm = 'text';

        $scope.setFilter = function (newFilter) {
            $scope.filter = newFilter;
            $scope.filteredNeurons = $scope.neuron.neurons.filter(function (n) {
                return !$scope.filter || n.type === $scope.filter;
            });
        };
        $scope.showNewNeuronForm = function (newNeuronForm) {
            $scope.newNeuronForm = newNeuronForm;
        };

        $scope.addNewNeuron = function () {
            $scope.neuron.neurons.unshift({
                id: Date.now(),
                image: 'https://www.livarava.com/static/livarava/img/neurons/text.png',
                type_title: 'text',
                header: this.newNeuronText
            })
        }
    }]);