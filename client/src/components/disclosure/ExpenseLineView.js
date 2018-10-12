import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExpenseLineView extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.setAmount = this.setAmount.bind(this);
  }

  setAmount({ target }) {
    const {
      category, issueId, setExpenseAmount
    } = this.props;
    setExpenseAmount(issueId, category, target.value);
  }

  render() {
    const {
      category,
      amount
    } = this.props;
    return (
      <div className="field is-grouped">
        <div className="control">
          <input
            className="input"
            type="text"
            readOnly
            placeholder="Expense Category"
            name="category"
            value={category}
          />
        </div>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Amount (USD)"
            name="amount"
            value={amount}
            onChange={this.setAmount}
          />
        </div>
      </div>
    );
  }
}

ExpenseLineView.propTypes = {
  category: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  issueId: PropTypes.string.isRequired,
  setExpenseAmount: PropTypes.func.isRequired
};
