(function () {
    'use strict';

    angular
        .module('myTodo')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$scope', 'TodoService'];
    function TaskController($scope, TodoService) {
        //$scope.tasks = TodoService.query();

        $scope.expiration = TodoService.taskExpirationTimeout;
        $scope.taskType = 'All';
        $scope.priorities = ['high','medium','low'];
        $scope.newTask = {};
        $scope.newTask.taskPriority = $scope.priorities[0];

        $scope.tasks = TodoService.getAllTasks();
        $scope.editedTask = null;

        $scope.startEditing = function(task) {
            if (task.taskStatus === 'active') {
                task.editing = true;
                $scope.editedItem = task;
            }
        }

        $scope.doneEditing = function(task){
            task.editing = false;
            $scope.editedItem = null;
        }

        $scope.allTasks = function(){
            $scope.tasks = TodoService.getAllTasks();
        }

        $scope.addTask = function(){
            //TodoService.save(newTask);
            if($scope.newTask.taskName !== undefined){
                TodoService.addTask($scope.newTask);
                $scope.newTask = {};
                $scope.newTask.taskPriority = $scope.priorities[0];
            }
        }

        $scope.deleteTask = function(task){
            //TodoService.delete(task);
            //$scope.tasks = TodoService.query();
            TodoService.deleteTask(task);
        }

        $scope.getTasksByStatus = function(status){
            $scope.taskType = status;
            $scope.tasks = TodoService.getTasksByStatus(status);
        }

        function getTasksByStatus(status) {
            return $scope.tasks.filter(function (task){
                return task.taskStatus === status;
            });
        }

        $scope.markTaskComplete = function(task, status){
            TodoService.setTaskStatus(task, status);
        }
    }
})();