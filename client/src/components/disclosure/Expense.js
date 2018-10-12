let sortIndexCounter = 0;

function nextSortIndex() {
  sortIndexCounter += 1;
  return `${sortIndexCounter}`;
}

export class Expense {
  constructor(name = '', amount = 0, issueId) {
    this._sortIndex = nextSortIndex();
    this._name = '';
    this._amount = 0;
    this._issueId = issueId;
    this.rename(name);
    this.setAmount(amount);
  }

  name() {
    return this._name;
  }

  amount() {
    return this._amount;
  }

  expenseId() {
    return this._sortIndex;
  }

  sortIndex() {
    return this._sortIndex;
  }

  issueId() {
    return this._issueId;
  }

  isBlank() {
    return this.name() === '' && this.amount() === 0;
  }

  rename(newName) {
    if (typeof newName === 'string') {
      this._name = newName;
    } else {
      this._name = '';
    }
  }

  setAmount(amount) {
    if (typeof amount === 'number') {
      this._amount = amount;
    } else {
      this._amount = 0;
    }
  }

  setIssueId(issueId) {
    this._issueId = issueId;
  }

  makeMongoExpense() {
    return {
      name: this.name(),
      amount: this.amount()
    };
  }
}

export function sortExpenses(expenses) {
  expenses.sort((a, b) => (parseInt(a.sortIndex(), 10) - parseInt(b.sortIndex(), 10)));
}
