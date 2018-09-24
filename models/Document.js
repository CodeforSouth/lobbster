const mongoose = require('mongoose');

const { Schema } = mongoose;

const historyEntrySchema = new Schema({
  action: {
    type: String,
    enum: ['create', 'submit', 'withdraw', 'approve', 'reject'],
    required: true
  },
  performedOn: { type: Date, default: Date.now, required: true },
  performedBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  notesIncluded: { type: String, required: false },
  document: { type: Schema.Types.ObjectId, ref: 'documents', required: true }
});

const documentSchema = new Schema({
  content: { type: String, required: true },
  history: [{ type: Schema.Types.ObjectId, ref: 'review_actions', required: true }]
});

mongoose.model('history_entries', historyEntrySchema);
mongoose.model('documents', documentSchema);
