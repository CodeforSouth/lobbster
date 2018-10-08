import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { cloneDeep } from 'lodash';

import { createNewDisclosure, fetchDisclosure, modifyDisclosure } from '../../requests/disclosures';
import IssueChange from './IssueChange';

import { requestStates, submitButton } from '../uiElements/submitButton';
import ListInput from './ListInput';
import ExpenseTable from './ExpenseTable';

function reconcileIssues(issueChanges, newIssues) {
  const revisedIssues = [];
  issueChanges.forEach((issueChange) => {
    if (issueChange.toDelete()) {
      return;
    }
    const updatedIssue = cloneDeep(issueChange.issue());
    if (issueChange.newName()) {
      updatedIssue.name = issueChange.newName();
    }
    revisedIssues.push(updatedIssue);
  });
  newIssues.forEach((issue) => {
    if (issue.name === '') { // TODO: find regex for invalid issue
      return;
    }
    revisedIssues.push(issue);
  });
  return revisedIssues;
}

export const editDisclosureModes = {
  editExisting: 1,
  createNew: 2
};

// constants that relate to the mongo enum values
export const feeWaverValues = {
  notRequested: 'not_requested',
  requested: 'requested',
  granted: 'granted',
  denied: 'denied'
};

function disclosureState(
  mode = editDisclosureModes.createNew,
  principalName = '',
  reportingYear = 0,
  existingIssues = [],
  feeWaver = feeWaverValues.notRequested,
  disclosureId = '',
  submitRequestStatus = requestStates.initial
) {
  const existingIssuesChanges = [];
  existingIssues.forEach(issue => existingIssuesChanges.push(new IssueChange(issue)));
  const newIssues = [];
  return {
    mode,
    principalName,
    reportingYear,
    existingIssues,
    existingIssuesChanges,
    newIssues,
    feeWaver,
    disclosureId,
    submitRequestStatus
  };
}

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

export class EditDisclosure extends Component {
  constructor(props) {
    super(props);

    const {
      mode, principalName, reportingYear
    } = this.props;
    if (mode === editDisclosureModes.createNew) {
      this.state = disclosureState(mode, principalName, reportingYear);
    } else {
      this.state = disclosureState(mode);
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reRender = this.reRender.bind(this);
  }

  async componentDidMount() {
    const { mode } = this.state;
    if (mode === editDisclosureModes.editExisting) {
      const { match } = this.props;
      const { disclosureId } = match.params;
      try {
        const disclosure = await fetchDisclosure(disclosureId) || { };
        this.setState(disclosureState(
          mode,
          disclosure.principalName,
          disclosure.reportingYear,
          disclosure.issues,
          disclosure.feeWaver,
          disclosure.id
        ));
      } catch (err) {
        console.log('Error getting account info.');
      }
    }
  }

  handleChange({ target }) {
    const newValue = target.value;
    this.setState({
      [target.name]: newValue
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { existingIssuesChanges, newIssues } = this.state;
    const reconciledIssues = reconcileIssues(existingIssuesChanges, newIssues);

    try {
      this.setState({ submitRequestStatus: requestStates.submitted });
      const {
        mode,
        principalName,
        reportingYear,
        feeWaver
      } = this.state;
      const { lobbyistId } = this.props;
      if (mode === editDisclosureModes.createNew) {
        await createNewDisclosure(
          lobbyistId,
          reportingYear,
          principalName,
          feeWaver,
          reconciledIssues
        );
      } else if (mode === editDisclosureModes.editExisting) {
        const { disclosureId } = this.state;
        await modifyDisclosure(
          disclosureId,
          lobbyistId,
          reportingYear,
          principalName,
          feeWaver,
          reconciledIssues
        )
      }
      this.setState({ submitRequestStatus: requestStates.succeeded });
    } catch (err) {
      this.setState({ submitRequestStatus: requestStates.failed });
    }
  }

  reRender() {
    this.setState({ }); // forces a rerender
  }

  render() {
    const {
      principalName,
      reportingYear,
      existingIssuesChanges,
      newIssues,
      // feeWaver,
      submitRequestStatus
    } = this.state;
    const { yearOptions } = this.props;
    return (
      <div className="hero-body">
        <section>
          // TODO: add header with lobbyist name
          <form onSubmit={this.handleSubmit}>
            {textFeild('Principal Name', 'principalName', principalName, this.handleChange)}
            <div className="field">
              <label className="label" htmlFor="reportingYear">Calendar Year of Lobbying</label>
              <select name="reportingYear" value={reportingYear} onChange={this.handleChange} className="select">
                { yearOptions.map(year => <option key={year} value={year}>{year}</option>) }
              </select>
            </div>
            <label className="label" htmlFor="issues">Issues Represented</label>
            <ListInput name="issues" existingIssuesChanges={existingIssuesChanges} newIssues={newIssues} reRender={this.reRender} />
            <label className="label" htmlFor="expenses">Expenses</label>
            <ExpenseTable existingIssuesChanges={existingIssuesChanges} newIssues={newIssues} reRender={this.reRender} />
            <div className="field is-grouped">
              {submitButton('Save', submitRequestStatus, this.handleSubmit)}
              <Link to="/">
                <button type="button" className="button is-light">
                  <span>Cancel</span>
                </button>
              </Link>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

EditDisclosure.propTypes = {
  match: PropTypes.object,
  mode: PropTypes.oneOf([
    editDisclosureModes.editExisting,
    editDisclosureModes.createNew
  ]).isRequired,
  lobbyistId: PropTypes.string,
  principalName: PropTypes.string,
  reportingYear: PropTypes.number, // note: reportingYear must be a value in yearOptions
  yearOptions: PropTypes.arrayOf(PropTypes.number)
};
EditDisclosure.defaultProps = {
  match: null,
  lobbyistId: '',
  principalName: '',
  reportingYear: 2018,
  yearOptions: [2018, 2017]
};
