import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const discloseNewPrincipalButton = () => (
  <Link to="/disclosure/new" className="button is-link">
    <span className="icon is-small is-left">
      <FontAwesomeIcon icon="plus" />
    </span>
    <span>Add New Principal</span>
  </Link>
);

export default discloseNewPrincipalButton;
