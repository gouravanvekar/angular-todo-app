(function () {
    'use strict';

    angular
        .module('myTodo')
        .directive('myEnter', myEnter);

    myEnter.$inject = [];
    function myEnter() {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.myEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    }
})();
