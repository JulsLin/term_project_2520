let database = require("../database");

let remindersController = {
  list: (req, res) => {
<<<<<<< HEAD
    /*
    const userID = req.user.id
    const userReminders = database.find((user) => user.userID === userID).reminders;
    res.render("reminder/index", { reminders: userReminders });
    */
   // question mark form stack overflow. 
    const userID = req.user?.id || 1; 
      const userReminders = database.find((user) => user.userID === userID)?.reminders; 
      res.render("reminder/index", { reminders: userReminders });
    
=======
    res.render("reminder/index", { reminders: database.users.reminders });
>>>>>>> julianna
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
<<<<<<< HEAD
    /// 
    const userID = req.user?.id || 1;
    const reminderToFind = req.params.id;
    const searchResult = database
      .find((user) => user.userID === userID)
      .reminders.find((reminder) => reminder.id == reminderToFind);
    

    if (searchResult) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      const userReminders = database.find((user) => user.userID === userID).reminders;
      res.render("reminder/index", { reminders: userReminders });
=======
    let reminderToFind = req.params.id;
    let searchResult = database.users.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.users.reminders });
>>>>>>> julianna
    }
  },

  create: (req, res) => {
<<<<<<< HEAD
    ///
    const userID = req.user?.id || 1;
    const userReminders = database.find((user) => user.userID === userID).reminders;
    //

    const reminder = {
      id: database.reminders.length + 1,
=======
    let reminder = {
      id: database.users.reminders.length + 1,
>>>>>>> julianna
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
<<<<<<< HEAD
    userReminders.push(reminder);
=======
    database.users.reminders.push(reminder);
>>>>>>> julianna
    res.redirect("/reminders");
  },

  edit: (req, res) => {
<<<<<<< HEAD
    const userID = req.user?.id || 1;
    const reminderToFind = req.params.id;
    const searchResult = database
      .find((user) => user.userID === userID)
      .reminders.find((reminder) => reminder.id == reminderToFind);
    
=======
    let reminderToFind = req.params.id;
    let searchResult = database.users.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
>>>>>>> julianna
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implementation here 👈
<<<<<<< HEAD
    const userID = req.user?.id || 1;
    const reminderToFind = req.params.id;
    const userReminders = database.find((user) => user.userID === userID).reminders;
    const searchResult = userReminders.find((reminder) => reminder.id == reminderToFind);

    ///
/*  let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
=======
    let reminderToFind = req.params.id;
    let searchResult = database.users.reminders.find(function (reminder) {
>>>>>>> julianna
      return reminder.id == reminderToFind;
    });
*/
    if (searchResult) {

      // update title and description
      searchResult.title = req.body.title;
      searchResult.description = req.body.description;

      // redirect user to reminders page
      res.redirect("/reminders");

    } else {
      // if reminder is not found, return to all reminders
<<<<<<< HEAD
      res.render("reminder/index", { reminders: userReminders });
=======
      res.render("reminder/index", { reminders: database.users.reminders });
>>>>>>> julianna
    }
  },

  delete: (req, res) => {
    // implementation here 👈

    const userID = req.user?.id || 1;
    const reminderToFind = req.params.id;
    const userReminders = database.find((user) => user.userID === userID).reminders;
    // get index of search result, because youre finding the ID
<<<<<<< HEAD
    const searchResultIndex = userReminders.findIndex((reminder) => reminder.id == reminderToFind);
=======
    let searchResultIndex = database.users.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });
>>>>>>> julianna

    // if ID 
    if (searchResultIndex !== -1) {

    // remove reminder from the array
<<<<<<< HEAD
    userReminders.splice(searchResultIndex, 1);
=======
    database.users.reminders.splice(searchResultIndex, 1);
>>>>>>> julianna

    // redirect user to reminders page
    res.redirect("/reminders");

  } else {

    //  if reminder is not found, return to all reminders
    res.render("reminder/edit", { reminderItem: searchResult });
  }
  },
};

module.exports = remindersController;
