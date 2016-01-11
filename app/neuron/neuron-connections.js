'use strict';

angular.module('myApp.text')
    .controller('NeuronConnectionsCtrl', ['$scope', 'FileUploader', 'neuronParser', function ($scope, FileUploader, neuronParser) {
        $scope.filter = null;
        $scope.filteredNeurons = $scope.neuron.neurons;
        $scope.newNeuronText = '';
        $scope.newNeuronForm = 'image';
        $scope.newNeuron = null;

        /* File uploader settings */
        if (window.FileReader) {
            var uploader = $scope.uploader = new FileUploader();

            $scope.newNeuronImage = null;

            uploader.onAfterAddingFile = function (fileItem) {
                var reader = new window.FileReader();

                reader.onloadend = function (event) {
                    $scope.$apply(function () {
                        $scope.newNeuronImage = event.target.result;
                    });
                };

                reader.readAsDataURL(fileItem._file);
            };

            uploader.onAfterAddingAll = function (addedFileItems) {
                $scope.$apply(function () {
                    $scope.newNeuronImage = null;
                });
            };
        }


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
        $scope.deleteFromNeurons = function (neuron) {
            $scope.neuron.neurons = _.without($scope.neuron.neurons, neuron)
        };
    }]);