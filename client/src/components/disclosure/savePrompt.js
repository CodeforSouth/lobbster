import React from 'react';
import { Link } from 'react-router-dom';

import { submitButton } from '../uiElements/submitButton';

const levelStyle = {
  padding: '2rem',
  borderRadius: '0.3rem',
  borderWidth: '1px',
  borderColor: 'black'
};

const buttons = (disclosureId, submitRequestStatus, saveLabel) => {
  const cancelPath = disclosureId ? `/disclosure/view/${disclosureId}` : '/';
  return (
    <div>
      <div className="field is-grouped">
        { submitButton(saveLabel, submitRequestStatus) }
        <Link to={cancelPath}>
          <button type="button" className="button is-light">
            <span>Cancel</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

const savePrompt = (disclosureId, submitRequestStatus, saveLabel, message) => (
  <nav className="level" style={levelStyle}>
    <div className="level-left has-text-centered">
      { message }
    </div>
    <div className="level-right has-text-centered">
      { buttons(disclosureId, submitRequestStatus, saveLabel) }
    </div>
  </nav>
);

const saveChangesMessage = 'Save all changes made on this screen. Be aware that deleting an issue will also delete its expense report.';
const saveNewMessage = 'After saving, you will be able to return and make changes.';

const saveChangesPrompt = (disclosureId, submitRequestStatus) => savePrompt(disclosureId, submitRequestStatus, 'Save All Changes', saveChangesMessage);
const saveNewPrompt = submitRequestStatus => savePrompt(undefined, submitRequestStatus, 'Save New Disclosure', saveNewMessage);

export { saveChangesPrompt, saveNewPrompt };
