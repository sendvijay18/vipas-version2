(function ($) {
    "use strict";

    /*===============================
    =         Wow Active            =
    ================================*/

    new WOW().init();

    /*=============================================
    =       Menu sticky & Scroll to top          =
    =============================================*/
    var windows = $(window);
    var screenSize = windows.width();
    var sticky = $('.header-sticky');
    var $html = $('html');
    var $body = $('body');

    windows.on('scroll', function () {
        var scroll = windows.scrollTop();
        var headerHeight = sticky.height();

        if (screenSize >= 320) {
            if (scroll < headerHeight) {
                sticky.removeClass('is-sticky');
            } else {
                sticky.addClass('is-sticky');
            }
        }

    });
    /*----------  Scroll to top  ----------*/
    function scrollToTop() {
        var $scrollUp = $('#scroll-top'),
            $lastScrollTop = 0,
            $window = $(window);

        $window.on('scroll', function () {
            var st = $(this).scrollTop();
            if (st > $lastScrollTop) {
                $scrollUp.removeClass('show');
            } else {
                if ($window.scrollTop() > 200) {
                    $scrollUp.addClass('show');
                } else {
                    $scrollUp.removeClass('show');
                }
            }
            $lastScrollTop = st;
        });

        $scrollUp.on('click', function (evt) {
            $('html, body').animate({
                scrollTop: 0
            }, 600);
            evt.preventDefault();
        });
    }
    scrollToTop();

    /*=========================================
    =            Preloader active            =
    ===========================================*/

    windows.on('load', function () {
        $(".preloader-activate").removeClass('preloader-active');
    });


    jQuery(window).on('load', function () {
        setTimeout(function () {
            jQuery('.open_tm_preloader').addClass('loaded');
        }, 100);
    });

    /*===========================================
    =            Submenu viewport position      =
    =============================================*/

    if ($(".has-children--multilevel-submenu").find('.submenu').length) {
        var elm = $(".has-children--multilevel-submenu").find('.submenu');

        elm.each(function () {
            var off = $(this).offset();
            var l = off.left;
            var w = $(this).width();
            var docH = windows.height();
            var docW = windows.width() - 10;
            var isEntirelyVisible = (l + w <= docW);

            if (!isEntirelyVisible) {
                $(this).addClass('left');
            }
        });
    }
    /*==========================================
    =            mobile menu active            =
    ============================================*/

    $("#mobile-menu-trigger").on('click', function () {
        $("#mobile-menu-overlay").addClass("active");
        $body.addClass('no-overflow');
    });

    $("#mobile-menu-close-trigger").on('click', function () {
        $("#mobile-menu-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });

    $(".offcanvas-navigation--onepage ul li a").on('click', function () {
        $("#mobile-menu-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });

    /*Close When Click Outside*/
    $body.on('click', function (e) {
        var $target = e.target;
        if (!$($target).is('.mobile-menu-overlay__inner') && !$($target).parents().is('.mobile-menu-overlay__inner') && !$($target).is('#mobile-menu-trigger') && !$($target).is('#mobile-menu-trigger i')) {
            $("#mobile-menu-overlay").removeClass("active");
            $body.removeClass('no-overflow');
        }
        if (!$($target).is('.search-overlay__inner') && !$($target).parents().is('.search-overlay__inner') && !$($target).is('#search-overlay-trigger') && !$($target).is('#search-overlay-trigger i')) {
            $("#search-overlay").removeClass("active");
            $body.removeClass('no-overflow');
        }
    });


    /*===================================
    =           Menu Activeion          =
    ===================================*/
    var cururl = window.location.pathname;
    var curpage = cururl.substr(cururl.lastIndexOf('/') + 1);
    var hash = window.location.hash.substr(1);
    if ((curpage == "" || curpage == "/" || curpage == "admin") && hash == "") {
        //$("nav .navbar-nav > li:first-child").addClass("active");
    } else {
        $(".navigation-menu li").each(function () {
            $(this).removeClass("active");
        });
        if (hash != "")
            $(".navigation-menu li a[href*='" + hash + "']").parents("li").addClass("active");
        else
            $(".navigation-menu li a[href*='" + curpage + "']").parents("li").addClass("active");
    }


    /*=========================================
    =             open menu Active            =
    ===========================================*/
    $('.share-icon').on('click', function (e) {
        e.preventDefault();
        $('.entry-post-share').toggleClass('opened');
    });

    $body.on("click", function () {
        $(".entry-post-share").removeClass('opened');
    });
    // Prevent closing dropdown upon clicking inside the dropdown
    $(".entry-post-share").on("click", function (e) {
        e.stopPropagation();
    });

    /*=============================================
    =            offcanvas mobile menu            =
    =============================================*/
    var $offCanvasNav = $('.offcanvas-navigation'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function (e) {
        var $this = $(this);
        if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length) {
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });

    /*==================================
    =	      Mesonry Activation       =
    ===================================*/

    $('.masonry-activation').imagesLoaded(function () {
        // init Isotope
        var $grid = $('.masonry-wrap').isotope({
            itemSelector: '.masonary-item',
            percentPosition: true,
            transitionDuration: '0.7s',
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: 2,
                percentPosition: true
            }
        });

    });

    /*=====  End of wavify activation  ======*/

    $(document).ready(function () {

        /*=============================================
        =            swiper slider activation            =
        =============================================*/

        var brandLogoSlider = new Swiper('.brand-logo-slider__container', {
            slidesPerView: 6,
            loop: true,
            speed: 1000,
            spaceBetween: 30,
            autoplay: {
                delay: 3000,
            },

            breakpoints: {

                // when window width is >= 320px
        375: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          599: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          // when window width is >= 480px
          769: {
            slidesPerView: 4,
            spaceBetween: 30
          },
          // when window width is >= 640px
          991: {
            slidesPerView: 4,
            spaceBetween: 40
          }

            }
        });

var swiper = new Swiper('.mySwiper', {
    slidesPerView: 3,
    loop: false,
    speed: 1000,
    spaceBetween: 30,
    autoplay: {
        delay: 3000,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        599: {
            slidesPerView: 1,
            spaceBetween: 20
          },
        // when window width is >= 480px
        769: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 40
          },
        // when window width is >= 480px
        1155: {
            slidesPerView: 2,
            spaceBetween: 30
            },
        // when window width is >= 640px

      }
});

        /*=====  End of swiper slider activation  ======*/
    });

    /*=============================================
    =            counter up active            =
    =============================================*/

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    $('.video-popup').lightGallery();
    /*=============================================
    =            reveal footer active            =
    =============================================*/

    var revealId = $(".reveal-footer"),
        heightFooter = revealId.outerHeight(),
        windowWidth = $(window).width() 

})(jQuery);
