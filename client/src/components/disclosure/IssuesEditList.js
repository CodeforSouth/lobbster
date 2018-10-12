import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ExistingIssueUpdate } from './ExistingIssueUpdate';
import { NewIssue } from './NewIssue';

import { ExistingIssueEditField } from './ExistingIssueEditField';
import NewIssueEditField from './NewIssueEditField';

export default class ListInput extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const {
      issueRenderList, renameIssue, deleteIssue, resetIssue
    } = this.props;
    return (
      <div>
        {
          issueRenderList.map((entry) => {
            if (entry instanceof ExistingIssueUpdate) {
              return (
                <ExistingIssueEditField
                  issueId={entry.issueId()}
                  isDelete={entry.isDelete()}
                  isRename={entry.isRename()}
                  pendingName={entry.pendingName()}
                  originalName={entry.originalName()}
                  key={entry.issueId()}
                  renameIssue={renameIssue}
                  deleteIssue={deleteIssue}
                  resetIssue={resetIssue}
                />
              );
            } else if (entry instanceof NewIssue) {
              return (
                <NewIssueEditField
                  sortIndex={entry.sortIndex()}
                  renameIssue={renameIssue}
                  issueName={entry.name()}
                  key={entry.sortIndex()}
                />
              );
            } else {
              return <div>Error</div>;
            }
          })
        }
      </div>
    );
  }
}

ListInput.propTypes = {
  issueRenderList: PropTypes.arrayOf(PropTypes.object).isRequired,
  renameIssue: PropTypes.func.isRequired,
  deleteIssue: PropTypes.func.isRequired,
  resetIssue: PropTypes.func.isRequired
};
