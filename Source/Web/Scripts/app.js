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

    app.run(['$templateCache', '$rootScope', '$state', '$stateParams', '$window', function ($templateCache, $rootScope, $state, $stateParams, $window) {

        // <ui-view> contains a pre-rendered template for the current view
        // caching it will prevent a round-trip to a server at the first page load
        var view = angular.element('#ui-view');
        $templateCache.put(view.data('tmpl-url'), view.html());

        // Allows to retrieve UI Router state information from inside templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // Embed Google Analytics tracking code, but only if `<body data-ga="UA-XXXXX-X">` value is present
        if (angular.element('body').data('ga')) {
            (function (b, o, i, l, e, r) {
                b.GoogleAnalyticsObject = l; b[l] || (b[l] =
                function () { (b[l].q = b[l].q || []).push(arguments) }); b[l].l = +new Date;
                e = o.createElement(i); r = o.getElementsByTagName(i)[0];
                e.src = '//www.google-analytics.com/analytics.js';
                r.parentNode.insertBefore(e, r)
            }($window, $window.document, 'script', 'ga'));
            ga('create', angular.element('body').data('ga'));
        } else {
            $window.ga = $window.ga || function () { };
        }

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {

            // Sets the layout name, which can be used to display different layouts (header, footer etc.)
            // based on which page the user is located
            $rootScope.layout = toState.layout;

            // Track page view via Google Analytics
            ga('send', 'pageview');
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
