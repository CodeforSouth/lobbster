import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExpenseRow from './ExpenseRow';

function optionFromChange(change) {
  if (change.toDelete()) {
    return null;
  } else if (change.newName()) {
    return {
      name: change.newName(),
      issue: change.issue()
    };
  } else {
    return {
      name: change.issue().name,
      issue: change.issue()
    };
  }
}

function blankExpense(defaultIssue) {
  return {
    name: '',
    issue: defaultIssue
  };
}

export default class ExpenseTable extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const {
      existingIssuesChanges,
      newIssues,
      reRender
    } = this.props;
    const issueOptions = [];
    existingIssuesChanges.forEach((change) => {
      const option = optionFromChange(change);
      if (option) {
        issueOptions.push(option);
      }
    });
    newIssues.forEach((issue) => {
      if (issue.name === '') {
        return;
      }
      issueOptions.push({
        name: issue.name,
        issue
      });
    });
    return (
      <div>
        {
          issueOptions.map((option) => {
            return option.issue.expenses.map(expense => (
              <ExpenseRow issue={option.issue} issueOptions={issueOptions} expense={expense} reRender={reRender} />
            ));
          })
        }
      </div>
    );
  }
}

ExpenseTable.propTypes = {
  existingIssuesChanges: PropTypes.arrayOf(PropTypes.object).isRequired,
  newIssues: PropTypes.arrayOf(PropTypes.object).isRequired,
  reRender: PropTypes.func.isRequired
};
