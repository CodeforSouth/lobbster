const mongoose = require('mongoose');
const passport = require('passport');
const { hash } = require('../services/bcrypt');

const User = mongoose.model('users');

module.exports = (app) => {
  // Passport automatically sends a status of 401 if login fails.
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send(req.user);
  });

  app.post('/api/register', async (req, res) => {
    const {
      firstName,
      lastName,
      emailAddress,
      password
    } = req.body;
    try {
      const passwordHash = await hash(password);
      await new User({
        firstName,
        lastName,
        emailAddress,
        passwordHash,
        identityVerified: false,
        emailVerified: false,
        isAdmin: false
      }).save();
      res.status(200).send();
    } catch (error) {
      res.status(401).send();
    }
  });

  app.get('/api/current_user', (req, res) => {
    if (req.user) {
      res.status(200).send(req.user);
    } else {
      res.status(200).send({ });
    }
  });

  app.post('/api/logout', (req, res) => {
    req.logout();
    res.status(200).send();
  });

  // Middleware to make the admin API admin-only.
  app.use('/api/admin', (req, res, next) => {
    if (!req.user) {
      res.status(401).send();
    }
    if (!req.user.isAdmin) {
      res.status(403).send();
    }
    next();
  });
};
