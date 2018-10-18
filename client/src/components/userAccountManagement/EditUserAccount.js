import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getAccountDetails, modifyAccountDetails } from '../../requests/userManagement';
import { fetchPaymentsDocumentation, updatePaymentsDocumentation } from '../../requests/paymentDocumentation';

import { requestStates, submitButton } from '../uiElements/submitButton';


const textFeild = (fieldLabel, fieldName, value, handleChange) => (
  <div className="field">
    <label className="label" htmlFor={fieldName}>{fieldLabel}</label>
    {value !== null && (
      <div className="control">
        <input
          className="input"
          type="text"
          id={fieldName}
          placeholder={fieldLabel}
          name={fieldName}
          value={value}
          onChange={handleChange}
        />
      </div>
    )}
  </div>
);

const booleanDropdown = (fieldLabel, fieldName, booleanValue, handleChange) => {
  const textColor = booleanValue ? 'has-text-success' : 'has-text-danger';
  return (
    <div className="field">
      <label className="label">{fieldLabel}</label>
      {booleanValue !== null && (
        <div className="control">
          <div className="select" id={fieldName}>
            <select
              className={textColor}
              name={fieldName}
              value={booleanValue}
              onChange={handleChange}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

const accountTypeDropdown = (isAdmin, handleChange) => {
  const fieldName = 'isAdmin';
  return (
    <div className="field">
      <label className="label">Account Type</label>
      {isAdmin !== null && (
        <div className="control">
          <div className="select" id={fieldName}>
            <select name={fieldName} value={isAdmin} onChange={handleChange}>
              <option value="true">Administrator</option>
              <option value="false">Lobbyist</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// Reflects the MongoDB enum.
const paymentStatusOptions = [
  ' ',
  'action_needed',
  'payment_pending',
  'paid',
  'exemption_requested',
  'exemption_approved',
  'exemption_rejected'
];

const paymentStatusLabels = {
  action_needed: 'Action Needed',
  payment_pending: 'Payment Pending',
  paid: 'Paid',
  exemption_requested: 'Non-Profit Exemption Requested',
  exemption_approved: 'Non-Profit Exemption Approved',
  exemption_rejected: 'Non-Profit Exemption Rejected'
};
paymentStatusLabels[' '] = '-';

const paymentDocumentationRow = (doc, onPaymentDocChange) => (
  <tr key={doc.forYear}>
    <td>{doc.forYear}</td>
    <td>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Amount (USD)"
          name={`amountPaid_${doc.forYear}`}
          value={doc.amountPaid || ''}
          onChange={onPaymentDocChange}
        />
      </div>
    </td>
    <td>
      <div className="control">
        <div className="select" id={`status_${doc.forYear}`}>
          <select name={`status_${doc.forYear}`} value={doc.status} onChange={onPaymentDocChange}>
            {paymentStatusOptions.map(
              status => <option key={status} value={status}>{paymentStatusLabels[status]}</option>
            )}
          </select>
        </div>
      </div>
    </td>
    <td>
      <div className="control">
        <input
          className="input"
          type="date"
          placeholder="-"
          name={`effectiveDate_${doc.forYear}`}
          value={`${doc.effectiveDate}`.split('T')[0] || ''}
          onChange={onPaymentDocChange}
        />
      </div>
    </td>
  </tr>
);

const paymentsDocumentationTable = (paymentsDocumentation, onPaymentDocChange) => (
  <div>
    <label className="label">Payment Records</label>
    <table className="table">
      <thead>
        <tr key="head">
          <th>Calendar Year</th>
          <th>Amount Paid</th>
          <th>Status</th>
          <th>Effective Date</th>
        </tr>
      </thead>
      <tbody>
        {paymentsDocumentation.map(doc => paymentDocumentationRow(doc, onPaymentDocChange))}
      </tbody>
    </table>
  </div>
);

class EditUserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: null,
      emailAddress: null,
      firstName: null,
      lastName: null,
      emailVerified: null,
      isAdmin: null,
      paymentsDocumentation: [],
      submitRequestStatus: requestStates.initial
    };

    this.handleChange = this.handleChange.bind(this);
    this.onPaymentDocChange = this.onPaymentDocChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { emailAddress } = match.params;
    try {
      const userToEdit = await getAccountDetails(emailAddress) || { };
      const paymentsDocumentation = await fetchPaymentsDocumentation(userToEdit._id) || [];
      this.setState({ ...userToEdit });
      this.setState({ paymentsDocumentation });
    } catch (err) {
      console.log('Error getting account info.');
    }
  }

  onPaymentDocChange({ target }) {
    const { paymentsDocumentation } = this.state;
    const propertyName = target.name.split('_')[0];
    const year = parseInt(target.name.split('_')[1], 10);
    paymentsDocumentation.forEach((doc) => {
      if (doc.forYear === year) {
        doc[propertyName] = target.value;
        if (propertyName === 'amountPaid' && target.value === '') {
          doc.amountPaid = 0;
        }
      }
    });
    this.setState({ paymentsDocumentation });
  }

  handleChange({ target }) {
    let newValue = target.value;

    // Convert string values that should be booleans.
    const booleanTargets = new Set(['emailVerified', 'isAdmin']);
    if (booleanTargets.has(target.name)) {
      newValue = newValue === 'true';
    }

    this.setState({
      [target.name]: newValue
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {
      _id,
      firstName,
      lastName,
      emailAddress,
      emailVerified,
      isAdmin,
      paymentsDocumentation
    } = this.state;
    try {
      this.setState({ submitRequestStatus: requestStates.submitted });
      await modifyAccountDetails(
        _id,
        firstName,
        lastName,
        emailAddress,
        emailVerified,
        isAdmin
      );
      const updatedPaymentsDocs = await updatePaymentsDocumentation(paymentsDocumentation);
      this.setState({ paymentsDocumentation: updatedPaymentsDocs });
      this.setState({ submitRequestStatus: requestStates.succeeded });
    } catch (err) {
      this.setState({ submitRequestStatus: requestStates.failed });
    }
  }

  render() {
    const {
      emailAddress,
      firstName,
      lastName,
      emailVerified,
      isAdmin,
      paymentsDocumentation,
      submitRequestStatus
    } = this.state;
    return (
      <div className="hero-body has-background-white">
        <div className="container has-text-left">
          <div className="column is-4 is-offset-1">
            <form onSubmit={this.handleSubmit}>
              {textFeild('Email Address', 'emailAddress', emailAddress, this.handleChange)}
              {textFeild('First Name', 'firstName', firstName, this.handleChange)}
              {textFeild('Last Name', 'lastName', lastName, this.handleChange)}
              {booleanDropdown('Email Address Verified', 'emailVerified', emailVerified, this.handleChange)}
              {accountTypeDropdown(isAdmin, this.handleChange)}
              {paymentsDocumentationTable(paymentsDocumentation, this.onPaymentDocChange)}
              <div className="field is-grouped">
                {submitButton('Save', submitRequestStatus, this.handleSubmit)}
                <a href="/user-account-management">
                  <button type="button" className="button is-light">
                    <span>Cancel</span>
                  </button>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditUserAccount.propTypes = {
  match: PropTypes.object
};
EditUserAccount.defaultProps = {
  match: null
};

export default EditUserAccount;
