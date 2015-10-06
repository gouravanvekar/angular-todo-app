(function () {
    'use strict';

    angular
        .module('myTodo')
        .directive('ngBlur', ngBlur);

    ngBlur.$inject = [];
    function ngBlur() {
        return function( scope, elem, attrs ) {
            elem.bind('blur', function() {
                scope.$apply(attrs.ngBlur);
            });
        };
    }
})();
