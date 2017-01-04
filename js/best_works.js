function activateBestWorksPage() {

    'use strict';

    if ($('.best_works_screen').length > 0) {

        $('div.single_work_bg').each(function () {
            $(this).css('background-image', 'url(' + $(this).parent().find('.single_work_bg_img img').attr('src') + ')');
        })

        $('.best_works_footer .single_work').on('mouseenter', function () {
            if (device.desktop()) {
                $(this).find('.single_work_hover').addClass('active');
            }
        })

        $('.best_works_footer .single_work').on('mouseleave', function () {
            $(this).find('.single_work_hover').removeClass('active');
        })

        $('.best_works_footer .single_work').on('click', function () {
            if (device.tablet()) {
                $(location).attr('href', $(this).find('.single_work_link a').attr('href'));
            }
        })

        $('.other_works').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true,
        });
    }
}

activateBestWorksPage();




function showOnThinScreens() {
    if (window.innerWidth / window.innerHeight <= aspect_ratio && $('.best_works_screen').length > 0) {



        if ($('.best_works_pagination').find('.nav_item').length > 0) {
            $('.best_works_pagination').find('.nav_item').remove();
        }

        var showing_elems = ".single_work_description, .single_work_bg, .best_works_footer";
        $('.best_works_screen').addClass('active');
        $('.best_works_screen').addClass('active');
        $('.best_works_screen').find(showing_elems).css('opacity', '1');
        $('.best_works_screen').find('.single_work_picture .right_image, .single_work_picture .left_image').addClass('active');

    }

}

showOnThinScreens();
window.addEventListener('resize', showOnThinScreens);



function showOnWideScreens() {
    if (window.innerWidth / window.innerHeight > aspect_ratio && $('.best_works_screen').length > 0) {
        fixBodyForSafari()
        var showing_elems = ".single_work_description, .single_work_bg, .best_works_footer";
        $('.best_works_screen:last-of-type').addClass('active');
        $('.best_works_screen:last-of-type').css('visibility', 'hidden');
        $('.best_works_screen:first-of-type').addClass('active');
        $('.best_works_screen:first-of-type').find(showing_elems).css('opacity', '1');
        $('.best_works_screen:first-of-type').find('.single_work_picture .right_image, .single_work_picture .left_image').addClass('active');



        var mark = true;

        var screen_index = 0;


        var Settings = {
            total_slide_amount: $('section.single_work').length,
        }


        function createNav() {
            for (var i = 0; i <= Settings.total_slide_amount; i++) {
                var new_elem = document.createElement('li');
                new_elem.className = 'nav_item';
                new_elem.setAttribute('data-slide-num', i);
                $('.best_works_pagination').find('ul').append(new_elem);
            }
        };

        createNav()




        function setDefaultActive() {
            $('.best_works_pagination').find('.nav_item:first-of-type').addClass('active');
        }
        setDefaultActive()



        function showPageContent(index) {
            $('.best_works_screen:last-of-type').css('visibility', 'visible');
            hidePagePictures();
            $('.best_works_screen:eq(' + index + ')').addClass('active');
            setTimeout(function () {
                $('.best_works_screen:not(:eq(' + index + '))').find(showing_elems).animate({
                    opacity: 0
                })
                $('.best_works_screen:eq(' + index + ')').find(showing_elems).animate({
                        opacity: 1
                    },
                    showPagePictures.bind($('.best_works_screen:eq(' + index + ')'))
                )
            }, 1)

            setTimeout(
                function () {
                    $('.best_works_screen:not(:eq(' + index + '))').removeClass('active');
                    console.log($('.best_works_screen:not(:eq(' + index + '))'))
                },
                500);
        }







        function showPagePictures() {
            $(this).find('.single_work_picture .right_image, .single_work_picture .left_image').addClass('active');
        }

        function hidePagePictures() {
            $('.single_work_picture .right_image, .single_work_picture .left_image').removeClass('active');
        }


        function addScrollListeners(funcName) {
            var listeners = ['wheel', 'keydown', 'touchstart', 'touchmove', 'touchend'];
            for (var i = 0; i < listeners.length; i++) {
                window.addEventListener(listeners[i], function (e) {
                    funcName(e);
                })
            }
        };

        addScrollListeners(pageScroll)


        function pageScroll(e) {
            if (mark) {
                mark = false;
                var direction = ScrollDirection.defineScrollDirection(e);
                if (direction == 'down' && screen_index < Settings.total_slide_amount) {
                    $('.nav_item').removeClass('active');
                    screen_index++;
                    $('.nav_item[data-slide-num="' + screen_index + '"]').addClass('active');
                    showPageContent(screen_index)
                } else if (direction == 'up' && screen_index > 0) {
                    $('.nav_item').removeClass('active');
                    screen_index--;
                    $('.nav_item[data-slide-num="' + screen_index + '"]').addClass('active');
                    showPageContent(screen_index)
                }
                activateMark()
            }
        }


        $('.nav_item').on('click', function () {
            if (mark) {
                mark = false;
                $('.nav_item').removeClass('active');
                $(this).addClass('active');
                screen_index = $(this).attr('data-slide-num');
                showPageContent(screen_index);
                activateMark()
            }
        })



        $('.best_works_pagination .arrow_top').on('click', function () {
            if (mark) {
                mark = false;
                if (screen_index > 0) {
                    $('.nav_item').removeClass('active');
                    screen_index--;
                    $('.nav_item[data-slide-num="' + screen_index + '"]').addClass('active');
                    showPageContent(screen_index)

                }
                activateMark()
            }
        })


        $('.best_works_pagination .arrow_bottom').on('click', function () {
            if (mark) {
                mark = false;
                if (screen_index < Settings.total_slide_amount) {
                    $('.nav_item').removeClass('active');
                    screen_index++;
                    $('.nav_item[data-slide-num="' + screen_index + '"]').addClass('active');
                    showPageContent(screen_index)
                }
                activateMark()
            }
        })



        function activateMark() {
            setTimeout(function () {
                mark = true

            }, 1000)
        }

    }
}

showOnWideScreens();
//window.addEventListener('resize', showOnWideScreens);