const requireAdmin = (req, res, next) => {
  if (!req.user) {
    res.status(401).send();
  } else if (!req.user.isAdmin) {
    res.status(403).send();
  } else {
    next();
  }
};

module.exports = requireAdmin;
