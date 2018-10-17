const mongoose = require('mongoose');

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

module.exports = (app) => {
  app.get('/api/reporting_years', async (req, res) => {
    try {
      const yearInfo = await getYears();
      res.status(200).json(yearInfo).send();
    } catch (error) {
      console.log('Error getting reporting year info.')
      res.status(502).send();
    }
  });
};
