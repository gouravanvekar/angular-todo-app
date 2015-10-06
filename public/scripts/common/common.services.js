(function () {
    'use strict';

    angular
        .module('myTodo')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$http'];
    function TodoService($http) {
        var service = {};

        service.getAllTasks = getAllTasks;
        service.getTasksByStatus = getTasksByStatus;

        return service;

        function getAllTasks() {
            return tasks;
        }

        function getTasksByStatus(status) {
            return tasks.filter(function (i,n){
                return n.taskStatus === status;
            });
        }

        // private functions
        //$http.get('/api/tasks').then(handleSuccess, handleError('Error getting all tasks'));

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();
