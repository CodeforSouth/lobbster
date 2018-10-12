const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const expenseCategories = [
  'Food & Beverage',
  'Enternatinment',
  'Research',
  'Communications',
  'Media/Advertising',
  'Publications',
  'Travel',
  'Lodging',
  'Special Events',
  'Other'
];

const Expense = new Schema({
  category: {
    type: String,
    enum: expenseCategories,
    required: true
  },
  amount: { type: Number, required: true }
});

const ExpenseReport = new Schema({
  expenses: {
    type: [Expense],
    default: [
      { category: expenseCategories[0], amount: 0 },
      { category: expenseCategories[1], amount: 0 },
      { category: expenseCategories[2], amount: 0 },
      { category: expenseCategories[3], amount: 0 },
      { category: expenseCategories[4], amount: 0 },
      { category: expenseCategories[5], amount: 0 },
      { category: expenseCategories[6], amount: 0 },
      { category: expenseCategories[7], amount: 0 },
      { category: expenseCategories[8], amount: 0 },
      { category: expenseCategories[9], amount: 0 }
    ],
    required: true
  }
});

const Issue = new Schema({
  name: { type: String, required: true },
  expenseReport: { type: ExpenseReport, required: true }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});
Issue.virtual('totalExpenses').get(function sumIssueExpenses() {
  return this.expenseReport.expenses.reduce((total, curExpense) => total + curExpense.amount, 0);
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
