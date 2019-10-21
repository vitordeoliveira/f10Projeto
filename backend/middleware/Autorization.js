module.exports = {
  professor: function(req, res, next) {
    if (req.user.role === "professor") {
      return next();
    }
    res.status(401).redirect("/naodeu");
  },
  aluno: function(req, res, next) {
    if (req.user.role === "aluno") {
      return next();
    }
    res.status(401).redirect("/naodeu");
  },
  admin: function(req, res, next) {
    if (req.user.role === "admin") {
      return next();
    }
    res.status(401).redirect("/naodeu");
  }
};
