const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
<<<<<<< HEAD
const userController = require("../controllers/userController");
=======
const userController = require("../controllers/use_controller.js");
>>>>>>> julianna
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
<<<<<<< HEAD
      ? done(null, user) // will have access to req.user
=======
      ? done(null, user)
>>>>>>> julianna
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

<<<<<<< HEAD
// will only run one single time when you log in. creates the session
=======
>>>>>>> julianna
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

<<<<<<< HEAD
// gonna run for every single user request.
passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
=======
passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user); // req.user = user
>>>>>>> julianna
  } else {
    done({ message: "User not found" }, null);
  }
});

<<<<<<< HEAD
module.exports = passport.use(localLogin);
=======
module.exports = passport.use(localLogin);
>>>>>>> julianna
