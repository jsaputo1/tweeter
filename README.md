# Tweeter Project

Tweeter is a simple, single-page Twitter clone. The front end was built using CSS, JS, jQuery and AJAX, and the back-end was built with Node and Express.

## Final Product

This is the main page. It shows a list of all Tweets that have been submitted. Users can submit new Tweets by clicking "write a new tweet" at the top right on the nav bar.
!["Screenshot of main page"](https://github.com/jsaputo1/tweeter/blob/master/docs/screenshots/main-page.png)

This is a screenshot of a tweet submission. Tweets are limited to 140 max characters, there is a dynamic counter on the bottom right of the text box. If the text box is over limit or at 0 then the user will get a corresponding error when trying to submit.
!["Screenshot of submit tweet"](https://github.com/jsaputo1/tweeter/blob/master/docs/screenshots/submit-tweet.png)

The page is responsive with views for Mobile and Desktop. This is is the view for mobile devices.

<div style="align: center">
!["Screenshot of responsive design"](https://github.com/jsaputo1/tweeter/blob/master/docs/screenshots/responsive.png)
</div>

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
