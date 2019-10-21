const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = {
  //Register User
  //   async register(req, res) {
  //     try {
  //       const { username, email, password, password2 } = req.body;
  //       let errors = [];

  //       if (!username || !email || !password || !password2) {
  //         errors.push({ msg: "Please enter all fields" });
  //       }

  //       if (password != password2) {
  //         errors.push({ msg: "Passwords do not match" });
  //       }

  //       if (password.length < 6) {
  //         errors.push({ msg: "Password must be at least 6 characters" });
  //       }

  //       if (errors.length > 0) {
  //         return res.json(errors);
  //       }

  //       const exist = await User.findOne({ email: email });

  //       if (exist) {
  //         errors.push({ msg: "Email Already exists" });
  //         return res.json(errors);
  //       }

  //       const newUser = new User({
  //         username,
  //         email,
  //         password
  //       });

  //       bcrypt.genSalt(10, (err, salt) => {
  //         bcrypt.hash(newUser.password, salt, (err, hash) => {
  //           if (err) throw err;
  //           newUser.password = hash;
  //           newUser.save();
  //         });
  //       });
  //       res.json(newUser);
  //       console.log(req.body);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },

  async login(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/deu",
      failureRedirect: "/naodeu"
    })(req, res, next);
  },

  async logout(req, res, next) {
    req.logout();
    res.redirect("/");
  }
};
