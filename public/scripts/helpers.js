//Error Check

const errorCheck = function (tweetTextValue) {
  const error = $(".error h3");
  const textArea = $(".new-tweet textarea");

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

//Escape
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Create tweet helpers
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
        <div class="tweet-footer">
          <h4>${moment(tweetData.created_at, "").fromNow()}</h4>
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

const reset = function () {
  const counter = $(".counter");
  const tweetTextBox = $("form").find("#tweet-text");
  counter.html("140");
  tweetTextBox.val("");
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
