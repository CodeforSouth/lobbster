import 'bulma/css/bulma.css';
import 'bulma-tooltip/dist/css/bulma-tooltip.min.css';
import './App.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope,
  faLock,
  faExclamationTriangle,
  faPlus,
  faTrash,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

import { fetchUser, logout } from '../requests/authRequests';
import { isNonemptyObject } from '../utilities/utilities';

import Dashboard from './dashboard/Dashboard';
import Landing from './Landing';
import Navbar from './navigation/Navbar';
import UserAccountManagement from './userAccountManagement/UserAccountManagement';
import EditUserAccount from './userAccountManagement/EditUserAccount';
import { EditDisclosure, editDisclosureModes } from './disclosure/EditDisclosure';
import ReadOnlyDisclosure from './disclosure/ReadOnlyDisclosure';
import Explore from './explore/Explore';

library.add(faEnvelope);
library.add(faLock);
library.add(faExclamationTriangle);
library.add(faPlus);
library.add(faTrash);
library.add(faEdit);

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
          <Route
            path="/"
            render={props => (
              <div className="hero-head">
                <div className="container">
                  <Navbar
                    {...props}
                    endSession={this.endSession}
                    user={currentUser}
                    userIsAuthenticated={userIsAuthenticated}
                  />
                </div>
              </div>
            )}
          />
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
            path="/"
            exact
            render={() => (
              <div className="hero-foot">
                <nav className="tabs is-right">
                  <div className="container">
                    <ul>
                      <li><Link to="explore">Explore Our Data</Link></li>
                    </ul>
                  </div>
                </nav>
              </div>
            )}
          />
          <Route
            path="/explore"
            exact
            render={() => (
              <Explore
                selectedYear={2018}
                yearOptions={[2018, 2017]}
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
          <Route
            path="/disclosure/new"
            render={props => (
              <EditDisclosure
                {...props}
                lobbyistId={currentUser ? currentUser.id : ''}
                userIsAuthenticated={userIsAuthenticated}
                reportingYear={2018}
                yearOptions={[2018, 2017]}
                mode={editDisclosureModes.createNew}
              />
            )}
          />
          <Route
            path="/disclosure/edit/:disclosureId"
            render={props => (
              <EditDisclosure
                {...props}
                lobbyistId={currentUser ? currentUser.id : ''}
                userIsAuthenticated={userIsAuthenticated}
                mode={editDisclosureModes.editExisting}
              />
            )}
          />
          <Route
            path="/disclosure/view/:disclosureId"
            render={props => (
              <ReadOnlyDisclosure
                {...props}
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
