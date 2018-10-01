import 'bulma/css/bulma.css';
import './App.css';

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { fetchUser, logout } from '../requests/authRequests';
import { isNonemptyObject } from '../utilities/utilities';

import Dashboard from './dashboard/Dashboard';
import Landing from './Landing';
import Navbar from './navigation/Navbar';
import UserAccountManagement from './userAccountManagement/UserAccountManagement';
import EditUserAccount from './userAccountManagement/EditUserAccount';

library.add(faEnvelope);
library.add(faLock);
library.add(faExclamationTriangle);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };

    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.endSession = this.endSession.bind(this);
  }

  componentDidMount() {
    this.updateCurrentUser();
  }

  async updateCurrentUser() {
    const user = await fetchUser();
    this.setState({
      currentUser: user
    });
  }

  async endSession() {
    await logout();
    await this.updateCurrentUser();
  }

  userIsAuthenticated() {
    const { currentUser } = this.state;
    return isNonemptyObject(currentUser);
  }

  render() {
    const { currentUser } = this.state;
    const userIsAuthenticated = this.userIsAuthenticated();
    return (
      <BrowserRouter>
        <section className="hero has-background-white is-fullheight">
          <div className="hero-head">
            <Route
              path="/"
              render={props => (
                <Navbar
                  {...props}
                  endSession={this.endSession}
                  user={currentUser}
                  userIsAuthenticated={userIsAuthenticated}
                />
              )}
            />
          </div>
          <Route
            path="/"
            exact
            render={props => (
              <Landing
                {...props}
                updateCurrentUser={this.updateCurrentUser}
                userIsAuthenticated={userIsAuthenticated}
              />
            )}
          />
          <Route
            path="/dashboard"
            exact
            render={props => (
              <Dashboard
                {...props}
                user={currentUser}
                userIsAuthenticated={userIsAuthenticated}
              />
            )}
          />
          <Route
            path="/user-account-management"
            exact
            render={props => (
              <UserAccountManagement
                {...props}
                user={currentUser}
                userIsAuthenticated={userIsAuthenticated}
              />
            )}
          />
          <Route
            path="/edit-user-account/:emailAddress"
            render={props => (
              <EditUserAccount
                {...props}
                user={currentUser}
                userIsAuthenticated={userIsAuthenticated}
              />
            )}
          />
          <div className="hero-foot" />
        </section>
      </BrowserRouter>
    );
  }
}

export default App;
