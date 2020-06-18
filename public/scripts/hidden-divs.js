$(function () {
  // Default Hidden Divs
  const error = $(".error h3");
  error.hide();

  const newTweetSection = $(".new-tweet");
  newTweetSection.hide();

  const arrowUp = $(".arrow-up");
  arrowUp.hide();

  const arrowDown = $(".arrow-down");
  arrowDown.show();

  const scrollToTop = $(".scroll-to-top");
  scrollToTop.hide();
});
