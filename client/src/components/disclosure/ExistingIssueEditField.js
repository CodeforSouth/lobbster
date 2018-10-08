import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const fieldStates = {
  default: 1,
  deleting: 2,
  renaming: 3
};

const selectedButtonStyle = {
  backgroundColor: 'whitesmoke',
  borderColor: '#dbdbdb',
  color: '#7a7a7a'
};

export class ExistingIssueEditField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldState: fieldStates.default
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectDefault = this.selectDefault.bind(this);
    this.selectDeleting = this.selectDeleting.bind(this);
    this.selectRenaming = this.selectRenaming.bind(this);
  }

  handleChange({ target }) {
    const { issueChange, reRender } = this.props;
    if (target.name === 'updatedValue') {
      issueChange.setToRename(target.value);
      reRender();
    }
  }

  fieldIdentifier() {
    const { issueChange } = this.props;
    return `issue_${issueChange.issue().name}`;
  }

  renameMessage() {
    const { issueChange } = this.props;
    const valueBefore = issueChange.issue().name;
    const updatedValue = issueChange.newName();
    if (valueBefore === updatedValue) {
      return '';
    } else {
      return (
        <p>
          Renaming
          {' '}
          <em>{valueBefore}</em>
          {' '}
          to
          {' '}
          <em>{updatedValue}</em>
          .
        </p>
      );
    }
  }

  deleteMessage() {
    const { issueChange } = this.props;
    const style = {
      marginLeft: '.6em',
      marginTop: '1.11em',
      marginBottom: '1.11em'
    };
    return (
      <div style={style}>
        Deleting
        {' '}
        <em>{issueChange.issue().name}</em>
        .
      </div>
    );
  }

  selectDefault() {
    const { issueChange } = this.props;
    issueChange.setToNoChange();
    this.setState({ fieldState: fieldStates.default });
  }

  selectDeleting() {
    const { issueChange } = this.props;
    issueChange.setToDelete();
    this.setState({ fieldState: fieldStates.deleting });
  }

  selectRenaming() {
    const { issueChange } = this.props;
    issueChange.setToRename(issueChange.issue().name);
    this.setState({ fieldState: fieldStates.renaming });
  }

  deleteButton() {
    return (
      <div to="/" className="button tooltip" data-tooltip="Delete Issue" onClick={this.selectDeleting}>
        <span className="icon">
          <FontAwesomeIcon icon="trash" />
        </span>
      </div>
    );
  }

  renameButton(selected = false) {
    const onClickMethod = selected ? this.selectDefault : this.selectRenaming;
    const style = selected ? selectedButtonStyle : { };
    const tooltip = selected ? 'Cancel Rename' : 'Rename Issue';
    return (
      <div className="button tooltip" data-tooltip={tooltip} onClick={onClickMethod} style={style}>
        <span className="icon">
          <FontAwesomeIcon icon="edit" />
        </span>
      </div>
    );
  }

  renderDefault() {
    const { issueChange } = this.props;
    const value = issueChange.newName() || issueChange.issue().name;
    return (
      <div className="field is-grouped">
        <div className="control">
          <input
            className="input"
            type="text"
            readOnly
            style={{ border: 'none', background: 'transparent' }}
            id={this.fieldIdentifier()}
            name="updatedValue"
            value={value}
          />
        </div>
        { this.renameButton() }
        { this.deleteButton() }
      </div>
    );
  }

  renderRename() {
    const { issueChange } = this.props;
    const style = {
      marginTop: '.7em',
      marginBottom: '.7em'
    };
    return (
      <div>
        { this.renameMessage() }
        <div className="field is-grouped" style={style}>
          <div className="control">
            <input
              className="input"
              type="text"
              id={this.fieldIdentifier()}
              name="updatedValue"
              value={issueChange.newName()}
              onChange={this.handleChange}
            />
          </div>
          { this.renameButton(true) }
          { this.deleteButton() }
        </div>
      </div>
    );
  }

  renderDelete() {
    return this.deleteMessage();
  }

  render() {
    const { fieldState } = this.state;
    switch (fieldState) {
      case fieldStates.deleting:
        return this.renderDelete();
      case fieldStates.renaming:
        return this.renderRename();
      default:
        return this.renderDefault();
    }
  }
}

ExistingIssueEditField.propTypes = {
  issueChange: PropTypes.object.isRequired,
  reRender: PropTypes.func.isRequired
};
