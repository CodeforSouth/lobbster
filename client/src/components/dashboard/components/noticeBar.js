import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function noticeBar(noticeList) {
  const noticeKeys = noticeList.map((notice, i) => i);
  return (
    <div>
      { noticeList.map((notice, i) => <div className="column is-6" key={noticeKeys[i]}>{notice}</div>) }
    </div>
  );
}

export function verifyEmailNotice() {
  return (
    <div className="notification is-warning">
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

export function paymentNotice() {
  return (
    <div className="notification is-warning">
      <article className="media">
        <figure className="media-left">
          <span className="icon">
            <FontAwesomeIcon icon="exclamation-triangle" />
          </span>
        </figure>
        <div className="media-content">
          <p>
            Annual lobbyist registration fee is due for registered lobbyists. If
            { ' ' }
            eligible, you can request a non-profit lobbying exemption.
          </p>
          <p>
            <Link to="/payments">My Payments</Link>
          </p>
        </div>
      </article>
    </div>
  );
}
