$(document).ready(function () {
  // document ready

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
}); // closing document.ready
