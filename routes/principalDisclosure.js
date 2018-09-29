const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const PrincipalDisclosure = mongoose.model('principal_disclosures');

// This function relies on the Mongoose model enforcing the unique property
// of entries' (lobbyistId, reportingYear, principalName) triples.
async function createNewDisclosure(lobbyistId, reportingYear, principalName) {
  const disclosure = await new PrincipalDisclosure({
    lobbyistId, reportingYear, principalName, issues: []
  }).save();
  return disclosure;
}

module.exports = (app) => {
  app.use('/api/disclosure', requireLogin);

  // TODO:
  //  Only permit an admin OR the person the data is about.
  //  Only permit the person the data is about if the edit period is open.

  app.post('/api/disclosure/create', async (req, res) => {
    const { lobbyistId, reportingYear, principalName } = req.body;
    try {
      const disclosure = await createNewDisclosure(lobbyistId, reportingYear, principalName);
      res.json(disclosure);
    } catch (err) {
      console.log('Error creating disclosure', lobbyistId, reportingYear, principalName, err);
      res.status(401).send();
    }
  });
};
