/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

//Tweet database
const tweetData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
];

//Function to render tweets to the .tweets section
const renderTweets = (array) => {
  for (const tweet in array) {
    // const tweet = createTweetElement(tweet);
    $(".tweet").append(createTweetElement(tweet));
  }
};

//Function to add tweets
const createTweetElement = function (tweet) {
  return $(`
    <div class="tweet-container">
      <div class="tweet-header">
      <h3>John Doe</h3>
      <h3 class="username">@JohnDoe</h3>
    </div>
    <article>
      Hello World!
    </article>
    <div class="tweet-footer">
      <h4>10 days ago</h4>
      <h4>Retweet/Like</h4>
    </div>
  </div>
       
    
    `);
};

// renderTweets(tweetData);

$(function () {
  const $form = $("form");
  $form.on("submit", function () {
    event.preventDefault();
    console.log("Button clicked, performing ajax call...");
    const queryString = $(this).serialize();
    console.log(queryString);
    $.ajax("/tweets/", { method: "POST", data: queryString }).then(function (
      tweets
    ) {
      console.log("Success: ", tweets);
      renderTweets(tweetData);
    });
  });
});
