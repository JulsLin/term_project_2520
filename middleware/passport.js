const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user) // will have access to req.user
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

// will only run one single time when you log in. creates the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// gonna run for every single user request.
passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);
