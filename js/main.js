$(function () {

  const pagetop = $(".center-wrap");
  const $footer = $("footer");

  if (!$footer.length) return;

  $(window).on("scroll resize", function () {
    const scroll = $(this).scrollTop();
    const winH = $(this).height();
    const footerTop = $footer.offset().top;

    const over500 = scroll > 500;
    const hitFooter = scroll + winH > footerTop;

    if (over500 && !hitFooter) {
      // 表示
      pagetop.addClass("is-show");
    } else {
      // 非表示
      pagetop.removeClass("is-show");
    }
  }).trigger("scroll");









// Q&A

$(".openbtn1").click(function () {
  $(".close-text").css("visibility", "visible");
  $(this).parent(".close-text").css("visibility", "hidden");
  $(".open-text").css("visibility", "hidden");
  $(this).parents(".content").find(".open-text").css("visibility", "visible");
});

$(".openbtn2").click(function () {
  $(this).parents(".open-text").css("visibility", "hidden");
});

// クリックの処理はそのままでOK

// スクロールでふきだし表示
$(window).on("scroll", function () {

  $(".inview-balloon").each(function (i) {

    var scroll = $(window).scrollTop();
    var target = $(this).offset().top;
    var windowHeight = $(window).height();

    if (scroll > target - windowHeight + $(this).outerHeight()) {

      // i 番目ごとに 0.2秒ずつ遅らせる
      $(this).delay(i * 1).queue(function (next) {
        $(this).addClass("balloon");
        next();
      });

    }
  });

});

});

