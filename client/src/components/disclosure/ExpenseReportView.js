import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExpenseLineView from './ExpenseLineView';

export default class ExpenseReportView extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  makeHeader() {
    const {
      issueName, showPrincipalName, showYear, principalName, year
    } = this.props;

    return (
      <div>
        <h1 className="title is-5 has-text-black">
          {`Expense Report${showYear ? `, Calendar Year ${year}` : ''}`}
        </h1>
        {
          showPrincipalName && (
            <h2 className="title is-5">
              Principal:
              { ' ' }
              <em>
                {principalName}
              </em>
            </h2>
          )
        }
        <h2 className="title is-5">
          Issue:
          { ' ' }
          <em>
            {issueName}
          </em>
        </h2>
      </div>
    );
  }

  render() {
    const {
      issueId,
      expenseReport,
      setExpenseAmount
    } = this.props;

    return (
      <div>
        { this.makeHeader() }
        {
          expenseReport.expenses().map(expense => (
            <ExpenseLineView
              category={expense.category()}
              amount={expense.amount()}
              issueId={issueId}
              setExpenseAmount={setExpenseAmount}
              key={expense.category()}
            />
          ))
        }
      </div>
    );
  }
}

ExpenseReportView.propTypes = {
  issueName: PropTypes.string.isRequired,
  issueId: PropTypes.string.isRequired,
  expenseReport: PropTypes.object.isRequired,
  setExpenseAmount: PropTypes.func.isRequired,
  showPrincipalName: PropTypes.bool,
  showYear: PropTypes.bool,
  principalName: PropTypes.string,
  year: PropTypes.number
};
ExpenseReportView.defaultProps = {
  showPrincipalName: false,
  showYear: false,
  principalName: '',
  year: 0
};
