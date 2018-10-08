const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Expense = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true }
});

const Issue = new Schema({
  name: { type: String, required: true },
  expenses: { type: [Expense], required: true }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});
Issue.virtual('totalExpenses').get(function sumIssueExpenses() {
  return this.expenses.reduce((total, curExpense) => total + curExpense.amount, 0);
});

const PrincipalDisclosure = new Schema({
  lobbyistId: { type: ObjectId, required: true },
  principalName: { type: String, required: true },
  reportingYear: { type: Number, required: true },
  feeWaver: {
    type: String,
    enum: ['not_requested', 'requested', 'granted', 'denied'],
    required: true
  },
  issues: { type: [Issue], required: true }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});
PrincipalDisclosure.index({ lobbyistId: 1, principalName: 1, reportingYear: 1 }, { unique: true });
PrincipalDisclosure.virtual('totalExpenses').get(function sumPrincipalExpenses() {
  return this.issues.reduce((total, curIssue) => total + curIssue.totalExpenses, 0);
});

mongoose.model('principal_disclosures', PrincipalDisclosure);
