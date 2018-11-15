import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getAccountsList } from '../../requests/userManagement';
import { fetchAllPaymentsDocumentations } from '../../requests/paymentDocumentation';

const accountTypeToLabel = isAdmin => isAdmin ? 'Admin' : 'Lobbyist';
const booleanToLabel = boolean => boolean ? 'True' : 'False';
const booleanToColor = boolean => boolean ? 'has-text-success' : 'has-text-danger';

// Sorts Lobbyists to be first, and then sorts alphabetically by name.
function sortAccounts(accounts) {
  accounts.sort((a, b) => {
    if (a.isAdmin && !b.isAdmin) {
      return 1;
    } else if (!a.isAdmin && b.isAdmin) {
      return -1;
    } else {
      return a.fullName.localeCompare(b.fullName);
    }
  });
}

function currentYear() {
  return (new Date()).getFullYear();
}

function listYearOptions(allPaymentsDocumentation) {
  const yearOptions = [];
  for (let i = 0; i < allPaymentsDocumentation.length; i += 1) {
    const year = allPaymentsDocumentation[i].forYear;
    if (yearOptions.indexOf(year) === -1) {
      yearOptions.push(year);
    }
  }
  yearOptions.sort();
  return yearOptions;
}

const paidStatusToLabel = { };
paidStatusToLabel[' '] = '-';
paidStatusToLabel.action_needed = 'Needs Action';
paidStatusToLabel.paid = 'Paid';
paidStatusToLabel.exemption_requested = 'Exemption Requested';
paidStatusToLabel.exemption_approved = 'Exempt';
paidStatusToLabel.exemption_rejected = 'Exemption Rejected';

const paidStatusToColor = { };
paidStatusToColor[' '] = '-';
paidStatusToColor.action_needed = 'has-text-warning';
paidStatusToColor.paid = 'has-text-success';
paidStatusToColor.exemption_requested = 'has-text-warning';
paidStatusToColor.exemption_approved = 'has-text-success';
paidStatusToColor.exemption_rejected = 'has-text-warning';

function accountToPaymentStatus(account, year, allPaymentsDocumentation) {
  for (let i = 0; i < allPaymentsDocumentation.length; i += 1) {
    const documentation = allPaymentsDocumentation[i];
    if (account._id === documentation.lobbyistId && year === documentation.forYear) {
      return documentation.status;
    }
  }
  return ' ';
}

const accountRow = (account, selectedYear, allPaymentsDocumentation) => {
  const paidStatus = accountToPaymentStatus(account, selectedYear, allPaymentsDocumentation);
  return (
    <tr key={account.emailAddress}>
      <td className="has-text-link">
        <Link to={`/edit-user-account/${account.emailAddress}`}>
          { account.emailAddress }
        </Link>
      </td>
      <td>{ account.fullName }</td>
      <td className={booleanToColor(account.emailVerified)}>
        { booleanToLabel(account.emailVerified) }
      </td>
      <td>{ accountTypeToLabel(account.isAdmin) }</td>
      <td className={paidStatusToColor[paidStatus]}>
        { paidStatusToLabel[paidStatus] }
      </td>
    </tr>
  );
};

const accountsTable = (
  allAccounts, yearOptions, selectedYear, allPaymentsDocumentation, handleChange
) => (
  <table className="table">
    <thead>
      <tr key="head">
        <th>Email Address</th>
        <th>Owner</th>
        <th>Email Address Verified</th>
        <th>Account Type</th>
        <th>
          Payment Status
          { ' ' }
          <select name="selectedYear" value={selectedYear} onChange={handleChange} className="select">
            { yearOptions.map(year => <option key={year} value={year}>{year}</option>) }
          </select>
        </th>
      </tr>
    </thead>
    <tbody>
      {allAccounts.map(account => accountRow(account, selectedYear, allPaymentsDocumentation))}
    </tbody>
  </table>
);

class UserAccountManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAccounts: [],
      allPaymentsDocumentation: [],
      selectedYear: currentYear()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    try {
      const allAccounts = await getAccountsList();
      const allPaymentsDocumentation = await fetchAllPaymentsDocumentations();
      sortAccounts(allAccounts);
      this.setState({ allAccounts, allPaymentsDocumentation });
    } catch (err) {
      // console.log('Could not get user accounts list.');
    }
  }

  handleChange({ target }) {
    let newValue = target.value;

    if (target.name === 'selectedYear') {
      newValue = parseInt(newValue, 10);
    }

    this.setState({
      [target.name]: newValue
    });
  }

  render() {
    const { allAccounts, allPaymentsDocumentation, selectedYear } = this.state;
    const yearOptions = listYearOptions(allPaymentsDocumentation);
    return (
      <div className="hero-body has-background-white">
        <div className="container has-text-left">
          <div className="column is-10 is-offset-1">
            <div className="container">
              {
                accountsTable(
                  allAccounts, yearOptions, selectedYear, allPaymentsDocumentation,
                  this.handleChange
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserAccountManagement;
