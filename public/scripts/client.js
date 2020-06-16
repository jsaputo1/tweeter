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

const renderTweets = (array) => {
  for (const tweet of array) {
    // const tweet = createTweetElement(tweet);
    $(".tweet").append(createTweetElement(tweet));
  }
};

const createTweetElement = function (tweetData) {
  const tweet = `
    <div class="tweet-container">
      <div class="tweet-header">
      <h3>${tweetData.user.name}</h3>
      <h3 class="username">${tweetData.user.handle}</h3>
    </div>
    <article>
    ${tweetData.content.text}
    </article>
    <div class="tweet-footer"><h4>${tweetData.created_at}</h4>
      <h4>Retweet/Like</h4>
    </div>
  </div>
    `;
  return tweet;
};

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
      loadTweets();
    });
  });
});

const loadTweets = () => {
  $.ajax("/tweets/", { method: "GET" }).then(function (tweets) {
    renderTweets(tweets);
  });
};

loadTweets();
