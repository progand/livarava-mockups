'use strict';

angular.module('myApp.index', ['ui.router'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('/', {
            url: '/',
            templateUrl: 'index/index.html',
            controller: 'IndexCtrl'
        });
    }])

    .controller('IndexCtrl', ['$scope', function ($scope) {
    }]);