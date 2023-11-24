const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/user_controller.js");
const database = require("../database")

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);
// change id to userID
passport.serializeUser(function (user, done) {
  done(null, user.userID);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user); // req.user = user
  } else {
    done({ message: "User not found" }, null);
  }
});

// Use the localLogin 
passport.use(localLogin);

module.exports = passport.use(localLogin);
