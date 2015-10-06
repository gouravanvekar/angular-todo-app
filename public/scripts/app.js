(function () {
    'use strict';

    angular
        .module('myTodo', ['ui.router','ui.bootstrap'])
        .config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "scripts/landing/landing.html",
                controller: 'TaskController as TaskCtrl'
            });
    }
})();