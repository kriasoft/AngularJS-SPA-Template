(function () {

    "use strict";

    var app = angular.module('app', ['ui.router']);

    app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

        // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
        // ------------------------------------------------------------------------------------------------------------

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/views/index'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/views/about'
            })
            .state('login', {
                url: '/login',
                layout: 'basic',
                templateUrl: '/views/login',
                controller: 'LoginCtrl'
            })
            .state('otherwise', {
                url: '*path',
                templateUrl: '/views/404'
            });

        $locationProvider.html5Mode(true);

    }]);

    app.run(['$templateCache', '$rootScope', function ($templateCache, $rootScope) {
        var view = angular.element('#ui-view');
        $templateCache.put(view.data('tmpl-url'), view.html());
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            $rootScope.layout = toState.layout || 'full';
        });
    }]);

    // Controllers
    // ----------------------------------------------------------------------------------------------------------------

    app.controller('LoginCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.template = 'basic';
        $scope.login = function (userName, password) {
            $location.path('/');
            return false;
        };
    }]);

}());
