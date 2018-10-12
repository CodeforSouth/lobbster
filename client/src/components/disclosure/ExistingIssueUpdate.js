import { cloneDeep } from 'lodash';

let sortIndexCounter = 0;

function nextSortIndex() {
  sortIndexCounter += 1;
  return `${sortIndexCounter}`;
}

export class ExistingIssueUpdate {
  constructor(originalVersion) {
    this._originalVersion = cloneDeep(originalVersion);
    this.reset();
    this._sortIndex = nextSortIndex();
  }

  reset() {
    this._newVersion = cloneDeep(this._originalVersion);
    this._issueIsDeleted = false;
  }

  delete() {
    this._issueIsDeleted = true;
  }

  rename(newName) {
    if (this.isDelete()) {
      this.reset();
    }
    this._newVersion.name = newName;
  }

  isDelete() {
    return this._issueIsDeleted;
  }

  isRename() {
    return !this.isDelete() && (this.newName() !== this.originalName());
  }

  newName() {
    return this.isDelete() ? null : this._newVersion.name;
  }

  originalName() {
    return this._originalVersion.name;
  }

  pendingName() {
    return this.isRename() ? this.newName() : this.originalName();
  }

  name() {
    return this.pendingName();
  }

  issueId() {
    return this._originalVersion.id;
  }

  sortIndex() {
    return this._sortId;
  }

  mongoReadyIssue() {
    return {
      name: this.pendingName()
    };
  }
}

export function sortExistingIssueUpdates(existingIssueUpdates) {
  existingIssueUpdates.sort((a, b) => (parseInt(a.sortIndex(), 10) - parseInt(b.sortIndex(), 10)));
}
