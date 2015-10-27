(function () {
    'use strict';

    angular
        .module('myTodo')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$scope', 'TodoService'];
    function TaskController($scope, TodoService) {
        $scope.expiration = TodoService.taskExpirationTimeout();
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
            $scope.taskType = 'All';
            $scope.tasks = TodoService.getAllTasks();
        }

        $scope.addTask = function() {
            if($scope.newTask.taskName !== undefined){
                TodoService.addTask($scope.newTask);
                $scope.newTask = {};
                $scope.newTask.taskPriority = $scope.priorities[0];
                $scope.tasks = TodoService.getAllTasks();
            }
        }

        $scope.deleteTask = function(task){
            TodoService.deleteTask(task);
            $scope.tasks = TodoService.getAllTasks();
        }

        $scope.getTasksByStatus = function(status){
            $scope.taskType = status;
            TodoService.getAllTasks().$promise.then(function (result) {
                $scope.tasks = result.filter(function (task){
                    return task.taskStatus === status;
                });
            });
        }

        $scope.markTaskComplete = function(task, status){
            TodoService.setTaskStatus(task, status);
        }
    }
})();