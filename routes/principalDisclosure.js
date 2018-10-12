const mongoose = require('mongoose');
const requireConcernedUserOrAdmin = require('../middleware/requireConcernedUserOrAdmin');

const PrincipalDisclosure = mongoose.model('principal_disclosures');

function selectorFromOptionalFields(fieldsObject) {
  const selector = { };
  const fields = Object.keys(fieldsObject);
  for (let i = 0; i < fields.length; i += 1) {
    const name = fields[i];
    const value = fieldsObject[name];
    if (value) {
      selector[name] = value;
    }
  }
  return selector;
}

// This function relies on the Mongoose model enforcing the unique property
// of entries' (lobbyistId, reportingYear, principalName) triples.
async function createNewDisclosure(lobbyistId, reportingYear, principalName, feeWaver, issues = []) {
  const disclosure = await new PrincipalDisclosure({
    lobbyistId,
    reportingYear,
    principalName,
    feeWaver,
    issues
  }).save();
  return disclosure;
}

module.exports = (app) => {
  // TODO:
  //  Only permit the person the data is about if the edit period is open.

  app.use('/api/disclosure/create', requireConcernedUserOrAdmin);
  app.post('/api/disclosure/create', async (req, res) => {
    const {
      lobbyistId, reportingYear, principalName, feeWaver, issues
    } = req.body.params;
    try {
      const disclosure = await createNewDisclosure(
        lobbyistId,
        reportingYear,
        principalName,
        feeWaver,
        issues
      );
      res.json(disclosure);
    } catch (err) {
      console.log('Error creating disclosure', lobbyistId, reportingYear, principalName, err);
      res.status(401).send();
    }
  });

  app.post('/api/disclosure/fetch', async (req, res) => {
    const { lobbyistId, reportingYear, principal } = req.body.params;
    const selector = selectorFromOptionalFields({ lobbyistId, reportingYear, principal });
    try {
      const disclosures = await PrincipalDisclosure.find(selector);
      res.json(disclosures);
    } catch (err) {
      res.status(404);
    }
  });

  app.post('/api/disclosure/fetchById', async (req, res) => {
    const { disclosureId } = req.body.params;
    try {
      const disclosure = await PrincipalDisclosure.findById(disclosureId);
      res.json(disclosure);
    } catch (err) {
      res.status(404);
    }
  });

  app.use('/api/disclosure/modify_disclosure', requireConcernedUserOrAdmin);
  app.post('/api/disclosure/modify_disclosure', async (req, res) => {
    try {
      const updateTargets = [
        'lobbyistId',
        'reportingYear',
        'principalName',
        'feeWaver',
        'issues'
      ];
      const { disclosureId } = req.body.params;

      const updates = {};
      updateTargets.forEach((field) => {
        updates[field] = req.body.params[field];
      });
      const disclosure = await PrincipalDisclosure.findByIdAndUpdate(disclosureId, updates);
      res.status(200).send(disclosure);
    } catch (error) {
      res.status(502).send();
    }
  });
};
