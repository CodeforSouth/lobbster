# Lobbster [![Build Status](https://travis-ci.org/Code-for-Miami/lobbster.svg?branch=setup_travis_ci)](https://travis-ci.org/Code-for-Miami/lobbster)

Lobbster is an open-source project to help lobbyists comply with reporting requirements for the City of Coral Gables.

## Getting Started
These instructions are for getting a development version of the project running locally. Beyond these setup instructions, you will also need access to a running MongoDB instance.
1. Clone the repository.
2. Install dependencies by running the install-dev script from the root project directory.
```
npm run install-dev
```
3. Create a dev-keys.js file in the config directory. It should be just like prod-keys.js, but with your values in place of the process.env ones. You will need:
   * A URI for accessing a development-specific MongoDB instance.
   * A secret for express-session to use.
   * A secret key from Stripe.
4. Create a .env.development file in the client directory. It should create your Stripe publishable key's environment variable as follows. For deployment, you'll need to create a similar .env.production file.
```
REACT_APP_STRIPE_KEY=pk_test_968cDB2YElX91ulzPSZkFArk
```
5. Launch the project locally by calling the dev script from the root project directory.
```
npm run dev
```
6. Grant *administrator* status to your first administrator account by manually setting an account's MongoDB *isAdmin* field to *true*. Administrator accounts can grant administrator status to other accounts via *User Account Management*.

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
  * Amendments to these forms must be submitted whenever a change occurs to the information that has been filed. Whether the amendments have a required format is unclear.

Most of the forms require that the lobbyist sign a statement agreeing to some terms, or swearing under oath that the information on the form is correct.

### City Responsibilities
* Publish reported data.
* Collect payments.
* Approve non-profit exemptions.

---

## Application Design

### Lobbyists and Administrators
Each user account is either a *lobbyist* account or an *administrator* account. This status grants different levels of API access, and controls what parts of the UI are rendered.
* _Lobbyist_ - The default account type. All accounts start out with this type when they are created.
* _Administrator_ - Has more permissions than a lobbyist account.
    * During deployment, the first administrator account is created by changing the account type in the database.
    * Administrator accounts can change an account's type in *User Account Management*.

#### Creating Accounts
Anybody on the Internet can create a user account by submitting an email address username with a password.

---

## Requirements

* Allow online lobbyist registration.
* Usernames should be email addresses.
* Confirmation step for lobbyists to assent that the information they submit is true.
* Allow lobbyists to register for their principals.
  * Collect the $250 fee.
  * Not-for-profit lobbyists will click on “Wave Fee.”
  * Registration is valid until December 31st in the year of registration.
  * Registration will be pending until City staff confirm ‘Not for Profit’ status.
* Allow lobbyists to submit a withdrawal form at any time to notify the City they are no longer representing a Principal.
* Allow Lobbyist to register each Issue.
  * Unlike registering a principal, this does not require a fee.
* Allow Lobbyist to submit an Expenditure report online.
* Email capabilities to send reminders, receipts and  welcome messages to active Lobbyists.
* Reporting capabilities (Report by Lobbyist, Principal , Issue, Year of Registration, etc.).
* Data that lobbyists enter should be available to the public automatically, right away.
* Data that lobbyists enter should be stored simply as values in the database.
* Lobbyists should be able to create, edit, and manage their data throughout the year, as they please.
* The issues that a lobbyist represents for a particular principal should simply be entered in a list all together; this is different from and more convenient than the physical forms, which required a separate form to be submitted for each (principal, issue) pair.
* If a lobbyist does their submission on paper, then the office will enter the information themselves, and then discard the paper submission.

### Additional Notes
* Official approval isn't required for the information that lobbyists enter.
* User identity verification isn't a requirement.
* Some notes on visual identity are that we can take inspiration from the City of Coral Gables website for colors and patterns. Also, it might be nice to include the City of Coral Gables logo.

## Status

Beta version to be completed in early November.

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
