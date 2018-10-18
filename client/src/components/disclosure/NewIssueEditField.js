import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewIssueEditField extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { sortIndex, renameIssue } = this.props;
    if (target.name === 'newIssue') {
      renameIssue(sortIndex, target.value);
    }
  }

  addMessage() {
    const { issueName } = this.props;
    if (issueName.name) {
      return <div>New Issue</div>;
    } else {
      return <div />;
    }
  }

  render() {
    const { issueName } = this.props;
    const style = {
      marginTop: '.7em',
      marginBottom: '.7em'
    };
    return (
      <div className="field is-grouped" style={style}>
        <div className="control">
          <textarea
            className="textarea"
            type="text"
            name="newIssue"
            placeholder="+ New Issue"
            value={issueName}
            onChange={this.handleChange}
          />
        </div>
        { this.addMessage() }
      </div>
    );
  }
}

NewIssueEditField.propTypes = {
  sortIndex: PropTypes.string.isRequired,
  issueName: PropTypes.string.isRequired,
  renameIssue: PropTypes.func.isRequired
};
