import 'bulma/css/bulma.css';
import './App.css';

import React, { Component } from 'react';

import { fetchUser, logout } from '../requests/authRequests';

import Dashboard from './dashboard/Dashboard';
import Landing from './Landing';
import Navbar from './navigation/Navbar';


function selectHero(user, updateCurrentUser) {
  if (user === null) {
    return <div>Loading</div>;
  } else if (Object.keys(user).length === 0) {
    return <Landing updateCurrentUser={updateCurrentUser} />;
  } else {
    return <Dashboard user={user} />;
  }
}

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

  render() {
    const { currentUser } = this.state;
    return (
      <section className="hero is-primary is-fullheight">
        <div className="hero-head">
          <Navbar endSession={this.endSession} user={currentUser} />
        </div>
        {selectHero(currentUser, this.updateCurrentUser)}
        <div className="hero-foot" />
      </section>
    );
  }
}

export default App;
