'use strict';

var tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },
  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks);
  },
  add: function (name, task) {
    // saves a task for a given person
    if (Object.keys(tasks).indexOf(name) === -1){
      tasks[name] = [task];
      if (!task.complete)
        task.complete = false;
    }else{
      tasks[name].push(task);
      if (!task.complete)
        task.complete = false;
    }

  },
  // etc.
  list: function(name){
    return tasks[name];
  },
  complete: function(name, taskNum){
    tasks[name][taskNum].complete = true;
  },
  remove: function(name, taskNum){
    tasks[name].splice(taskNum, 1);
  }

};
