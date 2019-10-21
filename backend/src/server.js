const express = require("express");
const routes = require("./routes");
const connectDB = require("../config/db");
const passport = require("passport");
const app = express();
const session = require("express-session");
const fileUpload = require("express-fileupload");
const cors = require("cors");

//Passport Config
require("../config/passport")(passport);
//Connect DB
connectDB();

//Express
app.use(express.json());
app.use(fileUpload());
const config = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(config));

//Express Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ROUTES IN END
app.use(routes);

app.listen(5000, "localhost", () => {
  console.log("Running");
});
