const express = require("express");
const passport = require("../../middleware/passport");
const { forwardAuthenticated } = require("../../middleware/checkAuth");

const router = express.Router();

// imagine router is app.
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));
// anytime youre using res.render it sends u to an ejs page so do not start with /

router.post(
  "/login",
  // passport is capturing the info and sending it to the passport file
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    // send to login page again
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
