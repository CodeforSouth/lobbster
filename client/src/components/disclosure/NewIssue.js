let sortIndexCounter = 0;

function nextSortIndex() {
  sortIndexCounter += 1;
  return `${sortIndexCounter}`;
}

export class NewIssue {
  constructor(name = '') {
    this._name = name;
    this._sortIndex = nextSortIndex();
  }

  name() {
    return this._name;
  }

  isBlank() {
    return this._name === '';
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

  // Creates an object that can be submitted to MongoDB as an Issue.
  mongoReadyIssue() {
    return {
      name: this._name
    };
  }
}

export function sortNewIssues(newIssues) {
  newIssues.sort((a, b) => (parseInt(a.sortIndex(), 10) - parseInt(b.sortIndex(), 10)));
}
