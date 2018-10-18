import React, { Component } from 'react';

import { fetchUser } from '../../requests/authRequests';
import {
  fetchPaymentsDocumentation,
  updatePaymentsDocumentation,
  fetchYears
} from '../../requests/paymentDocumentation';
import handleToken from '../../requests/stripe';

import { requestStates, submitButton } from '../uiElements/submitButton';
import StripeWrapper from '../stripe/StripeWrapper';

const paymentStatusLabels = {
  action_needed: 'Action Needed',
  payment_pending: 'Payment Pending',
  paid: 'Paid',
  exemption_requested: 'Non-Profit Exemption Requested',
  exemption_approved: 'Non-Profit Exemption Approved',
  exemption_rejected: 'Non-Profit Exemption Rejected'
};
paymentStatusLabels[' '] = '-';

const paymentStatusColors = {
  action_needed: 'is-warning',
  payment_pending: 'is-warning',
  paid: 'is-success',
  exemption_requested: 'is-warning',
  exemption_approved: 'is-success',
  exemption_rejected: 'is-warning'
};
paymentStatusColors[' '] = '';

// Only show the button if the year is open, and status is appropriate.
const showButton = (openYears, year, status) => (openYears.indexOf(year) !== -1 && ['action_needed', 'exemption_rejected', ' '].indexOf(status) !== -1);

const buttonMargin = { margin: '.3rem' };
const makePaymentButton = (openYears, year, status, sendPaymentTokenToServer) => {
  if (showButton(openYears, year, status)) {
    return (
      <div style={buttonMargin}>
        <StripeWrapper forYear={year} handleToken={sendPaymentTokenToServer} />
      </div>
    );
  } else {
    return '';
  }
};

const requestExemptionButton = (openYears, year, status, openExemptionModal) => {
  if (showButton(openYears, year, status)) {
    return (
      <button type="button" className="button" style={buttonMargin} onClick={openExemptionModal}>
        Request Non-Profit Exemption
      </button>
    );
  } else {
    return '';
  }
};

const noBottomBorder = { borderBottom: 'none' };

const paymentDocumentationRow = (doc, openYears, openExemptionModal, sendPaymentTokenToServer) => (
  <tr key={doc.forYear}>
    <td>{doc.forYear}</td>
    <td>{doc.amountPaid || '-'}</td>
    <td className={paymentStatusColors[doc.status]}>{paymentStatusLabels[doc.status]}</td>
    <td>{doc.effectiveDate ? `${doc.effectiveDate}`.split('T')[0] : '-'}</td>
    <td style={noBottomBorder}>
      {makePaymentButton(openYears, doc.forYear, doc.status, sendPaymentTokenToServer)}
      {requestExemptionButton(
        openYears, doc.forYear, doc.status, () => openExemptionModal(doc.forYear)
      )}
    </td>
  </tr>
);

const paymentsDocumentationTable = (
  paymentsDocumentation, openYears, openExemptionModal, sendPaymentTokenToServer
) => (
  <div>
    <label className="label">Payment Records</label>
    <table className="table">
      <thead>
        <tr key="head">
          <th>Calendar Year</th>
          <th>Amount Paid</th>
          <th>Status</th>
          <th>Effective Date</th>
          <th style={noBottomBorder} />
        </tr>
      </thead>
      <tbody>
        {paymentsDocumentation.map(
          doc => paymentDocumentationRow(
            doc,
            openYears,
            openExemptionModal,
            sendPaymentTokenToServer
          )
        )}
      </tbody>
    </table>
  </div>
);

class MyPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentsDocumentation: [],
      openYears: [],
      requestExemptionModalIsVisible: false,
      selectedYear: 0,
      submitRequestStatus: requestStates.initial
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.openRequestExemptionModal = this.openRequestExemptionModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendPaymentTokenToServer = this.sendPaymentTokenToServer.bind(this);
  }

  async componentDidMount() {
    try {
      const user = await fetchUser() || { };
      const paymentsDocumentation = await fetchPaymentsDocumentation(user._id) || [];
      const { openYears } = await fetchYears();
      this.setState({ paymentsDocumentation, openYears });
    } catch (err) {
      console.log('Error getting account info.');
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { paymentsDocumentation, requestExemptionModalIsVisible, selectedYear } = this.state;


    if (requestExemptionModalIsVisible) {
      // Apply the requested change.
      paymentsDocumentation.forEach((doc) => {
        if (doc.forYear === selectedYear) {
          doc.status = 'exemption_requested';
          doc.effectiveDate = new Date();
        }
      });
      try {
        this.setState({ submitRequestStatus: requestStates.submitted });
        const updatedPaymentsDocs = await updatePaymentsDocumentation(paymentsDocumentation);
        this.setState({ paymentsDocumentation: updatedPaymentsDocs });
        this.setState({ submitRequestStatus: requestStates.succeeded });
      } catch (err) {
        this.setState({ submitRequestStatus: requestStates.failed });
      }
    }
  }

  async sendPaymentTokenToServer(token, forYear) {
    const updatedPaymentDocumentation = await handleToken(token, forYear);
    if (updatedPaymentDocumentation) {
      const { paymentsDocumentation } = this.state;
      for (let i = 0; i < paymentsDocumentation.length; i += 1) {
        if (paymentsDocumentation[i].forYear === forYear) {
          paymentsDocumentation[i] = updatedPaymentDocumentation;
        }
      }
      this.setState({ paymentsDocumentation });
    }
  }

  openRequestExemptionModal(selectedYear) {
    this.setState({ selectedYear, requestExemptionModalIsVisible: true });
  }

  closeModal() {
    this.setState({
      selectedYear: 0,
      requestExemptionModalIsVisible: false
    });
  }

  requestExemptionModal() {
    const {
      requestExemptionModalIsVisible: modalIsVisible,
      selectedYear,
      submitRequestStatus
    } = this.state;
    return (
      <div className={`modal${modalIsVisible ? ' is-active' : ''}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Request Non-Profit Exemption</p>
            <button type="button" className="delete" aria-label="close" onClick={this.closeModal} />
          </header>
          <section className="modal-card-body">
            Use the submit button below to request a non-profit fee exemption for
            {' '}
            {selectedYear}
            .
          </section>
          <footer className="modal-card-foot">
            {submitButton('Submit Request', submitRequestStatus)}
            <button type="button" className="button" onClick={this.closeModal}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }

  render() {
    const {
      paymentsDocumentation,
      openYears
    } = this.state;
    return (
      <div className="hero-body has-background-white">
        <div className="container has-text-left">
          <div className="column is-4 is-offset-1">
            <form onSubmit={this.handleSubmit}>
              { this.requestExemptionModal() }
              {paymentsDocumentationTable(
                paymentsDocumentation,
                openYears,
                this.openRequestExemptionModal,
                this.sendPaymentTokenToServer
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPayments;
