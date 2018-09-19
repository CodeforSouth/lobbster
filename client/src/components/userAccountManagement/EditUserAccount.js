import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getAccountDetails, modifyAccountDetails } from '../../requests/userManagement';
import { requestStates, submitButton } from '../uiElements/submitButton';


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

const booleanDropdown = (fieldLabel, fieldName, booleanValue, handleChange) => {
  const textColor = booleanValue ? 'has-text-success' : 'has-text-danger';
  return (
    <div className="field">
      <label className="label">{fieldLabel}</label>
      {booleanValue !== null && (
        <div className="control">
          <div className="select" id={fieldName}>
            <select
              className={textColor}
              name={fieldName}
              value={booleanValue}
              onChange={handleChange}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

const accountTypeDropdown = (isAdmin, handleChange) => {
  const fieldName = 'isAdmin';
  return (
    <div className="field">
      <label className="label">Account Type</label>
      {isAdmin !== null && (
        <div className="control">
          <div className="select" id={fieldName}>
            <select name={fieldName} value={isAdmin} onChange={handleChange}>
              <option value="true">Administrator</option>
              <option value="false">Lobbyist</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// TODO: Identity verification should provide a verified on date that links to a
// verification record, or a link to create a new verification. For now, it is just
// providing a drop-down.)

class EditUserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: null,
      emailAddress: null,
      firstName: null,
      lastName: null,
      identityVerified: null,
      emailVerified: null,
      isAdmin: null,
      submitRequestStatus: requestStates.initial
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { emailAddress } = match.params;
    try {
      const userToEdit = await getAccountDetails(emailAddress) || { };
      this.setState({ ...userToEdit });
    } catch (err) {
      console.log('Error getting account info.');
    }
  }

  handleChange({ target }) {
    let newValue = target.value;

    // Convert string values that should be booleans.
    const booleanTargets = new Set(['emailVerified', 'identityVerified', 'isAdmin']);
    if (booleanTargets.has(target.name)) {
      newValue = newValue === 'true';
    }

    this.setState({
      [target.name]: newValue
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {
      _id,
      firstName,
      lastName,
      emailAddress,
      identityVerified,
      emailVerified,
      isAdmin
    } = this.state;
    try {
      this.setState({ submitRequestStatus: requestStates.submitted });
      await modifyAccountDetails(
        _id,
        firstName,
        lastName,
        emailAddress,
        identityVerified,
        emailVerified,
        isAdmin
      );
      this.setState({ submitRequestStatus: requestStates.succeeded });
    } catch (err) {
      this.setState({ submitRequestStatus: requestStates.failed });
    }
  }

  render() {
    const {
      emailAddress,
      firstName,
      lastName,
      identityVerified,
      emailVerified,
      isAdmin,
      submitRequestStatus
    } = this.state;
    return (
      <div className="hero-body has-background-white-ter">
        <section>
          <form onSubmit={this.handleSubmit}>
            {textFeild('Email Address', 'emailAddress', emailAddress, this.handleChange)}
            {textFeild('First Name', 'firstName', firstName, this.handleChange)}
            {textFeild('Last Name', 'lastName', lastName, this.handleChange)}
            {booleanDropdown('Identity Verified', 'identityVerified', identityVerified, this.handleChange)}
            {booleanDropdown('Email Address Verified', 'emailVerified', emailVerified, this.handleChange)}
            {accountTypeDropdown(isAdmin, this.handleChange)}
            <div className="field is-grouped">
              {submitButton('Save', submitRequestStatus, this.handleSubmit)}
              <div className="control">
                <button type="button" className="button is-light">Cancel</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

EditUserAccount.propTypes = {
  match: PropTypes.object
};
EditUserAccount.defaultProps = {
  match: null
};

export default EditUserAccount;
