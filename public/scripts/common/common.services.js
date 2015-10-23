(function () {
    'use strict';

    angular
        .module('myTodo')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$resource', '$timeout'];
    function TodoService($resource, $timeout) {
        var resource = $resource('/api/tasks/:id', { id:'@id'}, {'update': { method:'PUT' }});
        return {
            getAllTasks: function() {
                return resource.query();
            },
            addTask: function(task) {
                task.taskStatus = "active";
                var taskDates = getTaskDates();
                task.taskDate = taskDates.startDate;
                task.taskExpirationDate = taskDates.endDate;

                //var resource = $resource('/api/tasks/:id', { id:'@id'},
                //    {
                //        'update': { method:'PUT' }
                //    });
                resource.save(task);
            },
            getTasksByStatus: function(status){
                return resource.query().filter(function (task){
                    return task.taskStatus === status;
                });
            },
            deleteTask: function(task){
                resource.delete({id:task._id});
            },
            setTaskStatus: function(task, status) {
                task.taskStatus = status;
                //var foundTask = resource.get({id:task._id}, function() {
                //    foundTask.taskStatus = status;
                //    foundTask.$save();
                //})
                resource.update({id:task._id}, task);
            },
            taskExpirationTimeout: function(){
                $timeout(onTimeout, 5000)
            }
        }

        //private functions
        function getTaskDates(){
            var currentDate = moment();
            var taskDate = currentDate;
            var timeToAdd = 0.3;
            currentDate.add(timeToAdd, 'minutes');
            var taskExpirationDate = currentDate;

            return {
                startDate: taskDate,
                endDate: taskExpirationDate
            }
        }

        function onTimeout(){
            var resource = $resource('/api/tasks/:id', { id:'@id'}, {'update': { method:'PUT' }});
            var tasks = resource.query();
            for(var i=0; i < tasks.length; i++){
                var currentDate = moment();
                if(currentDate > tasks[i].taskExpirationDate && tasks[i].taskStatus !== 'completed'){
                    tasks[i].taskStatus = 'expired';
                    resource.save(tasks[i]);
                }
            }
            //taskExpirationTimeout = $timeout(onTimeout, 5000);
        }
    }
})();
