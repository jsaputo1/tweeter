$(function () { //jQuery document ready function

  //Placeholder Tweets 
  const tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
  ];

  //Functions

  // const escape =  function(str) {
  //   let div = document.createElement('div');
  //   div.appendChild(document.createTextNode(str));
  //   return div.innerHTML;
  // }



  // const safeHTML = `<p>${escape(textFromUser)}</p>`;

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  // const safeHTML = `<p>${escape(textFromUser)}</p>`;


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
    return tweet
  };



  const renderTweets = (tweetData) => {
    for (const tweet of tweetData) {



      $(".tweet").prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = () => {
    $.ajax("/tweets/", { method: "GET" }).then(function (tweets) {
      renderTweets(tweets);
    });
  };





  //Loading all tweets tha are in the database
  loadTweets();


  //Event listener and Ajax call
  const form = $("form");
  form.on("submit", function (event) {
    const queryString = $(this).serialize();
    const tweetTextBox = $(this).find("#tweet-text")
    const tweetTextValue = tweetTextBox.val().trim()
    const counter = $(".counter")
    event.preventDefault();
    if (tweetTextValue.length === 0) {
      alert("Tweet cannot be empty")
      return;
    }
    $.ajax("/tweets/", {
      method: "POST",
      data: queryString,
    }).then(function () {
      counter.html("140")
      tweetTextBox.val("")
      loadTweets();
    });
  });
});
