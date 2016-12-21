;
(function () {

    $('div.single_work_bg').each(function () {
        $(this).css('background-image', 'url(' + $(this).parent().find('.single_work_bg_img img').attr('src') + ')');
    })

    $('.best_works_footer .single_work').on('mouseenter', function () {
        $(this).find('.single_work_hover').addClass('active');
    })

    $('.best_works_footer .single_work').on('mouseleave', function () {
        $(this).find('.single_work_hover').removeClass('active');
    })



    var screen_index = 0;
    //best_works_pagination

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

    function showPictures(index) {
        
        $('.single_work:eq('+ index+ ')').find('.single_work_picture .left_image').delay(600).animate({
            opacity:1
            
        })
           $('.single_work:eq('+ index + ')').find('.single_work_picture .right_image').delay(1200).animate({
            opacity:1
            
        })
        /*
    
        setTimeout(function () {
            document.querySelectorAll('.single_work')[index].querySelector('.single_work_picture .left_image').classList.add('active');
        }, 600)

        setTimeout(function () {
            document.querySelectorAll('.single_work')[index].querySelector('.single_work_picture .right_image').classList.add('active');
        }, 1200)*/


    }
    showPictures(0)


    function setDefaultActive() {
        $('.best_works_pagination').find('.nav_item:first-of-type').addClass('active');
    }
    setDefaultActive()


    $('.nav_item').on('click', function () {
        $('.nav_item').removeClass('active');
        $(this).addClass('active');
        screen_index = $(this).attr('data-slide-num');
        translatePage(screen_index);

    })


    function translatePage(slide_num) {
        $('.main_wrapper').animate({            
           top: -slide_num + '00%' 
        }, 700);
        showPictures(slide_num);


    }


    $('.best_works_pagination .arrow_top').on('click', function () {
        if (screen_index > 0) {
            $('.nav_item').removeClass('active');
            screen_index--;
            $('.nav_item[data-slide-num="' + screen_index + '"]').addClass('active');
            translatePage(screen_index);
        }
    })


    $('.best_works_pagination .arrow_bottom').on('click', function () {
        if (screen_index < Settings.total_slide_amount) {
            $('.nav_item').removeClass('active');
            screen_index++;
            $('.nav_item[data-slide-num="' + screen_index + '"]').addClass('active');
            translatePage(screen_index);
        }
    })




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
        var direction = ScrollDirection.defineScrollDirection(e);
        if (direction == 'down' && screen_index < Settings.total_slide_amount) {
            $('.nav_item').removeClass('active');
            screen_index++;
            $('.nav_item[data-slide-num="' + screen_index + '"]').addClass('active');
            translatePage(screen_index);

        } else if (direction == 'up' && screen_index > 0) {
            $('.nav_item').removeClass('active');
            screen_index--;
            $('.nav_item[data-slide-num="' + screen_index + '"]').addClass('active');
            translatePage(screen_index);

        }


    }









    var ScrollDirection = {

        getKeyCode: function (e) {
            if (e.keyCode == 40) {
                return 'down'
            } else if (e.keyCode == 38) {
                return 'up'
            }
        },

        getTouchCoord: function (e) {
            return e.touches[0].clientY
        },

        getSwipeDirection: function (e) {
            if (e.type == 'touchstart') {
                this.firstCoord = this.getTouchCoord(e);
                this.lastCoord = NaN;
            } else if (e.type == 'touchmove') {
                this.lastCoord = this.getTouchCoord(e);
            } else {
                if (this.lastCoord - this.firstCoord > GlobalVariables.touch_sensitivity) {
                    return 'up';
                } else if (this.lastCoord - this.firstCoord < -GlobalVariables.touch_sensitivity) {
                    return 'down';
                }
            }

        },

        getWheelDirection: function (e) {
            if (e.deltaY > 0) {
                return 'down'
            } else if (e.deltaY < 0) {
                return 'up'
            }
        },

        defineScrollDirection: function (e) {
            if (e.type == "keydown") {
                return this.getKeyCode(e);
            } else if (e.type == "touchstart" || e.type == "touchmove" || e.type == "touchend") {
                return this.getSwipeDirection(e);
            } else if (e.type == "wheel") {
                return this.getWheelDirection(e);
            }
        },

    }




    // Show/hide footer on header in button click

    document.querySelector('#cont_btn').addEventListener('click', function (e) {
        e.preventDefault();
        $('footer').addClass('active');
    })

    document.querySelector('.footer_close').addEventListener('click', function () {
        $('footer').removeClass('active');
    })






    if (window.innerWidth / window.innerHeight <= aspect_ratio) {
        function getHeaderHeight() {
            return header.offsetHeight;
        }

        /**
         * total page height
         * @returns {num} [page_height]
         */
        function calcPageHeight() {
            if (header) {
                var total = 0;
                for (var i = 0; i < document.body.children.length; i++) {
                    total += document.body.children[i].offsetHeight;
                }
                total -= getHeaderHeight();
                return total;
            }
        }



        window.addEventListener('scroll', changeHeaderColor);
        /**
         * change color of fixed nav block when scrolled under nth px
         */
        var header = document.querySelector('header');

        function changeHeaderColor() {
            if (header) {
                if (window.pageYOffset > 0) {
                    header.getElementsByClassName('header_bg')[0].style.opacity = "0.9";

                } else {
                    header.getElementsByClassName('header_bg')[0].style.opacity = "0";

                }
            }
        }


    }




})();


$('.other_works').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
});