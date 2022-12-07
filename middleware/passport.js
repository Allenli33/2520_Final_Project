const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const userController = require("../controller/auth_controller");

const localLogin = new LocalStrategy(
    { usernameField: 'email',
    passwordField: 'password' },
    (email, password, done) => {
        let user = userController.getUserByInfo(email, password);
        return user
            ? done(null, user)
            : done(null, false, {
                message: "Login details incorrect"
            });
    }
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    let user = userController.getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found." }, null);
    }
});

module.exports = passport.use(localLogin);


