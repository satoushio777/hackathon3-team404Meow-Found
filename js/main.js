$(function () {

  //Voice
  $('#voice .slide-items').slick({
    infinite: true,           //スライダーのループ
    centerPadding: '20px',    // ★真ん中を広く見せる
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    // ★ centerMode / centerPadding を全部消す
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, 
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1 ,
        }
      }
    ]
  });



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

