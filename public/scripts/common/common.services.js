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
                resource.save(task);
            },
            getTasksByStatus: function(status, callback){
                resource.query().$promise.then(function (result) {
                    var filteredTasks = result.filter(function (task){
                        return task.taskStatus === status;
                    });
                    callback(filteredTasks);
                });
            },
            deleteTask: function(task){
                resource.delete({id:task._id});
            },
            setTaskStatus: function(task, status) {
                task.taskStatus = status;
                var taskId = task._id;
                delete task._id;
                resource.update({id:taskId}, task);
            },
            taskExpirationTimeout: function(){
                $timeout(onTimeout, 0)
            }
        }

        //private functions
        function getTaskDates(){
            var currentDate = moment();
            var taskDate = currentDate;
            var timeToAdd = 1;                      //Adds 1 minute as expiration time. Change the value here as per your requirement
            currentDate.add(timeToAdd, 'minutes');  //Change minutes to days/months/years etc.
            var taskExpirationDate = currentDate;

            return {
                startDate: taskDate,
                endDate: taskExpirationDate
            }
        }

        function onTimeout(){
            var tasks = resource.query();

            tasks.$promise.then(function (result) {
                tasks = result;
                for(var i=0; i < tasks.length; i++){
                    var currentDate = moment();
                    if(currentDate.format() > moment(tasks[i].taskExpirationDate).format() && tasks[i].taskStatus !== 'completed'){
                        tasks[i].taskStatus = 'expired';
                        var taskId = tasks[i]._id;
                        delete tasks[i]._id;
                        resource.update({id:taskId}, tasks[i]);
                    }
                }
            });

            var myLoop = function(){
                $timeout(onTimeout, 5000);
            };
            myLoop();
        }
    }
})();
