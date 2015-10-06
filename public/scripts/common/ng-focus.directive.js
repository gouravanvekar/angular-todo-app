(function () {
    'use strict';

    angular
        .module('myTodo')
        .directive('ngFocus', ngFocus);

    ngFocus.$inject = ['$timeout'];
    function ngFocus($timeout) {
        return function(scope, elem, attrs) {
            scope.$watch(attrs.ngFocus, function(newval) {
                if (newval) {
                    $timeout(function() {
                        elem[0].focus();
                    }, 0, false);
                }
            });
        };
    }
})();
