$(function () {
  //Support
  // 講師モーダル（jQuery版）
  $(".teacher-content-img").on("click", function () {
    // この講師の li の中のモーダルを取得
    const $modal = $(this).closest("li").find(".teacher-modal-overlay");
    $modal.addClass("is-active");
  });

  // × close ボタン
  $(".js-close-teacher-modal").on("click", function () {
    $(this).closest(".teacher-modal-overlay").removeClass("is-active");
  });

  // 黒背景クリックで閉じる
  $(".teacher-modal-overlay").on("click", function (e) {
    if ($(e.target).hasClass("teacher-modal-overlay")) {
      $(this).removeClass("is-active");
    }
  });

  //Voice---スライダー
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
          slidesToShow: 1,
        }
      }
    ]
  });

  //Work
  $("#work1 .slide-items").slick({
    autoplay: true, // 自動再生
    arrows: true, // 矢印
    dots: true, // インジケーター
    centerMode: true,
    centerPadding: "30px",
    // ★ centerMode / centerPadding を全部消す
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 900,
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

  // LINEリンクボタントップとフッターで消える

  const pagetop = $(".center-wrap");
  const $footer = $("footer");

  if (!$footer.length) return;

  $(window).on("scroll resize", function () {
    const scroll = $(this).scrollTop();
    const winH = $(this).height();
    const footerTop = $footer.offset().top;

    const over500 = scroll > 100;
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

  // footer btn

  $(function () {
    $("#ft-totop").on("click", function (e) {
      e.preventDefault(); // リンクのデフォルト動作（瞬間ジャンプ）を止める

      $("html, body").animate(
        { scrollTop: 0 },  // 一番上まで
        700,               // 時間：600ミリ秒（0.6秒） 好きな速さに変えてOK
        "swing"            // 動きのカーブ（そのままでOK）
      );
    });
  });

  // reason



  /* ===============================
   section-title 左からスライドイン
  ================================ */
  $(function () {
    const $win = $(window);
    const $titles = $('.section-title'); // 全部の.section-titleが対象

    function showTitleOnScroll() {
      const scroll = $win.scrollTop();
      const winH = $win.height();

      $titles.each(function () {
        const $t = $(this);               // 今ループ中の .section-title
        const top = $t.offset().top;

        if (scroll > top - winH * 0.8) {
          $t.find('.en').addClass('is-show');
          $t.find('.ja').addClass('is-show');
        }
      });
    }

    showTitleOnScroll();
    $win.on('scroll', showTitleOnScroll);
  });


  /* ===============================
   trouble_item 左右スライドイン
================================ */
  $(function () {
    const $win = $(window);
    const $items = $('.trouble_item');

    // 左右交互にクラス付ける（左→右→左）
    $items.each(function (i) {
      if (i % 2 === 0) {
        $(this).addClass('left-in');   // 偶数（1,3,5...）→左
      } else {
        $(this).addClass('right-in');  // 奇数（2,4,6...）→右
      }
    });

    function showItemsOnScroll() {
      const scroll = $win.scrollTop();
      const winH = $win.height();

      $items.each(function () {
        const $el = $(this);
        const top = $el.offset().top;

        if (scroll > top - winH * 0.8) {
          $el.addClass('is-show');
        }
      });
    }

    showItemsOnScroll();
    $win.on('scroll', showItemsOnScroll);
  });

  /* ===============================
   reason-item 順番フェードイン
  ================================ */
  $(function () {
    const $win = $(window);
    const $items = $('.reason-item');

    function showReasonItems() {
      const scroll = $win.scrollTop();
      const winH = $win.height();

      $items.each(function (i) {
        const $el = $(this);
        if ($el.hasClass('is-show')) return; // もう表示済みなら何もしない

        const top = $el.offset().top;

        // 画面の8割くらい上に来たら発火
        if (scroll > top - winH * 0.8) {
          setTimeout(function () {
            $el.addClass('is-show');
          }, i * 600); // 0ms → 600ms → 1200ms
        }
      });
    }

    // 読み込み時 & スクロール時にチェック
    showReasonItems();
    $win.on('scroll', showReasonItems);
  });




  /*=================================================
  ハンバーガ―メニュー
  ===================================================*/
  // ハンバーガーメニューをクリックした時
  $(".hamburger").on("click", function () {
    $("header").toggleClass("open");
  });
  // メニューのリンクをクリックした時
 
  $("#nav a").on("click", function () {
    $("header").removeClass("open");
  });


  // $(function () {
  // const originalParent = $("#reserveBtn").parent();  // 元の親を覚えておく

  // $(".hamburger").on("click", function () {
  //   $("header").toggleClass("open");

  //   if ($("header").hasClass("open")) {
  //     // ★ NAVメニューの"下"に移動
  //     $("#nav").after($("#reserveBtn"));
  //   } else {
  //     // ★ メニュー閉じたら元の場所に戻す
  //     originalParent.append($("#reserveBtn"));
  //   }
  // });

  // // メニューのリンククリックで閉じる処理があればそこにも戻す
  // $("#nav a").on("click", function () {
  //   $("header").removeClass("open");
  //   originalParent.append($("#reserveBtn"));
  // });



});

