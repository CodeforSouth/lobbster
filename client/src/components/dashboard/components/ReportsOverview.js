import React, { Component } from 'react';
// import PropTypes from 'prop-types';

const headerYearSelecton = (selectedYear, yearOptions, handleChange) => (
  <h1 className="title is-2 has-text-black">
    Viewing reports for calendar year
    {' '}
    <select name="year" value={selectedYear} onChange={handleChange} className="select is-large">
      { yearOptions.map(year => <option key={year} value={year}>{year}</option>) }
    </select>
  </h1>
);

export default class ReportsOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: props.year
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
    const { year } = this.state;
    return (
      headerYearSelecton(year, [2018, 2017], this.handleChange)
    );
  }
}

ReportsOverview.propTypes = {
  year: Number
};
ReportsOverview.defaultProps = {
  year: 0
};
