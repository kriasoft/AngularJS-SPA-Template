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

    app.run(['$templateCache', '$rootScope', '$state', '$stateParams', function ($templateCache, $rootScope, $state, $stateParams) {

        // <ui-view> contains a pre-rendered template for the current view
        // caching it will prevent a round-trip to the server at the first page load
        var view = angular.element('#ui-view');
        $templateCache.put(view.data('tmpl-url'), view.html());

        // Allows to retrieve UI Router state information from inside templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // Sets the layout name. Which can be used to display different layouts (header, footer etc.)
        // base on which page a user is located
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            $rootScope.layout = toState.layout || 'full';
        });
    }]);

    // Controllers
    // ----------------------------------------------------------------------------------------------------------------

    app.controller('LoginCtrl', ['$scope', '$location', function ($scope, $location) {
        // TODO: Authorize a user
        $scope.login = function (userName, password) {
            $location.path('/');
            return false;
        };
    }]);

}());
