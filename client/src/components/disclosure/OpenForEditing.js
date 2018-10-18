import React from 'react';
import { Link } from 'react-router-dom';

const levelStyle = {
  padding: '2rem',
  borderRadius: '0.3rem',
  borderWidth: '1px',
  borderColor: 'black'
};

const editButton = (disclosureId) => {
  const editPath = `/disclosure/edit/${disclosureId}`;
  return (
    <Link to={editPath}>
      <button type="button" className="button is-primary">
        Open For Editing
      </button>
    </Link>
  );
};

const versionWithEditButton = (disclosureId, message) => (
  <nav className="level" style={levelStyle}>
    <div className="level-left has-text-centered">
      { message }
    </div>
    <div className="level-right has-text-centered">
      { editButton(disclosureId) }
    </div>
  </nav>
);

const versionSansButton = message => (
  <nav className="level" style={levelStyle}>
    <div className="level-item has-text-centered">
      { message }
    </div>
  </nav>
);

const editingClosedVersion = reportingYear => versionSansButton(`Reporting is closed for ${reportingYear}.`);

const yearIsOpenDisclaimer = (reportingYear) => {
  const message = `This disclosure may change until October 1, ${reportingYear + 1}.`;
  return versionSansButton(message);
};

const OpenForEditing = (
  disclosureId, reportingYear, reportingYearIsOpen, userIsAdmin, disclosureIsUsers
) => {
  if (userIsAdmin) {
    return versionWithEditButton(disclosureId, 'As an admin, you may edit this disclosure.');
  } else if (disclosureIsUsers) {
    if (reportingYearIsOpen) {
      const message = `You can edit this disclosure until October 1, ${reportingYear + 1}, when its expense reports must be complete.`;
      return versionWithEditButton(disclosureId, message);
    } else {
      return editingClosedVersion(reportingYear);
    }
  } else {
    if (reportingYearIsOpen) {
      return yearIsOpenDisclaimer(reportingYear);
    } else {
      return '';
    }
  }
};

export default OpenForEditing;
