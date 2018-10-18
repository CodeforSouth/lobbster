import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noticeBar, verifyEmailNotice, paymentNotice } from '../components/noticeBar';
import DisclosuresOverview from '../components/DisclosuresOverview';
import { fetchPaymentsDocumentation } from '../../../requests/paymentDocumentation';

function paymentNeedsAttention(paymentsDocumentation) {
  const unsettledStatus = ['action_needed', 'exemption_rejected'];
  for (let i = 0; i < paymentsDocumentation.length; i += 1) {
    const documentation = paymentsDocumentation[i];
    if (unsettledStatus.indexOf(documentation.status) !== -1) {
      return true;
    }
  }
  return false;
}

class LobbyistDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentsDocumentation: []
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    const paymentsDocumentation = await fetchPaymentsDocumentation(user._id) || [];
    this.setState({ paymentsDocumentation });
  }

  render() {
    const { paymentsDocumentation } = this.state;
    const { user } = this.props;
    const notices = [];
    if (!user.emailVerified) {
      notices.push(verifyEmailNotice(1));
    }
    if (paymentNeedsAttention(paymentsDocumentation)) {
      notices.push(paymentNotice(2));
    }
    return (
      <div className="hero-body has-background-white">
        <div className="container has-text-left">
          <div className="column is-10 is-offset-1">
            <div className="container">
              { !user.emailVerified && noticeBar(notices) }
            </div>
            <div className="container">
              <DisclosuresOverview
                lobbyistId={user.id}
                includeLobbyistName={false}
                linkToDisclosure
                showAddButton
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LobbyistDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default LobbyistDashboard;
