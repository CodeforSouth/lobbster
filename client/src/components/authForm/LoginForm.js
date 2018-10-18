import React, { Component } from 'react';

import { emailField, passwordField } from './inputFields';
import authButton from './authButton';
import requestMonitor from './requestMonitor';

import { login } from '../../requests/authRequests';

// login request states
const initial = 1;
const submitted = 2;
const succeeded = 3;
const failed = 4;

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: '',
      password: '',
      loginRequestState: initial
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
    const { emailAddress, password } = this.state;
    try {
      this.setState({ loginRequestState: submitted });
      await login(emailAddress, password);
      this.setState({ loginRequestState: succeeded });
      await updateCurrentUser();
    } catch (err) {
      this.setState({ loginRequestState: failed });
    }
  }

  render() {
    const { emailAddress, password, loginRequestState } = this.state;
    const isLoginRequestPending = loginRequestState === submitted;
    const loginRequestFailed = loginRequestState === failed;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          { emailField(emailAddress, 'emailAddress', this.handleChange) }
          { passwordField(password, 'password', this.handleChange) }
          { authButton('Login', isLoginRequestPending) }
          { requestMonitor('Login Failed', loginRequestFailed) }
          <p className="has-text-grey" style={{ paddingTop: '0.8rem' }}>
            <a href="/">Forgot Password</a>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginForm;
