export default class IssueChange {
  constructor(issue) {
    this._issue = issue;
    this._toDelete = false;
    this._newName = null;
  }

  issue() {
    return this._issue;
  }

  toDelete() {
    return this._toDelete;
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
