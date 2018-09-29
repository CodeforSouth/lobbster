const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Expense = new Schema({
  name: String,
  amount: Number
});

const Issue = new Schema({
  name: String,
  expenses: [Expense]
});

const PrincipalDisclosure = new Schema({
  lobbyistId: ObjectId,
  principalName: String,
  reportingYear: Number,
  issues: [Issue]
});
PrincipalDisclosure.index({ lobbyistId: 1, principalName: 1, reportingYear: 1 }, { unique: true });

mongoose.model('principal_disclosures', PrincipalDisclosure);
