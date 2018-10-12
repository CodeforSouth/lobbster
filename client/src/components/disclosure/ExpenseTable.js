import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExpenseRow from './ExpenseRow';

export default class ExpenseTable extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const {
      expenseRenderList,
      issueOptions,
      defaultIssue,
      renameExpense,
      updateExpenseAmount,
      changeExpenseIssue,
      deleteExpense
    } = this.props;

    return (
      <div>
        {
          expenseRenderList.map(expense => (
            <ExpenseRow
              name={expense.name()}
              amount={expense.amount()}
              expenseId={expense.expenseId()}
              issueId={expense.issueId()}
              issueOptions={issueOptions}
              defaultIssue={defaultIssue}
              renameExpense={renameExpense}
              updateExpenseAmount={updateExpenseAmount}
              changeExpenseIssue={changeExpenseIssue}
              deleteExpense={deleteExpense}
              key={expense.expenseId()}
            />
          ))
        }
      </div>
    );
  }
}

ExpenseTable.propTypes = {
  expenseRenderList: PropTypes.arrayOf(PropTypes.object).isRequired,
  issueOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultIssue: PropTypes.object.isRequired,
  renameExpense: PropTypes.func.isRequired,
  updateExpenseAmount: PropTypes.func.isRequired,
  changeExpenseIssue: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired
};
