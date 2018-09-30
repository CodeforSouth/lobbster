import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const loginTab = 1;
const signUpTab = 2;

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleTab: loginTab
    };

    this.switchTabs = this.switchTabs.bind(this);
  }

  tabClasses(tab) {
    const { visibleTab } = this.state;
    const tabIsVisible = visibleTab === tab;
    return tabIsVisible ? 'is-active' : '';
  }

  contentStyle(tab) {
    const { visibleTab } = this.state;
    const contentIsVisible = visibleTab === tab;
    const display = contentIsVisible ? 'block' : 'none';
    return { display };
  }

  switchTabs() {
    const { visibleTab } = this.state;
    const toTab = visibleTab === signUpTab ? loginTab : signUpTab;
    this.setState({ visibleTab: toTab });
  }

  render() {
    const { updateCurrentUser } = this.props;
    return (
      <div>
        <div className="tabs is-boxed is-fullwidth" style={{ marginBottom: 0 }}>
          <ul>
            <li id="login_tab" className={this.tabClasses(loginTab)} onClick={this.switchTabs}>
              <a>
                <span>Login</span>
              </a>
            </li>
            <li id="sign_up_tab" className={this.tabClasses(signUpTab)} onClick={this.switchTabs}>
              <a>
                <span>Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
        <div id="auth-tab-content" className="">
          <div className="box" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, minHeight: '15rem', marginLeft: 1, marginRight: 1 }}>
            <div id="login_tab_content" style={this.contentStyle(loginTab)}>
              <LoginForm updateCurrentUser={updateCurrentUser} />
            </div>
            <div id="sign_up_tab_content" style={this.contentStyle(signUpTab)}>
              <SignUpForm updateCurrentUser={updateCurrentUser} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AuthForm.propTypes = {
  updateCurrentUser: PropTypes.func.isRequired
};

export default AuthForm;
