import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DisclosuresOverview from '../dashboard/components/DisclosuresOverview';

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const {
      selectedYear, yearOptions
    } = this.props;
    return (
      <div className="container has-text-left">
        <div className="column is-10 is-offset-1">
          <DisclosuresOverview
            selectedYear={selectedYear}
            yearOptions={yearOptions}
            includeLobbyistName
            linkToDisclosure={false}
            lobbyistId=""
          />
        </div>
      </div>
    );
  }
}

Explore.propTypes = {
  selectedYear: PropTypes.number.isRequired, // note: selectedYear must be a value in yearOptions
  yearOptions: PropTypes.arrayOf(PropTypes.number).isRequired
};
Explore.defaultProps = { };
