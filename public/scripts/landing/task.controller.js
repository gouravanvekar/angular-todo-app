(function () {
    'use strict';

    angular
        .module('myTodo')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$scope'];
    function TaskController($scope) {
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
                "taskId": 1,
                "taskName": "Watch TV",
                "taskPriority": "",
                "taskDate": "05/26/2015",
                "taskStatus": "",
                "taskExpirationDate": "05/27/2015",
                "editing" : false,
                "buttons" : false
            },
            {
                "taskId": 1,
                "taskName": "Make dinner",
                "taskPriority": "",
                "taskDate": "9/05/2015",
                "taskStatus": "",
                "taskExpirationDate": "9/06/2015",
                "editing" : false,
                "buttons" : false
            }
        ];

        $scope.tasks = tasks;
        $scope.editedTask = null;

        $scope.startEditing = function(task){
            task.editing = true;
            $scope.editedItem = task;
        }

        $scope.doneEditing = function(task){
            task.editing = false;
            $scope.editedItem = null;
        }

        $scope.addTask = function(newTask){
            newTask.taskStatus = "Active";
            newTask.taskDate = Date.now();

            newTask.taskExpirationDate = moment();
            var numberOfDaysToAdd = 7;
            newTask.taskExpirationDate.add(numberOfDaysToAdd, 'days');

            $scope.tasks.push(newTask);
            $scope.newTask = {};
        }
    }
})();
