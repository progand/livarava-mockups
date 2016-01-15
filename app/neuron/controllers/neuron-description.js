'use strict';

angular.module('myApp.text')
    .controller('NeuronDescriptionCtrl', ['$scope', function ($scope) {
        //Description controller
        $scope.textDescription = false;
        $scope.newDescriptionText = '';

        $scope.linkDescription = () => {
            return !!$scope.newDescriptionText
        };

        $scope.addDescription = data => {
            $scope.newDescriptionText = data;
            $scope.newDescription = false;
            if (data) {
                $scope.linkDescription = () => {
                    return true;
                };
                $scope.textDescription = true;
            } else {
                $scope.linkDescription = () => {
                    return false;
                };
                $scope.textDescription = false;
            }
        };

        $scope.onDescriptionEditLink = () => {
            $scope.newDescription = !$scope.newDescription;
            $scope.linkDescription = () => {
                return true;
            };
            $scope.textDescription = !$scope.textDescription;
            if($scope.textDescription == true) {
                $scope.textDescription = false;
            }
        };

        $scope.onCloseForm = data => {
            $scope.newDescription = false;
            if (data) {
                $scope.linkDescription = () => {
                    return true;
                };
                $scope.textDescription = true;
            } else {
                $scope.linkDescription = () => {
                    return false;
                };
                $scope.textDescription = false;
            }
        };

    }]);