const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated, forwardAuthenticated } = require("./middleware/checkAuth")
const multer  = require('multer')
const upload = multer({ dest: './public/uploads' })
// copy paste
const session = require("express-session");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});


app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Routes start here
app.get("/reminders", ensureAuthenticated,  reminderController.list);
app.get("/reminder/new", ensureAuthenticated,  reminderController.new);
app.get("/reminder/:id", ensureAuthenticated,  reminderController.listOne);
app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);
app.post("/reminder/", reminderController.create);
// ⭐ Implement these two routes below!
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// 👌 DO IT
app.get("/register", authController.register);
app.get("/auth/login", forwardAuthenticated, authController.login);

//app.post("/register", authController.registerSubmit);
app.post("/auth/login", passport.authenticate("local", {
  successRedirect: "/reminders",
  failureRedirect: "/auth/login"
}));
// Julianna added this:
app.post("/register", authController.registerSubmit);

app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/auth/login");
  });
});

//upload
app.post('/reminders', upload.single('uploaded_img'))

/* passport.authenticate("local, {
  successredirect: "/reminders",
  failurerefirect "/auth/login")*/
app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});
