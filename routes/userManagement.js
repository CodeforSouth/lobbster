const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/api/admin/accounts_list', async (req, res) => {
    try {
      const users = await User.find({}).exec();
      res.json(users);
    } catch (err) {
      res.status(401);
    }
  });

  app.get('/api/admin/account_details', async (req, res) => {
    const { emailAddress } = req.query;
    try {
      const user = await User.findOne({ emailAddress });
      res.json(user);
    } catch (err) {
      res.status(404);
    }
  });

  app.post('/api/admin/modify_account_details', async (req, res) => {
    try {
      const updateTargets = [
        'firstName',
        'lastName',
        'emailAddress',
        'emailVerified',
        'isAdmin'
      ];
      const { _id } = req.body.params;

      const updates = {};
      updateTargets.forEach((field) => {
        updates[field] = req.body.params[field];
      });
      const user = await User.findByIdAndUpdate(_id, updates);
      res.status(200).send(user);
    } catch (error) {
      res.status(502).send();
    }
  });
};
