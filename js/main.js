$(function () {


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

    $(".inview-balloon").each(function () {

      var scroll = $(window).scrollTop();

      var target = $(this).offset().top;

      var windowHeight = $(window).height();

      if (scroll > target - windowHeight + $(this).outerHeight()) {
        // outerHeight()はpaddingを含めた高さを取得する
        $(this).addClass("balloon");
      }
    });





});