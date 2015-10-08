(function () {
    'use strict';

    angular
        .module('myTodo')
        .filter('capitalize', capitalize);

    function capitalize() {
        return function(input, all) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
        }
    }
})();