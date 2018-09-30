const requireLogin = (req, res, next) => {
  if (!req.user) {
    res.status(401).send();
  } else {
    next();
  }
};

module.exports = requireLogin;
