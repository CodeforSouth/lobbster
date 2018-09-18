import React, { Component } from 'react';

import authButton from './authButton';
import requestMonitor from './requestMonitor';

import { registerUser, login } from '../../requests/authRequests';

// signup request states
const initial = 1;
const submitted = 2;
const succeeded = 3;
const failed = 4;

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      signupRequestState: initial
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { updateCurrentUser } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password
    } = this.state;
    try {
      this.setState({ signupRequestState: submitted });
      await registerUser(firstName, lastName, emailAddress, password);
      await login(emailAddress, password);
      await updateCurrentUser();
      this.setState({ signupRequestState: succeeded });
    } catch (err) {
      this.setState({ signupRequestState: failed });
    }
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      signupRequestState
    } = this.state;
    const isSignupRequestPending = signupRequestState === submitted;
    const signupRequestFailed = signupRequestState === failed;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control">
              <input required className="input" type="text" placeholder="First Name" name="firstName" value={firstName} onChange={this.handleChange} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input required className="input" type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={this.handleChange} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input required className="input" type="email" placeholder="Email" name="emailAddress" value={emailAddress} onChange={this.handleChange} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input required className="input" type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
            </div>
          </div>
          { authButton('Register', isSignupRequestPending) }
          { requestMonitor('Registration Failed', signupRequestFailed) }
        </form>
      </div>
    );
  }
}

export default SignUpForm;
