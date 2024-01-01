const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/cms/sign-in');
};

module.exports = { isAuthenticated };
