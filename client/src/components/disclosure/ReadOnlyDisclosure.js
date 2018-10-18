import React, { Component } from 'react';

import { fetchDisclosure } from '../../requests/disclosures';
import { fetchUser } from '../../requests/authRequests';
import { fetchYears } from '../../requests/paymentDocumentation';

import OpenForEditing from './OpenForEditing';

import formatCurrency from '../uiElements/formatCurrency';

function namedValue(name, value) {
  return (
    <p className="has-text-weight-light">
      {name}
      :
      { ' ' }
      <span className="has-text-weight-bold">
        {value}
      </span>
    </p>
  );
}

export default class ReadOnlyDisclosure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyistId: '',
      lobbyist: { },
      reportingYear: '',
      principalName: '',
      principalAddress: '',
      principalPhoneNumber: '',
      lobbyistBusinessName: '',
      lobbyistBusinessAddress: '',
      lobbyistBusinessPhoneNumber: '',
      issues: [],
      disclosureId: '',
      user: {},
      yearInfo: {}
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { disclosureId } = match.params;
    try {
      const disclosure = await fetchDisclosure(disclosureId) || { };
      this.setState({
        lobbyistId: disclosure.lobbyistId ? disclosure.lobbyistId._id : '',
        lobbyist: disclosure.lobbyistId ? disclosure.lobbyistId : { },
        reportingYear: disclosure.reportingYear,
        principalName: disclosure.principalName,
        principalAddress: disclosure.principalAddress,
        principalPhoneNumber: disclosure.principalPhoneNumber,
        lobbyistBusinessName: disclosure.lobbyistBusinessName,
        lobbyistBusinessAddress: disclosure.lobbyistBusinessAddress,
        lobbyistBusinessPhoneNumber: disclosure.lobbyistBusinessPhoneNumber,
        issues: disclosure.issues,
        disclosureId: disclosure.id
      });
      const user = await fetchUser() || { };
      this.setState({ user });
      const yearInfo = await fetchYears() || { };
      this.setState({ yearInfo });
    } catch (err) {
      console.log('Error getting disclosure info.');
    }
  }

  render() {
    const {
      lobbyistId,
      lobbyist,
      principalName,
      principalAddress,
      principalPhoneNumber,
      lobbyistBusinessName,
      lobbyistBusinessAddress,
      lobbyistBusinessPhoneNumber,
      reportingYear,
      issues,
      disclosureId,
      user,
      yearInfo
    } = this.state;
    const reportingYearIsOpen = yearInfo.openYears
      && yearInfo.openYears.indexOf(reportingYear) !== -1;
    const userIsAdmin = user.isAdmin;
    const disclosureIsUsers = user._id === lobbyistId;
    const lobbyistName = lobbyist ? lobbyist.fullName : '';
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            { OpenForEditing(disclosureId, reportingYear, reportingYearIsOpen,
              userIsAdmin, disclosureIsUsers) }
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h5 className="title is-5">
              Calendar Year
              { ' ' }
              {reportingYear}
              { ' ' }
              Disclosure
            </h5>
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h6 className="title is-6">Lobbyist</h6>
            { namedValue('Name', lobbyistName) }
            { namedValue('Business', lobbyistBusinessName) }
            { namedValue('Phone', lobbyistBusinessPhoneNumber) }
            { namedValue('Address', lobbyistBusinessAddress) }
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h6 className="title is-6">Principal</h6>
            { namedValue('Name', principalName) }
            { namedValue('Phone', principalPhoneNumber) }
            { namedValue('Address', principalAddress) }
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h6 className="title is-6">Issues</h6>
            <ul>
              { issues.map(issue => (
                <li key={issue._id}>
                  <span className="has-text-weight-semibold">
                    {issue.name}
                  </span>
                </li>
              )) }
            </ul>
          </div>
        </div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="columns is-multiline">
              { issues.map(issue => (
                <div className="column is-6" key={issue._id}>
                  <h6 className="title is-6">
                    Expense Report:
                    { ' ' }
                    <em>
                      {issue.name}
                    </em>
                  </h6>
                  <table className="table">
                    <thead>
                      <tr key="head">
                        <th>Category</th>
                        <th>Expenses</th>
                      </tr>
                    </thead>
                    <tbody>
                      { issue.expenseReport.expenses
                        && issue.expenseReport.expenses.map(expense => (
                          <tr key={expense._id}>
                            <td>
                              {expense.category}
                            </td>
                            <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                              {formatCurrency(expense.amount, 6)}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>
                          Total
                        </td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                          {formatCurrency(issue.totalExpenses, 6)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReadOnlyDisclosure.propTypes = { };
ReadOnlyDisclosure.defaultProps = { };
