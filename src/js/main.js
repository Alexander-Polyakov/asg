$(document).ready(function() {
    var carouselGallery = $(".js-carousel-gallery");
    if ($(window).outerWidth() < 768) {
        carouselGallery.owlCarousel({
            dots: false,
            nav: false,
            margin: 15,
            responsive:{
                0:{
                    items: 1,
                    nav: true
                },
                500:{
                    items: 2,
                    nav: true
                }
            }
        });
    }



    var sync1 = $(".js-full-slider");
    var sync2 = $(".js-carousel");
    var slidesPerPage = 4;
    var syncedSecondary = true;

    sync1.owlCarousel({
        items : 1,
        slideSpeed : 2000,
        nav: false,
        dots: false,
        loop: true,
        responsiveRefreshRate : 200,
        responsive:{
            0:{
                nav: true
            },
            992:{
                nav: false
            }
        }
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items : 5,
            dots: true,
            margin: 15,
            nav: true,
            smartSpeed: 200,
            slideSpeed : 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate : 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count-1;
        var current = Math.round(el.item.index - (el.item.count/2) - .5);

        if(current < 0) {
            current = count;
        }
        if(current > count) {
            current = 0;
        }

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if(syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });









    $('.js-objects-popup-toggle').click(function(){
        var thisBlock = $(this).closest('.objects'),
            ofl = $(this).offset().left;

        if ($(window).outerWidth() > 992) {
            thisBlock.find('.objects__popup').css('width', ofl + 270);
        } else {
            thisBlock.find('.objects__popup').stop().slideToggle(400);
        }

        thisBlock.toggleClass('popup-opened');
    });

    $('.js-page-menu-open').click(function () {
        $('.js-page-menu').addClass("opened");
    });


    $('.js-page-menu-close').click(function () {
        $('.js-page-menu').removeClass("opened");
    });

    $(".js-dropmenu-toggle").click(function (e) {
        e.preventDefault();
        $(this).closest(".js-dropmenu").toggleClass('opened');
        $(this).closest(".js-dropmenu").find(".main-nav-item__dropmenu").slideToggle('400');
    });


    $("[data-fancybox]").fancybox({
        buttons: [
            'close'
        ]
    });

    $(".js-slider-button").click(function () {
        var itemNumber = $(this).data('item'),
            textTitle = $(this).text();

        $('.js-slider-title').text(textTitle);
        $(".js-slider-button").removeClass('active');
        $('.js-slider-item').removeClass('active');
        $('.js-slider-item[data-item="' + itemNumber + '"]').addClass("active");
        $(this).addClass("active");
    });

    $('.js-nav-grid-toggle').click(function () {
       $(this).closest(".section-grid-nav").addClass('opened');
    });

    $('.js-nav-grid-close').click(function () {
        $(this).closest(".section-grid-nav").removeClass('opened');
    });

    $(".grid-nav-item__toggle").click(function(){
        $(this).closest(".grid-nav-item").find('.grid-nav-item__dropbox').slideToggle(400);
        $(this).toggleClass('active');
    });

    ///slider
    var $slides = void 0,
        interval = void 0,
        $selectors = void 0,
        $btns = void 0,
        currentIndex = void 0,
        nextIndex = void 0;

    var cycle = function cycle(index) {
        var $currentSlide = void 0,
            $nextSlide = void 0,
            $currentSelector = void 0,
            $nextSelector = void 0;

        nextIndex = index !== undefined ? index : nextIndex;

        $currentSlide = $($slides.get(currentIndex));
        $currentSelector = $($selectors.get(currentIndex));

        $nextSlide = $($slides.get(nextIndex));
        $nextSelector = $($selectors.get(nextIndex));

        $currentSlide.removeClass("active").css("z-index", "0");

        $nextSlide.addClass("active").css("z-index", "1");

        $currentSelector.removeClass("current");
        $nextSelector.addClass("current");

        currentIndex = index !== undefined ? nextIndex : currentIndex < $slides.length - 1 ? currentIndex + 1 : 0;

        nextIndex = currentIndex + 1 < $slides.length ? currentIndex + 1 : 0;
    };

    $(function () {
        currentIndex = 0;
        nextIndex = 1;

        $slides = $(".slide");
        $selectors = $(".selector");
        $btns = $(".btn");

        $slides.first().addClass("active");
        $selectors.first().addClass("current");

        interval = window.setInterval(cycle, 6000);

        $selectors.on("click", function (e) {
            var target = $selectors.index(e.target);
            if (target !== currentIndex) {
                window.clearInterval(interval);
                cycle(target);
                interval = window.setInterval(cycle, 6000);
            }
        });

        $btns.on("click", function (e) {
            window.clearInterval(interval);
            if ($(e.target).hasClass("prev")) {
                var target = currentIndex > 0 ? currentIndex - 1 : $slides.length - 1;
                cycle(target);
            } else if ($(e.target).hasClass("next")) {
                cycle();
            }
            interval = window.setInterval(cycle, 6000);
        });
    });
});