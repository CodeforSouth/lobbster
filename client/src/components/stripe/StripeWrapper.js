import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';

class StripeWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { forYear, handleToken } = this.props;
    return (
      <StripeCheckout
        name="Lobbster"
        description={`Year ${forYear} Lobbyist registration fee.`}
        amount={25000}
        token={token => handleToken(token, forYear)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button type="button" className="button">
          Submit Payment
        </button>
      </StripeCheckout>
    );
  }
}

StripeWrapper.propTypes = {
  forYear: PropTypes.number.isRequired,
  handleToken: PropTypes.func.isRequired
};

export default StripeWrapper;
