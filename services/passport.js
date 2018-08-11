const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { match } = require('./bcrypt');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  {
    usernameField: 'emailAddress',
    passwordField: 'password'
  },
  async (emailAddress, password, done) => {
    const existingUser = await User.findOne({ emailAddress });
    if (existingUser) {
      const correctPassword = await match(password, existingUser.passwordHash);
      if (correctPassword) {
        return done(null, existingUser);
      }
      return done(null, false, { message: 'Invalid password.' });

    }
    return done(null, false, { message: 'Invalid user.' });
  }
));
