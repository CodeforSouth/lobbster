const mongoose = require('mongoose');

const HistoryEntry = mongoose.model('history_entries');
const Document = mongoose.model('documents');

async function createAndAddHistoryEntry(document, action, performedBy, notesIncluded) {
  const historyEntry = await new HistoryEntry({
    action,
    performedBy,
    notesIncluded,
    document: document.id
  }).save();
  document.history.push(historyEntry.id);
  const updatedDocument = await document.save();
  return { document: updatedDocument, historyEntry };
}

module.exports = (app) => {
  // Only allow users who are logged in.
  app.use('/api/document', (req, res, next) => {
    if (!req.user) {
      res.status(401).send();
    } else {
      next();
    }
  });


  app.post('/api/document/create', async (req, res) => {
    const { content, notesIncluded } = req.body;
    try {
      let document = await new Document({
        content, history: []
      }).save();
      document = await createAndAddHistoryEntry(document, 'create', req.user.id, notesIncluded);
      res.json(document);
    } catch (err) {
      res.status(401).send();
    }
  });

  app.post('/api/admin/approve', async (req, res) => {
    const { documentId, notesIncluded } = req.body;
    try {
      const document = await Document.findById(documentId);
      const { historyEntry } = await createAndAddHistoryEntry(document, 'approve', req.user.id, notesIncluded);
      res.json(historyEntry);
    } catch (err) {
      res.status(401).send();
    }
  });

  app.post('/api/admin/reject', async (req, res) => {
    const { documentId, notesIncluded } = req.body;
    try {
      const document = await Document.findById(documentId);
      const { historyEntry } = await createAndAddHistoryEntry(document, 'reject', req.user.id, notesIncluded);
      res.json(historyEntry);
    } catch (err) {
      res.status(401).send();
    }
  });
};
