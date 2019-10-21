module.exports = {
  Authenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/naodeu");
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
};
