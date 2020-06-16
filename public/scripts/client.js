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
    $(".tweet").prepend(createTweetElement(tweet));
  }
};

const loadTweets = () => {
  $.ajax("/tweets/", { method: "GET" }).then(function (tweets) {
    renderTweets(tweets);
  });
};

const createTweetElement = function (tweetData) {
  const tweet = `
    <div class="tweet-container">
      <div class="tweet-header">
      <div class="user-info">
      <img src="${tweetData.user.avatars}">
      <h3>${tweetData.user.name}</h3>
      </div>
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
  loadTweets();

  $form.on("submit", function () {
    event.preventDefault();
    console.log("Button clicked, performing ajax call...");
    const queryString = $(this).serialize();

    $.ajax("/tweets/", {
      method: "POST",
      data: queryString,
    }).then(function () {
      if (queryString.length > 145) {
        console.log("Tweet is too long");
      } else if (queryString.length < 7) {
        console.log("Tweet is not long enough");
      } else {
        $("#tweet-text").val("");
        $(".counter").html("140");

        console.log("Success: ", queryString.length);

        loadTweets();
      }
    });
  });
});
