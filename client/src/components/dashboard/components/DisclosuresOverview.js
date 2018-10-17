import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import discloseNewPrincipalButton from '../components/discloseNewPrincipalButton';

import { fetchDisclosures } from '../../../requests/disclosures';
import { fetchYears } from '../../../requests/paymentDocumentation';

function formatCurrency(amount) {
  // Compute spaces between dollar sign and amount.
  const space = '\u00A0';
  let spaces = space;
  let digits = 0;
  let amountCopy = amount;
  // A do-while loop is used to handle the amount === 0 case correctly.
  do {
    amountCopy = Math.floor(amountCopy / 10);
    digits += 1;
  } while (amountCopy);
  const padding = 7 - digits;
  for (let i = 0; i < padding; i += 1) {
    spaces += space;
  }

  // Build the string.
  return `$${spaces}${amount.toFixed(2)}`;
}

function filterSortDisclosures(disclosures, filterToYear = null) {
  let filteredSorted = disclosures;
  if (filterToYear !== null) {
    filteredSorted = filteredSorted.filter(disclosure => disclosure.reportingYear === filterToYear);
  }
  return filteredSorted;
}

const headerYearSelecton = (selectedYear, yearOptions, handleChange) => (
  <h6 className="title is-6">
    Calendar Year:
    {' '}
    <select name="selectedYear" value={selectedYear} onChange={handleChange} className="select">
      { yearOptions.map(year => <option key={year} value={year}>{year}</option>) }
    </select>
  </h6>
);

const disclosureTableHeading = includeLobbyistName => (
  <thead>
    <tr key="head">
      { includeLobbyistName && <th>Lobbyist</th>}
      <th>Principal</th>
      <th>Issue</th>
      <th>Reported Expense Total</th>
    </tr>
  </thead>
);

const disclosureRow = (
  key, disclosureId, principalName, issueName, issueTotalExpenses,
  showBottomBorder, showPrincipal, linkToDisclosure, includeLobbyistName, lobbyistName
) => {
  const tdTextStyle = { };
  const tdCurrencyStyle = {
    textAlign: 'right',
    fontFamily: 'monospace'
  };
  if (!showBottomBorder) {
    tdTextStyle.borderBottom = 'none';
    tdCurrencyStyle.borderBottom = 'none';
  }

  const lobbyistTd = (
    <td style={tdTextStyle}>
      {  showPrincipal && lobbyistName }
    </td>
  );

  let principalTd;
  if (showPrincipal) {
    if (linkToDisclosure) {
      principalTd = (
        <td className="has-text-link" style={tdTextStyle}>
          <Link to={`/disclosure/view/${disclosureId}`}>
            { principalName }
          </Link>
        </td>
      );
    } else {
      principalTd = (
        <td style={tdTextStyle}>
          { principalName }
        </td>
      );
    }
  } else {
    principalTd = (
      <td style={tdTextStyle} />
    );
  }

  return (
    <tr key={key}>
      { includeLobbyistName && lobbyistTd }
      { principalTd }
      <td style={tdTextStyle}>
        { issueName }
      </td>
      <td style={tdCurrencyStyle}>
        { formatCurrency(issueTotalExpenses) }
      </td>
    </tr>
  );
};

const disclosureTableBlock = (disclosure, includeLobbyistName, linkToDisclosure) => {
  const { issues, principalName, id, lobbyistId: lobbyist } = disclosure;
  const lobbyistName = lobbyist ? lobbyist.fullName : '';
  const rowCount = issues.length;
  const rows = [];
  if (rowCount === 0) {
    // Placeholder row for when the principal is reported, but without any issues (or expenses).
    const rowKey = `${id}`;
    const issueName = '-';
    const issueTotalExpenses = 0;
    const showBottomBorder = true;
    const showPrincipal = true;
    rows.push(disclosureRow(
      rowKey,
      id,
      principalName,
      issueName,
      issueTotalExpenses,
      showBottomBorder,
      showPrincipal,
      linkToDisclosure,
      includeLobbyistName,
      lobbyistName
    ));
  } else {
    for (let row = 0; row < rowCount; row += 1) {
      const rowKey = `${id}_${row}`;
      const { name: issueName, totalExpenses: issueTotalExpenses } = issues[row];
      const showBottomBorder = row === rowCount - 1; // show border in the block's last row
      const showPrincipal = row === 0; // show principal in the block's first row
      rows.push(disclosureRow(
        rowKey,
        id,
        principalName,
        issueName,
        issueTotalExpenses,
        showBottomBorder,
        showPrincipal,
        linkToDisclosure,
        includeLobbyistName,
        lobbyistName
      ));
    }
  }
  return rows;
};

const disclosureTable = (disclosures, selectedYear, includeLobbyistName, linkToDisclosure) => {
  const disclosuresPrime = filterSortDisclosures(disclosures, selectedYear);
  return (
    <table className="table">
      { disclosureTableHeading(includeLobbyistName) }
      <tbody>
        { disclosuresPrime.map(
          disclosure => disclosureTableBlock(disclosure, includeLobbyistName, linkToDisclosure)
        ) }
      </tbody>
    </table>
  );
};

export default class DisclosuresOverview extends Component {
  constructor(props) {
    super(props);
    const { lobbyistId } = this.props;
    this.state = {
      lobbyistId,
      selectedYear: undefined,
      disclosures: [],
      yearInfo: { }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const { lobbyistId } = this.state;
    try {
      const disclosures = await fetchDisclosures(lobbyistId) || { };
      const yearInfo = await fetchYears() || { };
      this.setState({ disclosures, yearInfo, selectedYear: yearInfo.currentYear });
    } catch (err) {
      console.log('Error getting account info.');
    }
  }

  handleChange({ target }) {
    let newValue = target.value;

    if (target.name === 'selectedYear') {
      newValue = parseInt(newValue, 10);
    }

    this.setState({
      [target.name]: newValue
    });
  }

  render() {
    const { includeLobbyistName, linkToDisclosure, showAddButton } = this.props;
    const { disclosures, yearInfo, selectedYear } = this.state;
    const yearOptions = yearInfo.allYears || [];
    const openYears = yearInfo.openYears || [];
    const selectedYearIsOpen = openYears.indexOf(selectedYear) !== -1;
    return (
      <div>
        { headerYearSelecton(selectedYear, yearOptions, this.handleChange) }
        { disclosureTable(
          disclosures, selectedYear, includeLobbyistName, linkToDisclosure
        ) }
        { showAddButton && selectedYearIsOpen && (
          <div className="container">
            { discloseNewPrincipalButton() }
          </div>
        )}
      </div>
    );
  }
}

DisclosuresOverview.propTypes = {
  lobbyistId: PropTypes.string,
  includeLobbyistName: PropTypes.bool.isRequired,
  linkToDisclosure: PropTypes.bool
};
DisclosuresOverview.defaultProps = {
  lobbyistId: '',
  linkToDisclosure: false
};
