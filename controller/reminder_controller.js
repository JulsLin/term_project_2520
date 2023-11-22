let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.users.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.users.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.users.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.users.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.users.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.users.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implementation here 👈
    let reminderToFind = req.params.id;
    let searchResult = database.users.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    // if reminder exists,
    if (searchResult != undefined) {

      // update title and description
      searchResult.title = req.body.title;
      searchResult.description = req.body.description;

      // redirect user to reminders page
      res.redirect("/reminders");

    } else {
      // if reminder is not found, return to all reminders
      res.render("reminder/index", { reminders: database.users.reminders });
    }
  },

  delete: (req, res) => {
    // implementation here 👈
    let reminderToFind = req.params.id;

    // get index of search result, because youre finding the ID
    let searchResultIndex = database.users.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });

    // if the ID of the reminder exists,
    if (searchResultIndex != -1) {

    // remove reminder from the array
    database.users.reminders.splice(searchResultIndex, 1);

    // redirect user to reminders page
    res.redirect("/reminders");

  } else {

    //  if reminder is not found, return to all reminders
    res.render("reminder/edit", { reminderItem: searchResult });
  }
  },
};

module.exports = remindersController;
