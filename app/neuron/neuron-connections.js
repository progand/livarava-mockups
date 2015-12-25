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
            var text = this.newNeuronText,
                type = 'text',
                image = 'https://www.livarava.com/static/livarava/img/neurons/text.png';

            if (text.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                type = 'image';
                image = text;
            } else if (text.match(/^http(s):\/\/(?:www\.)?youtube.com\/watch\?(?=.*v=\w+)(?:\S+)?$/) != null) {
                var videoId = text.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                if (videoId != null && videoId[1]) {
                    type = 'video';
                    image = 'http://img.youtube.com/vi/' + videoId[1] + '/default.jpg';
                }
            }

            $scope.neuron.neurons.unshift({
                id: Date.now(),
                header: text,
                image: image,
                type: type,
                type_title: type
            });
            this.newNeuronText = '';
        }
    }]);