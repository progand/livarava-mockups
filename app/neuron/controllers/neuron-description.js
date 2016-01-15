'use strict';

angular.module('myApp.text')
    .controller('NeuronDescriptionCtrl', ['$scope', function ($scope) {
      //Description controller
      //  $scope.message = 'Put description template here';
        $scope.linkDescription = false;
        $scope.textDescription = false;
        $scope.newDescriptionText = '';

        if ($scope.newDescriptionText == '') {
            $scope.linkDescription = false;
        } else {
            $scope.linkDescription = true;
        }

        $scope.addDescription = data => {
            $scope.newDescriptionText = data;
            $scope.newDescription = false;
            if (data) {
                $scope.linkDescription = true;
                $scope.textDescription = true;
            } else {
                $scope.linkDescription = false;
                $scope.textDescription = false;
            }
        };

        $scope.onDescriptionEditLink = () => {
            console.log($scope.textDescription);
            $scope.newDescription = !$scope.newDescription;
            $scope.linkDescription = !$scope.linkDescription;
            $scope.textDescription = !$scope.textDescription;
            if($scope.textDescription == true) {
                $scope.textDescription = false;
            }
        };

        $scope.onCloseForm = data => {
            $scope.newDescription = false;
            if (data) {
                $scope.linkDescription = true;
                $scope.textDescription = true;
            } else {
                $scope.linkDescription = false;
                $scope.textDescription = false;
            }
        };

    }]);