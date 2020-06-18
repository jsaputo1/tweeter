$(function () {
  //Load existing tweets in the database
  loadTweets();
  //Event listener and Ajax call
  const error = $(".error h3");
  const form = $("form");
  form.on("submit", function (event) {
    const tweetTextValue = $(this).find("#tweet-text").val().trim();
    event.preventDefault();
    if (errorCheck(tweetTextValue)) {
      return error;
    }
    $.ajax("/tweets/", {
      method: "POST",
      data: $(this).serialize(),
    }).then(function () {
      reset();
      loadTweets();
    });
  });
});
