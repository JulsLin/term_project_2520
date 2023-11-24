let database = require("../database");
const passport = require("../middleware/passport");


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  // loginSubmin Local login redirect
  loginSubmit: passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  }),


  // WORK IN PROGRESS
  
  registerSubmit: (req, res) => {
    const { name, email, password } = req.body;
    // Check to see if user with the given email exists
    if (database.some((user) => user.email === email)) {
      return res.redirect("/register");
    }

    // Create a new user object
    // With the same format as the database we have now
    const newUser = {
      userID: database.length + 1,
      name,
      email,
      password,
      reminders: [],
    };

    // Add the new user to the database
    database.push(newUser);

    // Redirect to login page after successful registration
    res.redirect("/auth/login");
  },
  
};

module.exports = authController;
