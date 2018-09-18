import React from 'react';
import PropTypes from 'prop-types';

const setupTagColor = boolean => boolean ? 'is-success' : 'is-warning';
const setupTagStatus = boolean => boolean ? 'complete' : 'needs action';
const SetupTag = ({ actionName, acheived }) => {
  const tagColor = setupTagColor(acheived);
  return (
    <div className="tags has-addons">
      <span className="tag">{actionName}</span>
      <span className={`tag ${tagColor}`}>
        {setupTagStatus(acheived)}
      </span>
    </div>
  );
};

SetupTag.propTypes = {
  actionName: PropTypes.string.isRequired,
  acheived: PropTypes.bool.isRequired
};

export default SetupTag;
