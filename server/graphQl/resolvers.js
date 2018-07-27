'use strict';

const Task = require('../db/model/todo');

// Root resolver
const root = {
    tasks: () => {
        console.log('List Query');
        return Task.find().then((response) => response);
    },
    task: (args) => {
        return Task.findById(args.id).then((response) => response);
    },
    updateTask: (args) => {
        return Task.findByIdAndUpdate(args.id, {
            task: args.task
        }, {
            new: true
        }).then((response) => response);
    },
    updateTaskStatus: (args) => {
        return Task.findByIdAndUpdate(args.id, {
            completed: args.completed
        }, {
            new: true
        }).then((response) => response);
    },
    deleteTask: (args) => {
        return Task.findByIdAndRemove(args.id).then((response) => response);
    },
    addTask: (args) => {
        const newTask = new Task({
            task: args.task
        });
        return newTask.save().then((response) => response);
    }
};

module.exports = root;