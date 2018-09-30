import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getAccountsList } from '../../requests/userManagement';

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

const accountRow = account => (
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
  </tr>
);

const accountsTable = allAccounts => (
  <table className="table">
    <thead>
      <tr key="head">
        <th>Email Address</th>
        <th>Owner</th>
        <th>Email Address Verified</th>
        <th>Account Type</th>
      </tr>
    </thead>
    <tbody>
      {allAccounts.map(account => accountRow(account))}
    </tbody>
  </table>
);

class UserAccountManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAccounts: []
    };
  }

  async componentDidMount() {
    try {
      const allAccounts = await getAccountsList();
      sortAccounts(allAccounts);
      this.setState({ allAccounts });
    } catch (err) {
      console.log('Could not get user accounts list.');
    }
  }

  render() {
    const { allAccounts } = this.state;
    return (
      <div className="hero-body has-background-white">
        <div className="container">
          <section>
            {accountsTable(allAccounts)}
          </section>
        </div>
      </div>
    );
  }
}

export default UserAccountManagement;
