import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExpenseRow extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.rename = this.rename.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.changeIssue = this.changeIssue.bind(this);
    this.deleteSelf = this.deleteSelf.bind(this);
  }

  rename({ target }) {
    const { expenseId, renameExpense } = this.props;
    renameExpense(expenseId, target.value);
  }

  updateAmount({ target }) {
    const { expenseId, updateExpenseAmount } = this.props;
    let value = parseFloat(target.value, 10);
    if (!value) {
      value = 0;
    }
    updateExpenseAmount(expenseId, value);
  }

  changeIssue({ target }) {
    const { expenseId, changeExpenseIssue } = this.props;
    const nextIssueId = target.value;
    changeExpenseIssue(expenseId, nextIssueId);
  }

  deleteSelf() {
    const { expenseId, deleteExpense } = this.props;
    deleteExpense(expenseId);
  }

  render() {
    const {
      name,
      amount,
      issueId,
      issueOptions,
      defaultIssue
    } = this.props;
    const issueOptionsWithDefault = [defaultIssue, ...issueOptions];
    return (
      <div className="field is-grouped">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Expense Name"
            name="expenseName"
            value={name}
            onChange={this.rename}
          />
        </div>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Amount (USD)"
            name="expenseAmount"
            value={amount || ''}
            onChange={this.updateAmount}
          />
        </div>
        <select name="issue" value={issueId} onChange={this.changeIssue} className="select">
          { issueOptionsWithDefault.map(
            i => <option key={i.issueId()} value={i.issueId()}>{i.name()}</option>
          ) }
        </select>
      </div>
    );
  }
}

ExpenseRow.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  expenseId: PropTypes.string.isRequired,
  issueId: PropTypes.string.isRequired,
  issueOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultIssue: PropTypes.object.isRequired,
  renameExpense: PropTypes.func.isRequired,
  updateExpenseAmount: PropTypes.func.isRequired,
  changeExpenseIssue: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired
};
