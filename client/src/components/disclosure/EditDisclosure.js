import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import { cloneDeep } from 'lodash';

import { ExistingIssueUpdate, sortExistingIssueUpdates } from './ExistingIssueUpdate';
import { NewIssue, sortNewIssues } from './NewIssue';

import { fetchUser } from '../../requests/authRequests';
import { createNewDisclosure, fetchDisclosure, modifyDisclosure } from '../../requests/disclosures';
import { fetchYears } from '../../requests/paymentDocumentation';

import { saveChangesPrompt, saveNewPrompt } from './savePrompt';
import { requestStates } from '../uiElements/submitButton';
import textField from '../uiElements/textField';
import textArea from '../uiElements/textArea';
import IssuesEditList from './IssuesEditList';
import ExpenseReportView from './ExpenseReportView';

export const editDisclosureModes = {
  editExisting: 1,
  createNew: 2
};

function reconcileIssues(issueUpdates, newIssues) {
  // Remove deleted and blank issues.
  const updatedIssues = issueUpdates.filter(update => !update.isDelete());
  const processedNewIssues = newIssues.filter(issue => !issue.isBlank());

  // Convert issues and their internal records into objects ready for MongoDB.
  const reconciledIssues = cloneDeep([...updatedIssues, ...processedNewIssues])
    .map(issue => issue.makeMongoIssue());

  return reconciledIssues;
}

function getIssueOptions(issuesList) {
  return cloneDeep(issuesList)
    .filter(issue => issue.isBlank ? !issue.isBlank() : true)
    .filter(issue => issue.isDelete ? !issue.isDelete() : true);
}

function disclosureState(
  mode = editDisclosureModes.createNew,
  reportingYear = 0,
  principalName = '',
  principalAddress = '',
  principalPhoneNumber = '',
  lobbyistBusinessName = '',
  lobbyistBusinessAddress = '',
  lobbyistBusinessPhoneNumber = '',
  existingIssues = [],
  newIssues = [],
  disclosureId = '',
  submitRequestStatus = requestStates.initial,
  yearInfo = { },
  user = { },
  lobbyistName = ''
) {
  const updatedExistingIssues = existingIssues.map(issue => new ExistingIssueUpdate(issue));

  return {
    mode,
    reportingYear,
    principalName,
    principalAddress,
    principalPhoneNumber,
    lobbyistBusinessName,
    lobbyistBusinessAddress,
    lobbyistBusinessPhoneNumber,
    updatedExistingIssues,
    newIssues,
    disclosureId,
    submitRequestStatus,
    yearInfo,
    user,
    lobbyistName
  };
}

export class EditDisclosure extends Component {
  constructor(props) {
    super(props);

    const {
      mode, principalName, reportingYear
    } = this.props;
    if (mode === editDisclosureModes.createNew) {
      this.state = disclosureState(mode, reportingYear, principalName);
    } else {
      this.state = disclosureState(mode);
    }

    this.resetIssue = this.resetIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.renameIssue = this.renameIssue.bind(this);

    this.setExpenseAmount = this.setExpenseAmount.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const { mode } = this.state;
      if (mode === editDisclosureModes.editExisting) {
        const { match } = this.props;
        const { disclosureId } = match.params;
        const disclosure = await fetchDisclosure(disclosureId) || { };
        const newIssues = [new NewIssue()];
        const lobbyistName = disclosure.lobbyistId ? disclosure.lobbyistId.fullName : '';
        const updatedState = disclosureState(
          mode,
          disclosure.reportingYear,
          disclosure.principalName,
          disclosure.principalAddress,
          disclosure.principalPhoneNumber,
          disclosure.lobbyistBusinessName,
          disclosure.lobbyistBusinessAddress,
          disclosure.lobbyistBusinessPhoneNumber,
          disclosure.issues,
          newIssues,
          disclosure.id,
          undefined,
          undefined,
          undefined,
          lobbyistName
        );
        this.setState(updatedState);
      }
      const yearInfo = await fetchYears() || { };
      this.setState({ yearInfo });
      const user = await fetchUser() || { };
      this.setState({ user });
    } catch (err) {
      console.log('Error getting disclosure info.');
    }
    this.manageBlankNewIssues();
  }

  setExpenseAmount(issueId, category, amount) {
    const { updatedExistingIssues } = this.state;
    for (let i = 0; i < updatedExistingIssues.length; i += 1) {
      const updatedIssue = updatedExistingIssues[i];
      if (updatedIssue.issueId() === issueId) {
        updatedIssue.setAmount(category, amount);
        this.setState({ updatedExistingIssues });
        return;
      }
    }
    const { newIssues } = this.state;
    for (let i = 0; i < newIssues.length; i += 1) {
      const issue = newIssues[i];
      if (issue.sortIndex() === issueId) {
        issue.setAmount(category, amount);
        this.setState({ newIssues });
        this.manageBlankNewIssues(issue.issueId());
        return;
      }
    }
  }

  handleChange({ target }) {
    const newValue = target.value;
    this.setState({
      [target.name]: newValue
    });
  }

  // Ensures that there is always a blank new issue with the highest provisional id.
  // Purges all other blank new issues, except for the one with preserveId, to allow
  //  preservation of the issue that was just cleared in case someone plans to write
  //  something there.
  manageBlankNewIssues(preserveId = null) {
    const { newIssues } = this.state;
    let newIssuesCopy = cloneDeep(newIssues);

    // Get the new issues in order by Id.
    sortNewIssues(newIssuesCopy);

    // Remove blanks.
    newIssuesCopy = newIssuesCopy.filter(
      newIssue => (newIssue.issueId() === preserveId) || !newIssue.isBlank()
    );

    // Ensure a blank new issue is at the end.
    if (newIssuesCopy.length === 0 || !newIssuesCopy[newIssuesCopy.length - 1].isBlank()) {
      newIssuesCopy.push(new NewIssue());
    }
    this.setState({ newIssues: newIssuesCopy });
  }

  renameIssue(issueId, newName) {
    const { updatedExistingIssues } = this.state;
    for (let i = 0; i < updatedExistingIssues.length; i += 1) {
      const updatedIssue = updatedExistingIssues[i];
      if (updatedIssue.issueId() === issueId) {
        updatedIssue.rename(newName);
        this.setState({ updatedExistingIssues });
        return;
      }
    }
    const { newIssues } = this.state;
    for (let i = 0; i < newIssues.length; i += 1) {
      const issue = newIssues[i];
      if (issue.sortIndex() === issueId) {
        issue.rename(newName);
        this.setState({ newIssues });
        this.manageBlankNewIssues(issue.issueId());
        return;
      }
    }
  }

  deleteIssue(issueId) {
    const { updatedExistingIssues } = this.state;
    for (let i = 0; i < updatedExistingIssues.length; i += 1) {
      const updatedIssue = updatedExistingIssues[i];
      if (updatedIssue.issueId() === issueId) {
        updatedIssue.delete();
        this.setState({ updatedExistingIssues });
        return;
      }
    }
    const { newIssues } = this.state;
    for (let i = 0; i < newIssues.length; i += 1) {
      const issue = newIssues[i];
      if (issue.issueId() === issueId) {
        issue.delete();
        this.setState({ newIssues });
        return;
      }
    }
  }

  resetIssue(issueId) {
    const { updatedExistingIssues } = this.state;
    for (let i = 0; i < updatedExistingIssues.length; i += 1) {
      const updatedIssue = updatedExistingIssues[i];
      if (updatedIssue.issueId() === issueId) {
        updatedIssue.reset();
        this.setState({ updatedExistingIssues });
        return;
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { updatedExistingIssues, newIssues } = this.state;
    const reconciledIssues = reconcileIssues(updatedExistingIssues, newIssues);
    const {
      mode,
      reportingYear,
      principalName,
      principalAddress,
      principalPhoneNumber,
      lobbyistBusinessName,
      lobbyistBusinessAddress,
      lobbyistBusinessPhoneNumber
    } = this.state;
    try {
      this.setState({ submitRequestStatus: requestStates.submitted });
      const { lobbyistId } = this.props;
      if (mode === editDisclosureModes.createNew) {
        const newDisclosure = await createNewDisclosure(
          lobbyistId,
          reportingYear,
          principalName,
          principalAddress,
          principalPhoneNumber,
          lobbyistBusinessName,
          lobbyistBusinessAddress,
          lobbyistBusinessPhoneNumber,
          reconciledIssues
        );
        this.setState({ disclosureId: newDisclosure._id });
      } else if (mode === editDisclosureModes.editExisting) {
        const { disclosureId } = this.state;
        await modifyDisclosure(
          disclosureId,
          lobbyistId,
          reportingYear,
          principalName,
          principalAddress,
          principalPhoneNumber,
          lobbyistBusinessName,
          lobbyistBusinessAddress,
          lobbyistBusinessPhoneNumber,
          reconciledIssues
        );
      }
      this.setState({ submitRequestStatus: requestStates.succeeded });
    } catch (err) {
      this.setState({ submitRequestStatus: requestStates.failed });
    }
  }

  makeIssueRenderList() {
    const { updatedExistingIssues, newIssues } = this.state;
    const updatedExistingIssuesCopy = cloneDeep(updatedExistingIssues);
    const newIssuesCopy = cloneDeep(newIssues);
    sortExistingIssueUpdates(updatedExistingIssuesCopy);
    sortNewIssues(newIssuesCopy);
    return [...updatedExistingIssuesCopy, ...newIssuesCopy];
  }

  render() {
    const issueRenderList = this.makeIssueRenderList();
    const {
      mode,
      disclosureId,
      principalName,
      principalAddress,
      principalPhoneNumber,
      lobbyistBusinessName,
      lobbyistBusinessAddress,
      lobbyistBusinessPhoneNumber,
      reportingYear,
      submitRequestStatus,
      yearInfo,
      user,
      lobbyistName
    } = this.state;

    const yearOptions = user.isAdmin ? (yearInfo.allYears || { }) : (yearInfo.openYears || []);
    const issueOptions = getIssueOptions(issueRenderList);

    if (submitRequestStatus === requestStates.succeeded) {
      const viewURL = `/disclosure/view/${disclosureId}`;
      return <Redirect to={viewURL} />;
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              { mode !== editDisclosureModes.createNew
                && saveChangesPrompt(disclosureId, submitRequestStatus) }
              { mode === editDisclosureModes.createNew && saveNewPrompt(submitRequestStatus) }
              {
                mode === editDisclosureModes.editExisting && (
                  <div style={{ marginBottom: '.8rem' }}>
                    <label className="label">Lobbyist</label>
                    <span className="has-weight-bold is-size-4">
                      {lobbyistName}
                    </span>
                  </div>
                )
              }
              {textField('Principal Name', 'principalName', principalName, this.handleChange)}
              {textArea('Principal Address', 'principalAddress', principalAddress, this.handleChange)}
              {textField('Principal Phone Number', 'principalPhoneNumber', principalPhoneNumber, this.handleChange)}
              {textField('Your Business Name', 'lobbyistBusinessName', lobbyistBusinessName, this.handleChange)}
              {textArea('Your Business Address', 'lobbyistBusinessAddress', lobbyistBusinessAddress, this.handleChange)}
              {textField('Your Business Phone Number', 'lobbyistBusinessPhoneNumber', lobbyistBusinessPhoneNumber, this.handleChange)}
              <div className="field">
                <label className="label" htmlFor="reportingYear">Calendar Year of Lobbying</label>
                <select name="reportingYear" value={reportingYear} onChange={this.handleChange} className="select">
                  { yearOptions.map(year => <option key={year} value={year}>{year}</option>) }
                </select>
              </div>
              <label className="label" htmlFor="issues">Issues Represented</label>
              <IssuesEditList
                name="issues"
                issueRenderList={issueRenderList}
                renameIssue={this.renameIssue}
                deleteIssue={this.deleteIssue}
                resetIssue={this.resetIssue}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="columns is-multiline">
                { issueOptions.map(issue => (
                  <div className="column is-6" key={issue.issueId()}>
                    <ExpenseReportView
                      issueName={issue.name()}
                      issueId={issue.issueId()}
                      expenseReport={issue.expenseReport()}
                      setExpenseAmount={this.setExpenseAmount}
                      showPrincipalName
                      showYear
                      principalName={principalName}
                      year={reportingYear}
                    />
                  </div>
                )) }
              </div>
              { mode !== editDisclosureModes.createNew
                && saveChangesPrompt(disclosureId, submitRequestStatus) }
              { mode === editDisclosureModes.createNew && saveNewPrompt(submitRequestStatus) }
            </div>
          </div>
        </form>
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
  reportingYear: PropTypes.number
};
EditDisclosure.defaultProps = {
  match: null,
  lobbyistId: '',
  principalName: '',
  reportingYear: 2018
};
