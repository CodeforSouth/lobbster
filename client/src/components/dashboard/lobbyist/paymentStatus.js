import React from 'react';

const colors = {
  neutral: 1,
  warning: 2,
  success: 3
};

const colorToStyle = {};
colorToStyle[colors.neutral] = '';
colorToStyle[colors.warning] = 'is-warning';
colorToStyle[colors.success] = 'is-success';

export const paymentStatus = (color, headerText, symbol, footerText, linkName, linkURL) => {
  return (
    <div className={`notification ${colorToStyle[color]} has-text-centered`}>
      <h6 className="title is-6">
        {headerText}
      </h6>
      <div>
        {footerText}
      </div>
    </div>
  );
};

export const paymentMayBeRequired = year => paymentStatus(
  colors.neutral,
  `${year} Payment Status`,
  null,
  'Action will be required once you register for a principal.',
  null,
  null
);

export const actionNeeded = year => paymentStatus(
  colors.warning,
  `${year} Payment Status`,
  null,
  'Payment is due for this year. Lobbyists who are eligible for non-profit exemptions should request an exemption.',
  null,
  null
);

export const paid = year => paymentStatus(
  colors.success,
  `${year} Payment Status`,
  null,
  'You\'re paid for the year.',
  null,
  null
);

export const nonProfitPending = year => paymentStatus(
  colors.warning,
  `${year} Payment Status`,
  null,
  'Your non-profit exemption request is pending approval.',
  null,
  null
);

export const nonProfitRejected = year => paymentStatus(
  colors.warning,
  `${year} Payment Status`,
  null,
  'Payment is due for this year. Your non-profit exemption request has been rejected.',
  null,
  null
);

export const nonProfitApproved = year => paymentStatus(
  colors.success,
  `${year} Payment Status`,
  null,
  'You\'ve been granted a non-profit exemption.',
  null,
  null
);
