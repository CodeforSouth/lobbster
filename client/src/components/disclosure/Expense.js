export default class Expense {
  constructor(issue, expense) {
    this._issue = issue;
    this._expense = expense;
  }

  issue() {
    return this._issue;
  }

  expense() {
    return this._expense;
  }

  newName() {
    return this._newName;
  }

  setToNoChange() {
    this._toDelete = false;
    this._newName = null;
  }

  setToDelete() {
    this._toDelete = true;
    this._newName = null;
  }

  setToRename(newName) {
    this._toDelete = false;
    this._newName = newName;
  }
}
