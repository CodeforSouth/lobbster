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

  fieldIdentifier() {
    const { issueId } = this.props;
    return issueId;
  }

  renameMessage() {
    const { isRename, pendingName, originalName } = this.props;
    if (isRename) {
      return (
        <p>
          Renaming
          {' '}
          <em>{originalName}</em>
          {' '}
          to
          {' '}
          <em>{pendingName}</em>
          .
        </p>
      );
    } else {
      return '';
    }
  }

  deleteMessage() {
    const { isDelete, originalName } = this.props;
    const style = {
      marginLeft: '.6em',
      marginTop: '1.11em',
      marginBottom: '1.11em'
    };
    if (isDelete) {
      return (
        <div style={style}>
          Deleting
          {' '}
          <em>{originalName}</em>
          .
        </div>
      );
    } else {
      return '';
    }
  }

  handleChange({ target }) {
    const { issueId, renameIssue } = this.props;
    if (target.name === 'updatedValue') {
      renameIssue(issueId, target.value);
    }
  }

  selectDefault() {
    const { issueId, resetIssue } = this.props;
    resetIssue(issueId);
    this.setState({ fieldState: fieldStates.default });
  }

  selectDeleting() {
    const { issueId, deleteIssue } = this.props;
    deleteIssue(issueId);
    this.setState({ fieldState: fieldStates.deleting });
  }

  selectRenaming() {
    this.setState({ fieldState: fieldStates.renaming });
  }

  deleteButton(selected = false) {
    const onClickMethod = selected ? this.selectDefault : this.selectDeleting;
    const style = selected ? selectedButtonStyle : { };
    const tooltip = selected ? 'Cancel Delete' : 'Delete Issue';
    return (
      <div to="/" className="button tooltip" data-tooltip={tooltip} onClick={onClickMethod} style={style}>
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
    const { pendingName } = this.props;
    return (
      <div className="field is-grouped">
        <div className="control">
          <textarea
            className="textarea"
            type="text"
            readOnly
            style={{ border: 'none', background: 'transparent' }}
            id={this.fieldIdentifier()}
            name="updatedValue"
            value={pendingName}
          />
        </div>
        { this.renameButton() }
        { this.deleteButton() }
      </div>
    );
  }

  renderRename() {
    const { pendingName } = this.props;
    const style = {
      marginTop: '.7em',
      marginBottom: '.7em'
    };
    return (
      <div>
        { this.renameMessage() }
        <div className="field is-grouped" style={style}>
          <div className="control">
            <textarea
              className="textarea"
              type="text"
              id={this.fieldIdentifier()}
              name="updatedValue"
              value={pendingName}
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
    return (
      <div>
        { this.deleteMessage() }
        { this.renameButton(false) }
        { this.deleteButton(true) }
      </div>
    );
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
  issueId: PropTypes.string.isRequired,
  isDelete: PropTypes.bool.isRequired,
  isRename: PropTypes.bool.isRequired,
  pendingName: PropTypes.string.isRequired,
  originalName: PropTypes.string.isRequired,
  renameIssue: PropTypes.func.isRequired,
  deleteIssue: PropTypes.func.isRequired,
  resetIssue: PropTypes.func.isRequired
};
