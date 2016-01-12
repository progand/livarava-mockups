'use strict';

angular.module('myApp')
    .filter('trustUrl', ['$sce', ($sce) => {
        return recordingUrl => $sce.trustAsResourceUrl(recordingUrl);
    }]);
