'use strict';

angular.module('myApp.text')
    .controller('NeuronConnectionsCtrl', ['$scope', 'FileUploader', 'neuronParser', '$filter', function ($scope, FileUploader, neuronParser, $filter) {
        $scope.filter = null;
        $scope.filteredNeurons = $scope.neuron.neurons;
        $scope.newNeuronText = '';
        $scope.newNeuronForm = '';
        $scope.newNeuron = null;
        $scope.newDataPost = null;
        $scope.neuronLists = $scope.neuron.neurons;
        $scope.editingHeader = false;
        let pagesShown = 1, itemCount = 10;
        $scope.btnShowMore = pagesShown < ($scope.neuronLists.length / itemCount);

        /* File uploader settings */
        if (window.FileReader) {
            let uploader = $scope.uploader = new FileUploader(),
                audioUploader = $scope.audioUploader = new FileUploader();


            uploader.onAfterAddingFile = (fileItem) => {
                var reader = new window.FileReader();

                reader.onloadend = event =>
                    $scope.$apply(() =>
                        $scope.newImageNeuron = neuronParser.parse({
                            raw: event.target.result,
                            header: $scope.neuron.header
                        })
                    );

                reader.readAsDataURL(fileItem._file);
            };

            audioUploader.onAfterAddingFile = (fileItem) => {
                var reader = new window.FileReader();

                reader.onloadend = event =>
                    $scope.$apply(() =>
                        $scope.newAudioNeuron = neuronParser.parse({
                            raw: event.target.result
                        })
                    );


                reader.readAsDataURL(fileItem._file);
            };

            uploader.onAfterAddingAll = (addedFileItems) =>
                $scope.$apply(() =>
                    $scope.newImageNeuron = null);

            audioUploader.onAfterAddingAll = (addedFileItems) =>
                $scope.$apply(() =>
                    $scope.newAudioNeuron = null);
        }


        $scope.filters = () =>
            _.chain($scope.neuron.neurons).pluck('type').uniq().value();

        $scope.filteredNeurons = () =>
            $scope.neuron.neurons.filter(n => !$scope.filter || n.type === $scope.filter);


        $scope.setFilter = newFilter =>
            $scope.filter = newFilter;

        $scope.showNewNeuronForm = newNeuronForm =>
            $scope.newNeuronForm = newNeuronForm;

        $scope.addNewNeuron = neuron => {
            $scope.neuron.neurons.unshift(neuron);
            $scope.clearNeuron(neuron);
            if($scope.newNeuronForm === "image" || $scope.newNeuronForm === "audio") {
                $scope.newNeuronForm = null;
                $scope.closePanel();
            }
        };
        $scope.onNewNeuronTextChange = function () {
            $scope.newNeuron = neuronParser.parse({raw: this.newNeuronText, header: $scope.neuron.header});
        };

        $scope.addNewNeuronPost = neuron => {
            let text = $scope.newDataPost.description;
            $scope.newDataPost.id = Date.now();
            $scope.newDataPost.created = Date.now();
            $scope.newDataPost.type = "post";
            $scope.newDataPost.type_title = "post";
            if (text.length > 100) {
                $scope.newDataPost.description = text.slice(0, 100) + " ...";
            }
            $scope.neuron.neurons.unshift(neuron);
            $scope.clearNeuron(neuron);
            $scope.closePanel();
        };

        $scope.deleteFromNeurons = neuron =>
            $scope.neuron.neurons = _.without($scope.neuron.neurons, neuron);

        $scope.clearNeuron = function (neuron) {
            if ($scope.newNeuron === neuron) {
                this.newNeuronText = '';
                $scope.newNeuron = null;
            }
            if ($scope.newImageNeuron === neuron) {
                $scope.newImageNeuron = null;
            }
            if ($scope.newAudioNeuron === neuron) {
                $scope.newAudioNeuron = null;
            }
            if ($scope.newDataPost === neuron) {
                $scope.newDataPost = null;
            }
        };

        $scope.paginationLimit = () => {
            return itemCount * pagesShown;
        };

        $scope.hasMoreItemsToShow = data => {
            if (data) {
                pagesShown = 1; itemCount = 10;
                if (data == 'All'){
                    $scope.btnShowMore = pagesShown < ($scope.neuronLists.length / itemCount);
                } else {
                    let item = $filter('filter')($scope.neuronLists, data);
                    $scope.btnShowMore = pagesShown < (item.length / itemCount);
                }
            } else {
                $scope.btnShowMore = pagesShown < ($scope.neuronLists.length / itemCount);
            }
        };

        $scope.showMoreItems = () => {
            pagesShown = pagesShown + 1;
        };

        $scope.showPanel = () => {
            let $card = $('.card-float'),
                $button = $('.button-container');
            $card.animate({
                right: 0
            }, 200);
            $button.css({
                'display': 'none'
            });
        };

        $scope.closePanel = () => {
            let $card = $('.card-float'),
                $button = $('.button-container');
            $card.animate({
                right: -600 + 'px'
            }, 200);
            $button.css({
                'display': 'flex'
            });
        };

        $scope.blurred = function() {
            this.editingHeader = false;
        };

    }]);