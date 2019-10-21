const LocalStrategy = require("passport-local").Strategy;
const User = require("../src/models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "login",
        passwordField: "usuario_id"
      },
      async (login, usuario_id, done) => {
        try {
          //Match User
          const user = await User.findOne({ login: login });

          if (!user) {
            return done(null, false);
          }

          //Match usuario_id
          if (user.usuario_id === usuario_id) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
