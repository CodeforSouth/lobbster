import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewIssueEditField extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { issue, reRender } = this.props;
    if (target.name === 'newIssue') {
      issue.name = target.value;
      reRender();
    }
  }

  addMessage() {
    const { issue } = this.props;
    if (issue.name) {
      return <div>New Issue</div>;
    } else {
      return <div />;
    }
  }

  render() {
    const { issue } = this.props;
    const style = {
      marginTop: '.7em',
      marginBottom: '.7em'
    };
    return (
      <div>
        <div className="field is-grouped" style={style}>
          <div className="control">
            <input
              className="input"
              type="text"
              name="newIssue"
              placeholder="New Issue"
              value={issue.name}
              onChange={this.handleChange}
            />
          </div>
          { this.addMessage() }
        </div>
      </div>
    );
  }
}

NewIssueEditField.propTypes = {
  issue: PropTypes.object.isRequired,
  reRender: PropTypes.func.isRequired
};
