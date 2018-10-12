import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { cloneDeep } from 'lodash';

import { ExistingIssueUpdate, sortExistingIssueUpdates } from './ExistingIssueUpdate';
import { NewIssue, sortNewIssues } from './NewIssue';

import { createNewDisclosure, fetchDisclosure, modifyDisclosure } from '../../requests/disclosures';

import { requestStates, submitButton } from '../uiElements/submitButton';
import textField from '../uiElements/textField';
import IssuesEditList from './IssuesEditList';
import ExpenseReportView from './ExpenseReportView';

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

function reconcileIssues(issueUpdates, newIssues) {
  // Remove deleted and blank issues.
  const updatedIssues = issueUpdates.filter(update => !update.isDelete());
  const processedNewIssues = newIssues.filter(issue => !issue.isBlank());
  console.log(newIssues);
  console.log(processedNewIssues);

  // Convert issues and their internal records into objects ready for MongoDB.
  const reconciledIssues = cloneDeep([...updatedIssues, ...processedNewIssues])
    .map(issue => issue.makeMongoIssue());
  console.log(reconciledIssues);

  return reconciledIssues;
}

function getIssueOptions(issuesList) {
  return cloneDeep(issuesList)
    .filter(issue => issue.isBlank ? !issue.isBlank() : true)
    .filter(issue => issue.isDelete ? !issue.isDelete() : true);
}

function disclosureState(
  mode = editDisclosureModes.createNew,
  principalName = '',
  reportingYear = 0,
  existingIssues = [],
  newIssues = [],
  feeWaver = feeWaverValues.notRequested,
  disclosureId = '',
  submitRequestStatus = requestStates.initial
) {
  const updatedExistingIssues = existingIssues.map(issue => new ExistingIssueUpdate(issue));

  return {
    mode,
    principalName,
    reportingYear,
    updatedExistingIssues,
    newIssues,
    feeWaver,
    disclosureId,
    submitRequestStatus
  };
}

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

    this.resetIssue = this.resetIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.renameIssue = this.renameIssue.bind(this);

    this.setExpenseAmount = this.setExpenseAmount.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { mode } = this.state;
    if (mode === editDisclosureModes.editExisting) {
      const { match } = this.props;
      const { disclosureId } = match.params;
      try {
        const disclosure = await fetchDisclosure(disclosureId) || { };
        const newIssues = [new NewIssue()];
        const updatedState = disclosureState(
          mode,
          disclosure.principalName,
          disclosure.reportingYear,
          disclosure.issues,
          newIssues,
          disclosure.feeWaver,
          disclosure.id
        );
        this.setState(updatedState);
      } catch (err) {
        console.log('Error getting disclosure info.');
      }
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

    const { updatedExistingIssues, newIssues, expenses } = this.state;
    const reconciledIssues = reconcileIssues(updatedExistingIssues, newIssues, expenses);

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
      principalName,
      reportingYear,
      // feeWaver,
      submitRequestStatus
    } = this.state;
    const { yearOptions } = this.props;
    const issueOptions = getIssueOptions(issueRenderList);
    return (
      <div className="hero-body">
        <section>
          // TODO: add header with lobbyist name
          <form onSubmit={this.handleSubmit}>
            {textField('Principal Name', 'principalName', principalName, this.handleChange)}
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
            { issueOptions.map(issue => (
              <ExpenseReportView
                issueName={issue.name()}
                issueId={issue.issueId()}
                key={issue.issueId()}
                expenseReport={issue.expenseReport()}
                setExpenseAmount={this.setExpenseAmount}
                showPrincipalName
                showYear
                principalName={principalName}
                year={reportingYear}
              />
            )) }
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
