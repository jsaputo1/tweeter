$(function () {
  // Default Hidden Divs
  const error = $(".error h3");
  const newTweetSection = $(".new-tweet");
  const arrowUp = $(".arrow-up");
  const arrowDown = $(".arrow-down");
  error.hide();
  newTweetSection.hide();
  arrowUp.hide();
  arrowDown.show();

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
           <h4>
             <a href="#"><i class="fas fa-flag"></i></a>
             <a href="#"><i class="fas fa-retweet"></i></a>
             <a href="#"><i class="fas fa-heart"></i></a>
           </h4>
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

  //Function to load existing tweets in the database
  loadTweets();

  const errorCheck = function (tweetTextValue) {
    const error = $(".error h3");
    $(".new-tweet textarea").keyup(function () {
      error.html("");
      error.slideUp();
    });

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

  // Event listener to toggle new tweet submission
  $(".right-nav").on("click", function (event) {
    newTweetSection.slideToggle();
    arrowDown.toggle();
    arrowUp.toggle();
  });

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
