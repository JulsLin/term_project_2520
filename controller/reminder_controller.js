let database = require("../database");

let remindersController = {
  list: (req, res) => {
    /*
    const userID = req.user.id
    const userReminders = database.find((user) => user.userID === userID).reminders;
    res.render("reminder/index", { reminders: userReminders });
    */
   // question mark form stack overflow. 

   // Changed this to match the userID in the database 
    const userID = req.user?.userID || 1; 
    const user = database.userModel.findById(userID);
    const userReminders = user?.reminders || []; 
    // admin role: if role == "admin", then direct to page concerning sessions.
    res.render("reminder/index", { reminders: userReminders });
    
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    /// 
    const userID = req.user?.id || 1;
    const reminderToFind = req.params.id;
    const searchResult = database.userModel
      .find((user) => user.userID === userID)
      .reminders.find((reminder) => reminder.id == reminderToFind);
    

    if (searchResult) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      const userReminders = database.userModel.findOne((user) => user.userID === userID).reminders;
      res.render("reminder/index", { reminders: userReminders });
    }
  },

  create: (req, res) => {
    const userID = req.user?.userID || 1;
    const user = database.userModel.findById(userID);
    const userReminders = user?.reminders || [];

    // upload
    const multer  = require('multer')
    const upload = multer({ dest: './public/uploads' })
  
    const reminder = {
      id: userReminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      cover: ''
    };
    
    // if the image exists, set it as the reminder cover
    if (req.file) {
	    reminder.cover = req.file.path;
    }

    userReminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    const userID = req.user?.id || 1;
    const reminderToFind = req.params.id;
    const searchResult = database
      .find((user) => user.userID === userID)
      .reminders.find((reminder) => reminder.id == reminderToFind);
    
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implementation here 👈
    const userID = req.user?.id || 1;
    const reminderToFind = req.params.id;
    const userReminders = database.find((user) => user.userID === userID).reminders;
    const searchResult = userReminders.find((reminder) => reminder.id == reminderToFind);

    ///
/*  let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
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
      res.render("reminder/index", { reminders: userReminders });
    }
  },

  delete: (req, res) => {
    // implementation here 👈

    const userID = req.user?.id || 1;
    const reminderToFind = req.params.id;
    const userReminders = database.find((user) => user.userID === userID).reminders;
    // get index of search result, because youre finding the ID
    const searchResultIndex = userReminders.findIndex((reminder) => reminder.id == reminderToFind);

    // if ID 
    if (searchResultIndex !== -1) {

    // remove reminder from the array
    userReminders.splice(searchResultIndex, 1);

    // redirect user to reminders page
    res.redirect("/reminders");

  } else {

    //  if reminder is not found, return to all reminders
    res.render("reminder/edit", { reminderItem: searchResult });
  }
  },
};

module.exports = remindersController;
