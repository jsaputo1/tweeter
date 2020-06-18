// Event listener to toggle new tweet submission
$(function () {
  $(".right-nav").on("click", function (event) {
    const newTweetSection = $(".new-tweet");
    const textArea = $(".new-tweet textarea");
    const arrowUp = $(".arrow-up");
    const arrowDown = $(".arrow-down");

    newTweetSection.slideToggle();
    textArea.focus();
    arrowDown.toggle();
    arrowUp.toggle();
  });

  //Event listener to scroll to top
  const scrollToTop = $(".scroll-to-top");
  $(scrollToTop).click(function () {
    $(window).scrollTop(0);
  });
});
