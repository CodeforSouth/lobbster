import React, { Component } from 'react';
import PropTypes from 'prop-types';

function remove(issue, expense) {
  for (let i = 0; i < issue.expenses.length; i += 1) {
    if (issue.expenses[i] == expense) {
      issue.expenses.splice(i, 1);
    }
  }
}

function add(issueOptions, issueName, expense) {
  for (let i = 0; i < issueOptions.length; i += 1) {
    if (issueOptions[i].name === issueName) {
      issueOptions[i].issue.expenses.push(expense);
      return;
    }
  }
}

export default class ExpenseRow extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const {
      issueOptions, issue, expense, reRender
    } = this.props;
    if (target.name === 'expenseName') {
      expense.name = target.value;
    } else if (target.name === 'expenseAmount') {
      expense.amount = target.value;
    } else if (target.name === 'issue') {
      const prevIssue = issue;
      const nextIssueName = target.value;
      remove(prevIssue, expense);
      add(issueOptions, nextIssueName, expense);
    }
    reRender();
  }

  render() {
    const {
      issueOptions, issue, expense
    } = this.props;
    return (
      <div className="field is-grouped">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Expense Name"
            name="expenseName"
            value={expense.name}
            onChange={this.handleChange}
          />
        </div>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Amount (USD)"
            name="expenseAmount"
            value={expense.amount}
            onChange={this.handleChange}
          />
        </div>
        <select name="issue" value={issue.name} onChange={this.handleChange} className="select">
          { issueOptions.map(i => <option key={i.name} value={i.name}>{i.name}</option>) }
        </select>
      </div>
    );
  }
}

ExpenseRow.propTypes = {
  issueOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  issue: PropTypes.object.isRequired,
  expense: PropTypes.object.isRequired,
  reRender: PropTypes.func.isRequired
};
