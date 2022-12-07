let database = require("../database").Database;
const fetch = require("node-fetch");
require('dotenv').config();

let remindersController = {
  list: async (req, res) => {
    let loggedUser = req.user;
    let currentUser = database.find(function (user) {
      if (user.id === loggedUser.id || user.id == loggedUser.id) {
        return user;
      }
    });
    res.render("reminder/index", { name: currentUser.username, reminders: currentUser.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: async (req, res) => {
    let reminderToFind = req.params.id;
    let loggedUser = req.user;
    let currentUser = database.find(function (user) {
      if (user.id === loggedUser.id || user.id == loggedUser.id) {
        return user;
      }
    });
    let searchResult = currentUser.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: currentUser.reminders });
    }
  },

  create: (req, res) => {
    let loggedUser = req.user;
    let currentUser = database.find(function (user) {
      if (user.id === loggedUser.id || user.id == loggedUser.id) {
        return user;
      }
    });
    let reminder = {
      id: currentUser.reminders.length +1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      date: req.body.date,
    };
    currentUser.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit:async (req, res) => {
    let reminderToFind = req.params.id;
    let loggedUser = req.user;
    let currentUser = database.find(function (user) {
      if (user.id === loggedUser.id || user.id == loggedUser.id) {
        return user;
      }
    });
    let searchResult = currentUser.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderIdToUpdate = parseInt(req.params.id);
    let reminderIndex = reminderIdToUpdate - 1;
    let loggedUser = req.user;
    let currentUser = database.find(function (user) {
      if (user.id === loggedUser.id || user.id == loggedUser.id) {
        return user;
      }
    });
    let newReminder = {
      id: reminderIdToUpdate,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      date : req.body.date,
    };
    currentUser.reminders[reminderIndex] = newReminder;
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let loggedUser = req.user;
    let currentUser = database.find(function (user) {
      if (user.id === loggedUser.id || user.id == loggedUser.id) {
        return user;
      }
    });
    let reminderIdToDelete = parseInt(req.params.id);
    let foundReminder = currentUser.reminders.find(function (reminder) {
      for (i=0; i<= currentUser.reminders.length; i+1) {
        if (reminder.id == reminderIdToDelete);
        return i;
      }
    });
    currentUser.reminders.splice(foundReminder, 1);
    res.redirect("/reminders");
  } 
};

module.exports = remindersController;
