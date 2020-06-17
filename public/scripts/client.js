$(function () {
  // Default Hidden Divs
  const error = $(".error h3");
  const newTweetSection = $(".new-tweet");
  const textArea = $(".new-tweet textarea");
  const arrowUp = $(".arrow-up");
  const arrowDown = $(".arrow-down");
  const scrollToTop = $(".scroll-to-top");
  error.hide();
  newTweetSection.hide();
  arrowUp.hide();
  arrowDown.show();
  scrollToTop.hide();

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
          <div class="tweet-footer"><h4>${moment(tweetData.created_at, "").fromNow()}</h4>
          
           <h4>
             <i class="fas fa-flag"></i>
             <i class="fas fa-retweet"></i>
             <i class="fas fa-heart"></i>
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
    $(textArea).keyup(function () {
      error.html("");
      error.slideUp();
    });

    if (tweetTextValue.length === 0) {
      error.html(`<i class="fas fa-exclamation-triangle"></i> Error: Tweet Cannot be Empty `);
      textArea.focus();
      error.slideDown();
      return error;
    } else if (tweetTextValue.length > 140) {
      error.html(`<i class="fas fa-exclamation-triangle"></i> Error: Exceeded max character limit`);
      error.slideDown();
      textArea.focus();
      return error;
    }
  };

  // Event listener to toggle new tweet submission
  $(".right-nav").on("click", function (event) {
    newTweetSection.slideToggle();
    textArea.focus();
    arrowDown.toggle();
    arrowUp.toggle();
  });

  //Event listener to scroll to top
  $(scrollToTop).click(function () {
    $(window).scrollTop(0);
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
