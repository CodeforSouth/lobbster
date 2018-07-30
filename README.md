# Lobbster [![Build Status](https://travis-ci.org/Code-for-Miami/lobbster.svg?branch=setup_travis_ci)](https://travis-ci.org/Code-for-Miami/lobbster)

Lobbster is an open-source project to help lobbyists comply with reporting requirements for the City of Coral Gables.

## Background
### Lobbyist Responsibilities
Section 2-243 of the _Code of the City of Coral Gables_ creates requirements for non-exempt lobbyists to submit five types of documentation, four of which are submitted as forms to the City Clerk.

* *Annual Registration Application*
  * This application is principal-specific; each year, the lobbyist must submit a separate copy of the application for each principal that they represent.
  * A $250 annual fee is collected with the application unless the lobbyist has already paid the fee for the year or the application qualifies for a fee exemption.
* *Issue Application*
  * This application is also principal-specific; each year, the lobbyist must submit a separate copy of the application for each of their principals, to list all of the issues that they represent for that principal.
  * Because this application is principal-specific, duplicate issues represented across multiple principals will need to be reported multiple times (one time per principal).
* *Lobbyist Expenditure Report*
  * These reports are specific to particular (principal, issue) pairs; a lobbyist must submit one report for each principal/issue combination that they represented.
  * On October 1st of each year, lobbyists who were registered for the prior year must submit expenditure reports for the prior year, regardless of whether or not any expenses were actually incurred.
* *Notice of Withdrawal of Lobbyist Registration*
  * Whenever a lobbyist withdraws as lobbyist for a principal, they must file a withdrawal notice.
* *Amendments*
  * Amendments to these forms must be submitted whenever a change occurs to the information that has been filed. Whether the ammendments have a required format is unclear.

Most of the forms require that the lobbyist sign a statement agreeing to some terms, or swearing under oath that the information on the form is correct.

### City Clerk Responsibilities
* Approve lobbyist registration and issue applications.
* Verify the identities of the people who submit applications and expenditure reports.
* Collect lobbyist fees---and presumably, return fees that are paid by mistake.
* Maintain the records that are submitted.
* Prepare and publish reports on lobbying activity.

---

## Application Design

### Account Types / Access Levels
All user accounts have one of two types. An account's type determines what parts of the API the account can use, as well as what views to display.
* _Lobbyist_ - The default account type. Designed for fulfilling lobbyist requirements. All accounts start out with this type when they are created.
* _Administrator_ - Designed for fulfilling City Clerk duties. Has more permissions than a lobbyist account.
    * Administrator accounts can convert other accounts to or from administrator accounts; this is how administrator accounts are made.
    * Creating an initial administrator account is a crucial step in the deployment process.

In addition to having an account type, accounts have a status of whether or not their email address has been verified by clicking on the linnk that is sent to their email address. Accounts that do not have a verified email address are only able to resend verification links to their email address.

### Functionality

#### Account Creation
Anybody on the Internet can create a user account by submitting an email as a username, along with a password. The user will need to visit a verification link sent to the account's email address before the account will be able to do anything useful. If the account needs to have administrator access, another administrator account will need to grant it.

#### Password Resets
If a user forgets their password, they can have a password reset link sent to their email address.

#### Identity Verification

Only an administrator account is able to mark an account as having its user's identity verified.

The process for an administrator to verify a lobbyist's identity has not been determined. It seems like this step could be a one-time thing.

#### Lobbyist Document Submission

Lobbyist accounts can fill out and submit forms that fulfil their reporting requirements.

A form will automatically be saved as a draft that can be reopened and resumed later. The draft will exist until the form is submitted or deleted.

The lobbyist registration application sometimes requires a payment to clear as a step in its submission; submitting the form will fail if the payment fails.

All submitted forms have a status of _pending review_, until an administrator account changes the status to _approved_ or _rejected_. Before submission, forms have a status of _draft_, which is the only status that allows forms to be modified.

To ensure the integrity of document data through system changes, all submissions are stored as the full text of the document; not as values to be filled into a template. This ensures that the original text of a submitted document won't be corrupted by system upgrades.

#### City Clerk Document Review

The City Clerk will be able to review documents that are _pending review_, and mark them as _approved_ or _rejected_. If a document is rejected, the City Clerk can tell the lobbyist what they need to do differently for their resubmission by calling or emailing them.

#### Email Notifications

#### User Account Management
Administrators can perform a number of user account management activities. An administrator cannot perform some types of actions on themselves.
* Changing accounts' types to and from administrators.
* Deactivating accounts.
* Changing an account's email address / username.
* Requiring password resets.

### User Interface

#### Account's Document List Page

This page shows a list of all the documents that a user has submitted. Each list entry shows the document's title, submission date, status property (_pending review_, _approved_, _rejected_), and a link to view the actual submitted document.

The page is available to lobbyists for working with their own account, and to administrators for any exploring any account.

#### Document Viewing Page

This page shows a submitted document. It is availalbe to both lobbyists and administrators for reviewing documents. Generally, this page is accessed by clicking a link for viewing a particular non-draft document.

A timeline of status changes with links to previous document versions is provided.

Administrator-specific features:
* Allows changing the document from any status to either _accepted_ or _rejected_.
* Contact information is displayed for the account's user, so that follow-up questions and requests can be easily made.

Lobbyist-specific features:
* Allows creating a resubmission with modifications, if the document was rejected and is the most recent version of the document.
* Allows creating an amended submission, if the document was approved and is the most recent version of the document.
* If a draft resubmission or amendment exists, the user will see a prominant link to access and continue working on the draft.

#### Document Editing Page

This is the page that lobbyists use to fill in documents. It has a button to force saving the document as a draft, a status to say when the draft was last saved, and a button to review the form before submitting. The review form before submitting option will automatically save the draft before progressing to the review page.

#### Document Review Prior to Submission Page

This is a lobbyist's view of the document just before submitting it. It has a button to return to editing the draft, and a button to submit the document.

#### Lobbyist Dashboard
* Links for accessing the other pages that the lobbyist has access to.
* Notifications listing documents that need attention.
  * Drafts that haven't been completed.
  * Document rejections.
  * Document approvals.
  * Pending deadlines for expense reports.

#### Accounts Management Page

This administrator-only page provides a table view all user accounts, with administrator actions that can be performed on them.

#### Documents Pending Review Page

This administrator-only page lists all documents that administrators need to approve or reject.

#### Administrator Dashboard
* Links for accessing the other pages that the lobbyist has access to.
* Notifications for:
  * Drafts that are pending review.
  * New users that have signed up.

#### Login Page
* Allows user logins.
* Allows user sign-ups.
* Provides a reset / forgot password link.

---

## Requirements

* Allow online lobbyist registration.
* Usernames should be email addresses.
* Confirmation step for lobbyists to assent that the information they submit is true.
* Allow lobbyists to register for their principals.
  * Collect the $150 fee.
  * Not-for-profit lobbyists will click on “Wave Fee.”
  * Registration is valid until December 31st in the year of registration.
  * Registration will be pending until City staff confirm ‘Not for Profit’ status.
* Allow lobbyists to submit a withdrawal form at any time to notify the City they are no longer representing a Principal.
* Allow Lobbyist to register each Issue.
  * Unlike registering a principal, this does not require a fee.
* Allow Lobbyist to submit an Expenditure report online.
* Email capabilities to send reminders, receipts and  welcome messages to active Lobbyists.
* Reporting capabilities (Report by Lobbyist, Principal , Issue, Year of Registration, etc.)

## Status

Gathering Requirements.

## Press

## Why

## Who

## How
#### Dependencies

#### Install

#### Deploy

## Contribute
If you would like to contribute please read our guidelines. [CONTRIBUTING](CONTRIBUTING.md)

## License

We are using a [BSD 3-clause "New" or "Revised" License](LICENSE.md)
