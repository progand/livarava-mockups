'use strict';

angular.module('myApp.text')
    .controller('NeuronConnectionsCtrl', ['$scope', 'FileUploader', 'neuronParser', function ($scope, FileUploader, neuronParser) {
        $scope.filter = null;
        $scope.filteredNeurons = $scope.neuron.neurons;
        $scope.newNeuronText = '';
        $scope.newNeuronForm = '';
        $scope.newNeuron = null;
        $scope.newDataPost = {
            id: null,
            created: null,
            header: "",
            image: null,
            description: "",
            type: null,
            type_title: null
        };

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

        let $btnAdd = $(".form-inline-btn-add");
        $(document).scroll(function () {
            if ($(this).scrollTop() > 150) {
                $btnAdd.addClass("form-inline-btn-add-top");
            } else {
                $btnAdd.removeClass("form-inline-btn-add-top");
            }
        });

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

    }]);