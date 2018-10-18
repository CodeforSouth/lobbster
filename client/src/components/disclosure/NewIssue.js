import { cloneDeep } from 'lodash';
import ExpenseReport from './ExpenseReport';

let sortIndexCounter = 0;

function nextSortIndex() {
  sortIndexCounter += 1;
  return `${sortIndexCounter}`;
}

export class NewIssue {
  constructor(name = '') {
    this._name = name;
    this._expenseReport = new ExpenseReport();
    this._sortIndex = nextSortIndex();
  }

  name() {
    return this._name;
  }

  setAmount(category, amount) {
    this._expenseReport.setAmount(category, amount);
  }

  expenseReport() {
    return cloneDeep(this._expenseReport);
  }

  isBlank() {
    return this._name === '' && this._expenseReport.totalAmount() === 0;
  }

  rename(newName) {
    this._name = newName;
  }

  sortIndex() {
    return this._sortIndex;
  }

  issueId() {
    return this._sortIndex;
  }

  makeMongoIssue() {
    return {
      name: this._name,
      expenseReport: this._expenseReport.makeMongoExpenseReport()
    };
  }
}

export function sortNewIssues(newIssues) {
  newIssues.sort((a, b) => (parseInt(a.sortIndex(), 10) - parseInt(b.sortIndex(), 10)));
}
