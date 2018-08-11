const mongoose = require('mongoose');
const passport = require('passport');
const { hash } = require('../services/bcrypt');
const User = mongoose.model('users');

module.exports = app => {
  // Passport automatically sends a status of 401 if login fails.
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send(req.user)
  });

  app.post('/api/register', async (req, res) => {
    let newUser = null;

    const { emailAddress, password } = req.body;
    const passwordHash = await hash(password);
    try {
      newUser = await new User(
        { emailAddress, passwordHash, emailVerified: false, isAdmin: false }
      ).save();
    } catch(error) {
      res.status(401).send(null);
    }

    res.status(200).send(newUser);
  });

  app.get('/api/current_user', (req, res) => {
    res.status(200).send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.status(200).send(req.user)
  });
};
