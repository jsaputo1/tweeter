$(document).ready(function () {
  //Character counter
  $(".new-tweet textarea").keyup(function () {
    const textCount = this.value.length;
    const max = 140;
    const counter = max - textCount;
    const indexCount = $(this).siblings().find(".counter");
    indexCount.html(counter);
    if (counter < 0) {
      indexCount.addClass("overLimit");
    } else {
      indexCount.removeClass("overLimit");
    }
  });

  //Toggle scroll to top button
  $(window).scroll(function () {
    const scrollToTop = $(".scroll-to-top");
    if ($(this).scrollTop() > 100) {
      scrollToTop.fadeIn();
    } else {
      scrollToTop.fadeOut();
    }
  });
}); // closing document.ready
