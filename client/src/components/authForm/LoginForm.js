import React, { Component } from 'react';

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
      await updateCurrentUser();
      this.setState({ loginRequestState: succeeded });
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
          { authButton('Login', isLoginRequestPending) }
          { requestMonitor('Login Failed', loginRequestFailed) }
          <p className="has-text-grey">
            <a href="/">Forgot Password</a>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginForm;
