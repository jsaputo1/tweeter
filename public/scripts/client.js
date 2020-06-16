$(function () {
  //jQuery document ready function

  // Default states

  const error = $(".error h3");
  error.hide();

  $(".new-tweet textarea").keyup(function () {
    error.html("");
    error.slideUp();
  });

  // //Placeholder Tweets
  // const tweetData = [
  //   {
  //     user: {
  //       name: "Newton",
  //       avatars: "https://i.imgur.com/73hZDYK.png",
  //       handle: "@SirIsaac",
  //     },
  //     content: {
  //       text: "If I have seen further it is by standing on the shoulders of giants",
  //     },
  //     created_at: 1461116232227,
  //   },
  // ];

  // Functions
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
          ${escape(tweetData.content.text)}
        </article>
          <div class="tweet-footer"><h4>${tweetData.created_at}</h4>
          <h4>Retweet/Like</h4>
        </div>
      </div>
    `;
    return tweet;
  };

  const renderTweets = (tweetData) => {
    $(".tweet").empty();
    for (const tweet of tweetData) {
      $(".tweet").prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = () => {
    $.ajax("/tweets/", {method: "GET"}).then(function (tweet) {
      renderTweets(tweet);
    });
  };

  const errorCheck = function (tweetTextValue) {
    if (tweetTextValue.length === 0) {
      error.html("Error: Tweet Cannot be Empty");
      error.slideDown();
      return error;
    } else if (tweetTextValue.length > 140) {
      error.html("Error: Exceeded max character limit");
      error.slideDown();
      return error;
    }
  };

  loadTweets();
  // renderTweets(tweetData)

  //Event listener and Ajax call
  const form = $("form");
  form.on("submit", function (event) {
    const queryString = $(this).serialize();
    const tweetTextBox = $(this).find("#tweet-text");
    const tweetTextValue = tweetTextBox.val().trim();
    const counter = $(".counter");
    event.preventDefault();

    if (errorCheck(tweetTextValue)) {
      return error;
    }

    $.ajax("/tweets/", {
      method: "POST",
      data: queryString,
    }).then(function () {
      counter.html("140");
      tweetTextBox.val("");
      loadTweets();
    });
  });
});
