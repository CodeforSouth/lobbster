
# Contributing to Lobbster 🦀

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Lobbster. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table Of Contents

1. [Code of Conduct](#code-of-conduct)
2. [I don't want to read this whole thing I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)
3. [Ways *you* can contribute](#ways-you-can-contribute)
4. [Reporting a bug or other issue](#reporting-a-bug-or-other-issue)
5. [Tackle a Hack Request](#tackle-a-hack-request)
6. [Updating the Code? Open a Pull Request](#updating-the-code-open-a-pull-request)

### Code of Conduct

This project and everyone participating in it is governed by the [Lobbster Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [codeformiami@gmail.com](mailto:codeformiami@gmail.com).

### I don't want to read this whole thing I just have a question!!!

> **Note:** Please don't file an issue to ask a question. You'll get faster results by using slack.

If the question is in regards to an issue or pull request, ask the question there. If it is not we have an official slack channel where the community chimes in with helpful advice.

* [Join the Code For Miami Team](join_slack)
    * Even though Slack is a chat service, sometimes it takes several hours for community members to respond &mdash; please be patient!
    * Use the `#lobbster` channel for general questions or discussion about Lobbster
    * There are many other channels available that cover other Code For Miami projects, check the channel list

### Ways *you* can contribute:
* by [installing and testing the software][install_instructions]
* by [using the issue tracker][issue_tracker] for...
  * reporting bugs
  * suggesting new features
  * suggesting labels for our issues
* by improving the code through:
  * writing or editing documentation
  * writing test specifications
  * refactoring the code (**no patch is too small**: fix typos, add comments,
  clean up inconsistent whitespace).
  * reviewing [open Pull Requests][open_prs]
* by [donating to Code for Miami][donate]

### Reporting a bug or other issue
We use the GitHub issue tracker to track bugs and feature
requests. To submit a bug report or feature request:

1. **[Browse][issue_tracker] or [search][issue_search] our issues** to make
sure your issue hasn't already been submitted.

2. **[Submit an issue][new_issue]**.
If you're submitting a bug report, it's helpful to include any details that
may be necessary to reproduce the bug, including:

    - a screenshot
    - your operating system (Windows 7, Mac OSX 10.9.2, etc.)
    - your web browser and version (Internet Explorer 9, Chrome 27, etc.)
    - a stack trace of any errors encountered
    - your Ruby version (use `ruby -v` from the command line)

For developers, a bug report should ideally include a pull request with
failing specs.

### Tackle a Hack Request
Some issues in particular we'd be happy if contributors like yourself were
interested in fixing. Browse the issues and see if there's something there that you could fix.

### Updating the Code? Open a Pull Request
To submit a code change to the project for review by the team:

1. **Setup:** Make sure you have the [prerequisites installed][prerequisites]
on your computer.

2. **Fork:** [Fork this repository and clone it on your computer][fork].

3. **Install Dependencies:** From the root directory of the app, run `bundle`.

4. **Branch:** [Create a topic branch][branch] for the one specific issue
you're addressing.

5. **Write Specs:**
   
   We do our best to follow the [BetterSpecs](http://www.betterspecs.org/) Testing Style Guide.

   Testing is setup with [RSpec Rails](https://relishapp.com/rspec/rspec-rails/) and We are using[Factory Bot ](http://www.rubydoc.info/gems/factory_bot) with [Faker](https://github.com/stympy/faker) to create our fixtures with randomized data.
[Shoulda Matchers](https://github.com/thoughtbot/shoulda-matchers) has been added to simplify validations.

   This is an API we are only writing unit tests on our Models and integration tests in the form of Request Specs that will simultaneously cover Response, Routing, and the Controllers.

6. **Test to fail:** Run `rspec`. If your specs pass, return to
**step 5**. In the spirit of Test-Driven Development, you want to write a
failing test first, then implement the feature or bug fix to make the test
pass.

7. **Implement:** Implement your feature or bug fix. Please follow the
[community-driven Ruby Style Guide][style_guide]*.

8. **Test to pass:** Run `script/test` to run the test suite in addition to the
style checkers. If your specs fail and/or style offenses are reported, return
to **step 7**.

10. **Commit changes:** Add, commit, and push your changes.

11. **Pull request:** [Submit a pull request][pr] to send your changes to this
repository for review.

[join_slack]: http://cfm-invite.herokuapp.com/
[install_instructions]: https://github.com/Code-for-Miami/lobbster#install
[open_prs]: https://github.com/Code-for-Miami/lobbster/pulls?q=is%3Aopen+is%3Apr
[donate]: http://codefor.miami/get-started-with-civic-hacking#_givealways
[issue_tracker]: https://github.com/Code-for-Miami/lobbster/issues
[issue_search]: https://github.com/Code-for-Miami/lobbster/search?ref=cmdform&type=Issues
[new_issue]: https://github.com/Code-for-Miami/lobbster/issues/new
[prerequisites]: https://github.com/Code-for-Miami/lobbster#install
[fork]: http://help.github.com/fork-a-repo/
[branch]: https://help.github.com/articles/creating-and-deleting-branches-within-your-repository
[style_guide]: https://github.com/bbatsov/ruby-style-guide
[pr]: http://help.github.com/send-pull-requests/
