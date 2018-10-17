import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function noticeBar(noticeList) {
  return (
    <div columns>
      { noticeList.map(notice => <div className="column is-6">{notice}</div>) }
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

export function paymentNotice(key) {
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
            Annual lobbyist registration fee is due for registered lobbyists. If eligible, you can request a non-profit lobbying exemption.
          </p>
          <p>
            <Link to="/payments">My Payments</Link>
          </p>
        </div>
      </article>
    </div>
  );
}
