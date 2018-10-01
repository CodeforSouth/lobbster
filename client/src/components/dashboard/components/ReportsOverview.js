import React, { Component } from 'react';
import PropTypes from 'prop-types';

const headerYearSelecton = (selectedYear, yearOptions, handleChange) => (
  <h1 className="title is-2 has-text-black">
    Viewing reports for calendar year
    {' '}
    <select name="selectedYear" value={selectedYear} onChange={handleChange} className="select is-large">
      { yearOptions.map(year => <option key={year} value={year}>{year}</option>) }
    </select>
  </h1>
);

export default class ReportsOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedYear: props.selectedYear,
      yearOptions: props.yearOptions
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    let newValue = target.value;

    // Convert string values that should be booleans.
    const booleanTargets = new Set(['emailVerified', 'isAdmin']);
    if (booleanTargets.has(target.name)) {
      newValue = newValue === 'true';
    }

    this.setState({
      [target.name]: newValue
    });
  }

  render() {
    const { selectedYear, yearOptions } = this.state;
    return (
      headerYearSelecton(selectedYear, yearOptions, this.handleChange)
    );
  }
}

ReportsOverview.propTypes = {
  selectedYear: Number,
  yearOptions: PropTypes.arrayOf(Number)
};
ReportsOverview.defaultProps = {
  selectedYear: 0,
  yearOptions: [0]
};
