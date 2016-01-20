'use strict';

angular.module('myApp.text')
    .controller('NeuronDescriptionCtrl', ['$scope', function ($scope) {
        //Description controller
        $scope.description = '';
        $scope.editing = false;

        $scope.setEditing = function (editing) {
            $scope.editing = editing;
        };
    }]);