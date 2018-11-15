import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DisclosuresOverview from '../components/DisclosuresOverview';
import { fetchPaymentsDocumentation } from '../../../requests/paymentDocumentation';
import {
  paymentMayBeRequired, actionNeeded, paid, nonProfitPending, nonProfitRejected, nonProfitApproved
} from './paymentStatus';

function selectedYearPaymentStatus(yearSelected, paymentsDocumentation) {
  for (let i = 0; i < paymentsDocumentation.length; i += 1) {
    const documentation = paymentsDocumentation[i];
    if (documentation.forYear === yearSelected) {
      return documentation.status;
    }
  }
  return ' ';
}

const paymentStatusToNotification = {};
paymentStatusToNotification[' '] = paymentMayBeRequired;
paymentStatusToNotification.action_needed = actionNeeded;
paymentStatusToNotification.paid = paid;
paymentStatusToNotification.exemption_requested = nonProfitPending;
paymentStatusToNotification.exemption_approved = nonProfitApproved;
paymentStatusToNotification.exemption_rejected = nonProfitRejected;

class LobbyistDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentsDocumentation: [],
      yearSelected: 0
    };
    this.setYearSelected = this.setYearSelected.bind(this);
  }

  async componentDidMount() {
    const { user } = this.props;
    const paymentsDocumentation = await fetchPaymentsDocumentation(user._id) || [];
    this.setState({ paymentsDocumentation });
  }

  setYearSelected(yearSelected) {
    this.setState({ yearSelected });
  }

  render() {
    const { paymentsDocumentation, yearSelected } = this.state;
    const { user } = this.props;
    const dashboardStyle = {
      minHeight: '50vh'
    };
    return (
      <div className="hero-body has-background-white">
        <div className="container has-text-left">
          <div className="column is-10 is-offset-1" style={dashboardStyle}>
            <div className="columns">
              <div className="column is-two-thirds">
                <DisclosuresOverview
                  lobbyistId={user.id}
                  includeLobbyistName={false}
                  linkToDisclosure
                  showAddButton
                  setYearSelected={this.setYearSelected}
                />
              </div>
              <div className="column is-one-third">
                { paymentStatusToNotification[
                  selectedYearPaymentStatus(yearSelected, paymentsDocumentation)
                ](yearSelected) }
              </div>
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
