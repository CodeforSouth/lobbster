const mongoose = require('mongoose');

const PaymentDocumentation = mongoose.model('payment_documentation');
const PrincipalDisclosure = mongoose.model('principal_disclosures');

// Determines the year that is currently happening.
function getCurrentYear() {
  return new Date().getFullYear();
}

// Compiles a list of all years open for reporting.
function listOpenYears() {
  const thisYear = getCurrentYear();
  const nextYear = thisYear + 1;
  const lastYear = thisYear - 1;

  const reportingCutoffInThisYear = new Date(`October, 2 ${thisYear}`);
  const now = new Date();

  const openYears = [thisYear];
  if (now < reportingCutoffInThisYear) {
    openYears.push(lastYear);
  } else {
    openYears.push(nextYear);
  }

  return openYears.sort();
}

// Compiles a list of all non-open years for which records exist.
async function listHistoricYears() {
  const disclosures = await PrincipalDisclosure.find({});
  const years = new Set([]);
  disclosures.forEach(disclosure => years.add(disclosure.reportingYear));
  listOpenYears().forEach(year => years.delete(year));
  return Array.from(years.values()).sort();
}

async function getYears() {
  const currentYear = getCurrentYear();
  const openYears = listOpenYears();
  const historicYears = await listHistoricYears();
  const allYears = new Set([]);
  allYears.add(currentYear);
  openYears.forEach(year => allYears.add(year));
  historicYears.forEach(year => allYears.add(year));
  return {
    currentYear,
    openYears,
    historicYears,
    allYears: Array.from(allYears.values()).sort()
  };
}

async function disclosureExists(lobbyistId, reportingYear) {
  const disclosure = await PrincipalDisclosure.find({ lobbyistId, reportingYear }).limit(1);
  return disclosure.length === 1;
}

async function getPaymentsDocumentation(lobbyistId) {
  // Get documentation.
  const documentations = await PaymentDocumentation.find({ lobbyistId });

  // Find out which years don't have documentation.
  const yearInfo = await getYears();
  let yearsUnaccountedFor = new Set(yearInfo.allYears);
  documentations.forEach(doc => yearsUnaccountedFor.delete(doc.forYear));
  yearsUnaccountedFor = Array.from(yearsUnaccountedFor.values());

  // Create records for missing years.
  for (let i = 0; i < yearsUnaccountedFor.length; i += 1) {
    const doc = await new PaymentDocumentation({
      lobbyistId,
      forYear: yearsUnaccountedFor[i],
      amountPaid: 0,
      status: ' '
    }).save();
    documentations.push(doc);
  }

  // Set status to 'action_needed' from '', or vice versa, when appropriate.
  for (let i = 0; i < documentations.length; i += 1) {
    let doc = documentations[i];
    const hasDisclosure = await disclosureExists(doc.lobbyistId, doc.forYear);
    if (hasDisclosure && doc.status === ' ') {
      doc.status = 'action_needed';
      doc = await doc.save();
      documentations[i] = doc;
    } else if (!hasDisclosure && doc.status === 'action_needed') {
      doc.status = ' ';
      doc = await doc.save();
      documentations[i] = doc;
    }
  }

  return documentations.sort((a, b) => a.forYear - b.forYear);
}

module.exports = (app) => {
  app.get('/api/payments_documentation', async (req, res) => {
    const {
      accountId
    } = req.query;
    try {
      const paymentsDocumentation = await getPaymentsDocumentation(accountId);
      res.status(200).json(paymentsDocumentation);
    } catch (error) {
      console.log('Error finding payment documentation.');
      res.status(502).send();
    }
  });

  app.post('/api/update_payments_documentation', async (req, res) => {
    const { updatedPaymentsDocumentation } = req.body.params;
    try {
      const updatedDocs = [];
      for (let i = 0; i < updatedPaymentsDocumentation.length; i += 1) {
        const doc = updatedPaymentsDocumentation[i];
        let record = await PaymentDocumentation.findById(doc._id);

        record.amountPaid = doc.amountPaid;
        record.status = doc.status;
        record.effectiveDate = doc.effectiveDate;

        record = await record.save();

        updatedDocs.push(record);
      }
      res.status(200);
      res.json(updatedDocs);
    } catch (error) {
      console.log(error);
      console.log('Error updating payments documentation.')
      res.status(502).send();
    }
  });

  app.get('/api/reporting_years', async (req, res) => {
    try {
      const yearInfo = await getYears();
      res.status(200).json(yearInfo);
    } catch (error) {
      console.log('Error getting reporting year info.')
      res.status(502).send();
    }
  });
};
