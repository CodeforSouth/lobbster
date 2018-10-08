import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ExistingIssueEditField } from './ExistingIssueEditField';
import NewIssueEditField from './NewIssueEditField';

export default class ListInput extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { existingIssuesChanges, newIssues, reRender } = this.props;
    if (newIssues.length === 0 || newIssues[newIssues.length - 1].name !== '') {
      newIssues.push({
        name: '',
        expenses: []
      });
    }
    return (
      <div>
        {
          existingIssuesChanges.map(
            (change, index) => (
              <ExistingIssueEditField
                issueChange={change}
                listIndex={index}
                key={change.issue().name}
                reRender={reRender}
              />
            )
          )
        }
        {
          newIssues.map(
            (issue, index) => (
              <NewIssueEditField
                issue={issue}
                listIndex={index}
                key={index}
                reRender={reRender}
              />
            )
          )
        }
      </div>
    );
  }
}

ListInput.propTypes = {
  existingIssuesChanges: PropTypes.arrayOf(PropTypes.object),
  newIssues: PropTypes.arrayOf(PropTypes.object),
  reRender: PropTypes.func.isRequired
};
ListInput.defaultProps = {
  existingIssuesChanges: [],
  newIssues: []
};
