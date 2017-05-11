'use strict';

angular.module('app.directives', [])

    .directive('appVersion', ['version', (version : string) => {
        return (scope, elm, attrs) => {
            elm.text(version);
        };
    }]);