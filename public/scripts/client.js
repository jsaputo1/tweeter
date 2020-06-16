/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function () {
  // document ready

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

  const renderTweets = (array) => {
    for (const tweet in array) {
      // const tweet = createTweetElement(tweet);
      $(".tweet").append(createTweetElement(tweet));
    }
  };

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

  //Call function to render tweets

  renderTweets(tweetData);
});
