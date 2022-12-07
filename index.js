const express = require("express");
const app = express();
const passport = require("passport");
const session = require('express-session');
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authRoute = require("./controller/userController");
const { ensureAuthenticated } = require("./middleware/checkAuth");


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
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
app.use(passport.initialize());
app.use(passport.session());

// Routes start here
app.use("/auth", authRoute);

//reminders
app.get("/reminders", ensureAuthenticated, reminderController.list);
app.get("/reminder/new", ensureAuthenticated, reminderController.new);
app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);
app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);
app.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);
app.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);



app.listen(3021, function () {
  console.log(
    "Server running. Visit: localhost:3021/reminders in your browser 🚀"
  );
});
