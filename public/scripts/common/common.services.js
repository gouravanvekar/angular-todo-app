(function () {
    'use strict';

    angular
        .module('myTodo')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$resource'];
    function TodoService($resource) {
        //return $resource('/api/tasks/:id', { id:'@id'},
        //    {
        //        'update': { method:'PUT' }
        //    });

        var tasks = [
            {
                "taskId": 1,
                "taskName": "Buy Phone",
                "taskPriority": "medium",
                "taskDate": "10/06/2015",
                "taskStatus": "active",
                "taskExpirationDate": "10/07/2015",
                "editing" : false,
                "buttons" : false
            },
            {
                "taskId": 2,
                "taskName": "Watch TV",
                "taskPriority": "high",
                "taskDate": "05/26/2015",
                "taskStatus": "completed",
                "taskExpirationDate": "05/27/2015",
                "editing" : false,
                "buttons" : false
            },
            {
                "taskId": 3,
                "taskName": "Make dinner",
                "taskPriority": "low",
                "taskDate": "9/05/2015",
                "taskStatus": "expired",
                "taskExpirationDate": "9/06/2015",
                "editing" : false,
                "buttons" : false
            }
        ];

        var service = {};
        service.getAllTasks = getAllTasks;
        service.getTasksByStatus = getTasksByStatus;
        service.addTask = addTask;
        service.deleteTask = deleteTask;
        service.setTaskStatus = setTaskStatus;

        return service;

        function getAllTasks() {
            return tasks;
        }

        function getTasksByStatus(status) {
            return tasks.filter(function (task){
                return task.taskStatus === status;
            });
        }

        function addTask(task){
            task.taskStatus = "active";
            task.taskDate = Date.now();

            task.taskExpirationDate = moment();
            var numberOfDaysToAdd = 7;
            task.taskExpirationDate.add(numberOfDaysToAdd, 'days');
            if(tasks.length > 0) {
                tasks.push(task);
            }
            else{
                tasks = [];
                tasks.push(task);
            }
        }

        function deleteTask(task){
            for(var i = 0; i < tasks.length; i++) {
                if(tasks[i].taskId == task.taskId) {
                    tasks.splice(i, 1);
                    break;
                }
            }
        }

        function setTaskStatus(task, status){
            task.taskStatus = status;
        }

        // private functions
        //$http.get('/api/tasks').then(handleSuccess, handleError('Error getting all tasks'));

        //function handleSuccess(res) {
        //    return res.data;
        //}
        //
        //function handleError(error) {
        //    return function () {
        //        return { success: false, message: error };
        //    };
        //}
    }
})();
