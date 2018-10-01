import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function noticeBar(noticeList) {
  return (
    <div className="level">
      { noticeList }
    </div>
  );
}

export function verifyEmailNotice(key) {
  return (
    <div key={key} className="notification is-warning">
      <article className="media">
        <figure className="media-left">
          <span className="icon">
            <FontAwesomeIcon icon="exclamation-triangle" />
          </span>
        </figure>
        <div className="media-content">
          <p>
            Please verify your email address by visiting the link sent to it.
          </p>
          <p>
            <a href="/">Resend Link</a>
          </p>
        </div>
      </article>
    </div>
  );
}
