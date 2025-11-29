$(function () {

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

  // ============================= 
  // スクロールで円を拡大 → detail手前で終了
  // =============================
  $(function () {
    var $circle = $('.scroll-bg');
    var $about = $('#about');
    var $reason = $('#reason');
    var $detail = $('#detail');  // ← ここが id="detail"

    var winH = $(window).height();
    var ticking = false;

    // 必要なセクションがなければ何もしない
    if (!$about.length || !$reason.length || !$detail.length) {
      console.warn('about / reason / detail のいずれかが見つかりません');
      return;
    }

    function updateCircle() {
      ticking = false;

      var scrollTop = $(window).scrollTop();
      var aboutBottom = $about.offset().top + $about.outerHeight();
      var reasonTop = $reason.offset().top;
      var detailTop = $detail.offset().top;

      // ======== PC/SPで円の出現位置を変える ========
      var start;

      if (window.innerWidth < 930) {
        // スマホ → 円が早めに出現
        start = aboutBottom - winH * 0.5;
      } else {
        // PC → 従来通り
        start = aboutBottom - winH * 0.25;
      }


      // ② 円の成長が終わる位置（detail セクションのちょい手前）
      var growEnd = detailTop + 50;

      // ③ 円をフェードアウトさせる位置（detail に入りきるまで）
      var fadeEnd = detailTop + 500;

      // まだ出現前：非表示＆極小
      if (scrollTop <= start) {
        $circle.css({
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0)'
        });
        return;
      }

      var minScale = 0.005; // 出始めほぼ点（10pxぐらい）
      var maxScale = 3.5;   // 画面を覆うくらい

      // ② 成長フェーズ（start〜growEnd）
      if (scrollTop > start && scrollTop <= growEnd) {
        var progress = (scrollTop - start) / (growEnd - start); // 0〜1
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        var scale = minScale + progress * (maxScale - minScale);

        $circle.css({
          opacity: 1,
          transform: 'translate(-50%, -50%) scale(' + scale + ')'
        });
        return;
      }

      // ③ フェードアウトフェーズ（growEnd〜fadeEnd）
      if (scrollTop > growEnd && scrollTop <= fadeEnd) {
        var fadeProgress = (scrollTop - growEnd) / (fadeEnd - growEnd); // 0〜1
        if (fadeProgress < 0) fadeProgress = 0;
        if (fadeProgress > 1) fadeProgress = 1;

        var opacity = 1 - fadeProgress; // 1 → 0 へ

        $circle.css({
          opacity: opacity,
          transform: 'translate(-50%, -50%) scale(' + maxScale + ')' // 大きさはキープ
        });
        return;
      }

      // ④ fadeEnd を過ぎたら完全に消す
      if (scrollTop > fadeEnd) {
        $circle.css({
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(' + maxScale + ')'
        });
        return;
      }
    }

    $(window).on('scroll resize', function () {
      winH = $(window).height();
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateCircle);
      }
    });

    updateCircle();
  });






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
          slidesToShow: 1,
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

