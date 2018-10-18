const requireConcernedUserOrAdmin = (req, res, next) => {
  let paramsObject;
  if (req.body.params) {
    paramsObject = req.body.params;
  } else {
    paramsObject = req.query;
  }
  const { lobbyistId } = paramsObject;
  if (!req.user) {
    res.status(401).send();
  } else if (req.user.id !== lobbyistId && !req.user.isAdmin) {
    res.status(403).send();
  } else {
    next();
  }
};

module.exports = requireConcernedUserOrAdmin;
