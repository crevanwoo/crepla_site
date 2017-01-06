function showIndexPageSaparately() {

    /* INDEX PAGE ON WIDE SCREEN*/


    'use strict';


    if (window.innerWidth / window.innerHeight > aspect_ratio && document.querySelector('.work_directions')) {

        fixBodyForSafari();

        var GlobalVariables = {
            transition_time: "700",
            screen_num: 1,
            scroll_mark: true,
            touch_sensitivity: 30,

        }

        var screen_effect = {
            scr1: "0",
            scr2: "-100%",
            scr3: "-200%",
            scr4: "-300%",
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



        function addTransitionTime(selector) {
            for (var i = 0; i < arguments.length; i++) {
                if (document.querySelector(arguments[i])) {
                    document.querySelector(arguments[i]).style.transition = GlobalVariables.transition_time + "ms";
                }
            }
        }

        addTransitionTime('.main_wrapper',
            '.single_work:nth-of-type(1)',
            '.single_work:nth-of-type(1) >div:nth-of-type(1)',
            '.single_work:nth-of-type(1) >div:nth-of-type(2)',
            '.single_work:nth-of-type(2)',
            '.single_work:nth-of-type(3)',
            '.single_work:nth-of-type(4)',
            '.single_work:nth-of-type(5) >div:nth-of-type(1)',
            '.single_work:nth-of-type(5) >div:nth-of-type(2)',
            '.single_work:nth-of-type(6)');




        function pageScroll(e) {
            var direction = ScrollDirection.defineScrollDirection(e);
            if (direction == 'down') {
                if (GlobalVariables.scroll_mark) {
                    GlobalVariables.scroll_mark = false;
                    translateBody('down');
                    if (!GlobalVariables.screen_num == 2) {
                        setSecurityTrigger(GlobalVariables.transition_time)
                    } else {
                        setSecurityTrigger(GlobalVariables.transition_time)
                    }
                }
            } else if (direction == 'up' && GlobalVariables.screen_num > 1) {
                if (GlobalVariables.scroll_mark) {
                    GlobalVariables.scroll_mark = false;
                    translateBody('up');
                    if (!GlobalVariables.screen_num == 3) {
                        setSecurityTrigger(GlobalVariables.transition_time)
                    } else {
                        setSecurityTrigger(GlobalVariables.transition_time * 2)
                    }
                }
            }
        }



        function setSecurityTrigger(time) {
            setTimeout(function () {
                GlobalVariables.scroll_mark = true;
            }, time)
        }






        // Вспомогательные 

        function displayOn(selector) {
            for (var i = 0; i < arguments.length; i++) {
                document.querySelector(arguments[i]).style.display = "block"
            }

        }

        function displayOff(is_transit, transit_time, selector) {
            var time = transit_time || GlobalVariables.transition_time;

            function dOff() {
                for (var i = 2; i < arguments.length; i++) {
                    document.querySelector(arguments[i]).style.display = "none"
                }
            }
            var args = arguments;

            if (is_transit) {
                setTimeout(function () {
                    dOff.apply(null, args)
                }, time)
            } else {
                dOff.apply(null, arguments)
            }
        }

        function translateFullScreen(coord) {
            return document.querySelector('.main_wrapper').style.top = coord;
        }

        function addClass(classSelector, selector) {
            for (var i = 1; i < arguments.length; i++) {
                document.querySelector(arguments[i]).classList.add(classSelector);
            }
        }

        function removeClass(classSelector, selector) {
            for (var i = 1; i < arguments.length; i++) {
                document.querySelector(arguments[i]).classList.remove(classSelector);
            }
        }

        function setHeight(selector) {
            document.querySelector(selector).style.height = getHeight(selector) + 'px';
        }

        function getHeight(selector) {
            return document.querySelector(selector).offsetHeight
        }



        function removeAllClassesFromPortfolio() {
            var work = document.querySelectorAll('.single_work');
            for (var i = 1; i <= work.length; i++) {
                displayOff(true, false, '.single_work:nth-of-type(' + i + ')')
            }

            removeClass('active',
                '.single_work:nth-of-type(1) >div:nth-of-type(1)',
                '.single_work:nth-of-type(1) >div:nth-of-type(2)',
                '.single_work:nth-of-type(2)',
                '.single_work:nth-of-type(3)',
                '.single_work:nth-of-type(4)',
                '.single_work:nth-of-type(5) >div:nth-of-type(1)',
                '.single_work:nth-of-type(5) >div:nth-of-type(2)',
                '.single_work:nth-of-type(6)'
            );

            removeClass('remove',
                '.single_work:nth-of-type(1)',
                '.single_work:nth-of-type(2)',
                '.single_work:nth-of-type(3)',
                '.single_work:nth-of-type(4)',
                '.single_work:nth-of-type(5) >div:nth-of-type(2)');

        }




        function translateBody(direction) {


            if (direction == "down") {

                switch (GlobalVariables.screen_num) {

                    case 1:

                        translateFullScreen(screen_effect.scr2);

                        showUnderlinePlanets();

                        GlobalVariables.screen_num++;

                        break;

                    case 2:

                        translateFullScreen(screen_effect.scr3);

                        displayOn('.single_work:nth-of-type(1)',
                            '.single_work:nth-of-type(2)',
                            '.single_work:nth-of-type(3)',
                            '.single_work:nth-of-type(4)');

                        setTimeout(function () {
                            addClass('active',
                                '.scroll_mouse',
                                '.single_work:nth-of-type(1) >div:nth-of-type(1)',
                                '.single_work:nth-of-type(1) >div:nth-of-type(2)');

                        }, GlobalVariables.transition_time);

                        setTimeout(function () {
                            displayOn('.single_work:nth-of-type(1) .hover_logo');

                        }, GlobalVariables.transition_time * 2);

                        GlobalVariables.screen_num++;
                        break;

                    case 3:
                        addClass('active',
                            '.single_work:nth-of-type(2)');

                        GlobalVariables.screen_num++;
                        break;

                    case 4:
                        addClass('active',
                            '.single_work:nth-of-type(3)');

                        GlobalVariables.screen_num++;
                        break;

                    case 5:

                        addClass('remove',
                            '.single_work:nth-of-type(1)',
                            '.single_work:nth-of-type(2)',
                            '.single_work:nth-of-type(3)');

                        addClass('active',
                            '.single_work:nth-of-type(4)');

                        displayOn('.single_work:nth-of-type(5)',
                            '.single_work:nth-of-type(6)');

                        displayOff(false,
                            false,
                            '.single_work:nth-of-type(5) .hover_logo',
                            '.single_work:nth-of-type(1) .hover_logo');

                        GlobalVariables.screen_num++;
                        break;

                    case 6:
                        addClass('remove',
                            '.single_work:nth-of-type(4)');

                        addClass('active',
                            '.single_work:nth-of-type(5) >div:nth-of-type(2)',
                            '.single_work:nth-of-type(5) >div:nth-of-type(1)');


                        displayOff(true,
                            false,
                            '.single_work:nth-of-type(1)',
                            '.single_work:nth-of-type(2)',
                            '.single_work:nth-of-type(3)');

                        displayOn('.single_work:nth-of-type(5) .hover_logo');

                        GlobalVariables.screen_num++;
                        break;

                    case 7:
                        addClass('remove',
                            '.single_work:nth-of-type(5) >div:nth-of-type(2)');

                        addClass('active',
                            '.single_work:nth-of-type(6)',
                            '.single_work_full_bg',
                            '.works_arrows_wrapper',
                            'section.performed_works .main_h');

                        removeClass('active',
                            '.single_work:nth-of-type(5) >div:nth-of-type(1)');

                        displayOff(false,
                            false,
                            '.single_work:nth-of-type(5) .hover_logo');

                        manageNavArrows();

                        GlobalVariables.screen_num++;
                        break;

                    case 8:
                        translateFullScreen(screen_effect.scr4);

                        setHeight('.scroll_container_wrapper .scroll_block');

                        addClass('remove', '.scroll_mouse');

                        removeClass('active', '.single_work_full_bg',
                            '.works_arrows_wrapper',
                            'section.performed_works .main_h');

                        GlobalVariables.screen_num++;
                        break;

                    case 9:
                        document.querySelector('.scroll_marker').value = "true";
                        if (document.querySelector('.scroll_position').value == "end") {
                            addClass('active', 'footer');
                        }
                        break;



                }
            } else if (direction == "up") {

                switch (GlobalVariables.screen_num) {

                    case 1:
                        break;

                    case 2:
                        translateFullScreen(screen_effect.scr1);

                        GlobalVariables.screen_num--;
                        break;

                    case 3:
                        removeClass('active',
                            '.scroll_mouse',
                            '.single_work:nth-of-type(1) >div:nth-of-type(1)',
                            '.single_work:nth-of-type(1) >div:nth-of-type(2)')

                        displayOff(true,
                            false,
                            '.single_work:nth-of-type(1)',
                            '.single_work:nth-of-type(2)',
                            '.single_work:nth-of-type(3)',
                            '.single_work:nth-of-type(4)');

                        setTimeout(function () {
                            translateFullScreen(screen_effect.scr2);

                        }, GlobalVariables.transition_time)

                        showUnderlinePlanets();

                        displayOff(false,
                            false,
                            '.single_work:nth-of-type(1) .hover_logo');

                        GlobalVariables.screen_num--;
                        break;

                    case 4:
                        removeClass('active',
                            '.single_work:nth-of-type(2)');

                        GlobalVariables.screen_num--;
                        break;

                    case 5:

                        removeClass('active', '.single_work:nth-of-type(3)');

                        GlobalVariables.screen_num--;
                        break;

                    case 6:
                        removeClass('remove', '.single_work:nth-of-type(1)',
                            '.single_work:nth-of-type(2)',
                            '.single_work:nth-of-type(3)');

                        removeClass('active', '.single_work:nth-of-type(4)');

                        displayOff(true, false,
                            '.single_work:nth-of-type(5)',
                            '.single_work:nth-of-type(6)');

                        displayOn('.single_work:nth-of-type(1) .hover_logo');

                        GlobalVariables.screen_num--;
                        break;

                    case 7:
                        removeClass('remove',
                            '.single_work:nth-of-type(4)');

                        removeClass('active',
                            '.single_work:nth-of-type(5) >div:nth-of-type(2)',
                            '.single_work:nth-of-type(5) >div:nth-of-type(1)');

                        displayOn('.single_work:nth-of-type(1)',
                            '.single_work:nth-of-type(2)',
                            '.single_work:nth-of-type(3)');

                        displayOff(false,
                            false,
                            '.single_work:nth-of-type(5) .hover_logo');


                        GlobalVariables.screen_num--;
                        break;

                    case 8:
                        removeClass('remove',
                            '.single_work:nth-of-type(5) >div:nth-of-type(2)');

                        removeClass('active',
                            '.single_work:nth-of-type(6)',
                            '.single_work_full_bg',
                            '.works_arrows_wrapper',
                            'section.performed_works .main_h');

                        addClass('active',
                            '.single_work:nth-of-type(5) >div:nth-of-type(1)');

                        displayOn('.single_work:nth-of-type(5) .hover_logo');

                        GlobalVariables.screen_num--
                            break;

                    case 9:
                        document.querySelector('.scroll_marker').value = "";

                        if (document.querySelector('footer').classList.contains('active')) {

                            removeClass('active', 'footer');

                        } else if (document.querySelector('.scroll_container').style.transform == "translateY(0px)") {
                            document.querySelector('.scroll_marker').value = "";

                            translateFullScreen(screen_effect.scr3);

                            displayOn('.single_work:nth-of-type(5)',
                                '.single_work:nth-of-type(6)');

                            addClass('active',
                                '.single_work_full_bg',
                                '.works_arrows_wrapper',
                                'section.performed_works .main_h');

                            GlobalVariables.screen_num--;
                        } else {

                            document.querySelector('.scroll_marker').value = "true";
                        }

                        break;



                }
            }


        }









        /* PORT ARROWS > */

        function createNavArrows(inner_name, outer_name) {
            inner_name = $("<div>").addClass(inner_name);
            $(outer_name).append(inner_name);

        }

        createNavArrows('works_arrows_wrapper', 'section.performed_works');

        createNavArrows('up_arrow', '.works_arrows_wrapper');

        createNavArrows('down_arrow', '.works_arrows_wrapper');





        function manageNavArrows() {

            $('.works_arrows_wrapper').css('display', 'block');

            $('.works_arrows_wrapper .up_arrow').on('click', function () {
                if (GlobalVariables.screen_num > 2 && GlobalVariables.screen_num < 9) {
                    GlobalVariables.screen_num = 3;
                    translateBody('up');
                    removeAllClassesFromPortfolio();
                    removeClass('active',
                        '.single_work_full_bg',
                        '.works_arrows_wrapper',
                        'section.performed_works .main_h');
                }
            });

            $('.works_arrows_wrapper .down_arrow').on('click', function () {

                GlobalVariables.screen_num = 8;

                translateBody('down');

                addClass('active',
                    '.single_work:nth-of-type(1) >div:nth-of-type(1)',
                    '.single_work:nth-of-type(1) >div:nth-of-type(2)',
                    '.single_work:nth-of-type(2)',
                    '.single_work:nth-of-type(3)',
                    '.single_work:nth-of-type(4)',
                    '.single_work:nth-of-type(5) >div:nth-of-type(2)',
                    '.single_work:nth-of-type(6)');

                addClass('remove',
                    '.single_work:nth-of-type(1)',
                    '.single_work:nth-of-type(2)',
                    '.single_work:nth-of-type(3)',
                    '.single_work:nth-of-type(4)',
                    '.single_work:nth-of-type(5) >div:nth-of-type(2)');

                removeClass('active',
                    '.single_work:nth-of-type(5) >div:nth-of-type(1)',
                    '.single_work_full_bg',
                    '.works_arrows_wrapper',
                    'section.performed_works .main_h');

            });

        }


        /* < PORT ARROWS */









        /* DEFAULT SETTINGS > */


        document.querySelector('.scroll_container').style.transform = "translateY(0px)";


        /* < DEFAULT SETTINGS */









        /* --------- --------- ---------  UNDERLINES > --------- --------- --------- */


        // last work
        $('.single_work:nth-of-type(6)').on('mouseenter', function () {
            $(this).find('div').addClass('active');
        })


        $('.single_work:nth-of-type(6)').on('mouseleave', function () {
            $(this).find('div').removeClass('active');
        })



        // headers
        var scroll_container_height = document.querySelector('.scroll_container').offsetHeight,
            window_height = window.innerHeight;


        function showRedLine() {
            var scrolled_distance_str = document.querySelector('.scroll_container').style.transform,
                scrolled_distance_num = parseInt(scrolled_distance_str.slice(scrolled_distance_str.indexOf('(') + 1)) * -1;
            if (GlobalVariables.screen_num == 3) {
                setTimeout(function () {
                    setUnderline('section.performed_works .main_h .thin_red_line', "100rem")
                }, GlobalVariables.transition_time)


            } else if (GlobalVariables.screen_num == 9) {
                //console.log(scrolled_distance_num + '' + scroll_container_height);

                if (scrolled_distance_num > 0) {
                    setUnderline('section.review .main_h .thin_red_line', "100rem")


                }
                if (scrolled_distance_num > scroll_container_height * 2 / 5) {
                    setUnderline('section.team .main_h .thin_red_line', "100rem")
                }


            }
        }


        function setUnderline(selector, size) {
            return document.querySelector(selector).style.width = size;


        }


        addScrollListeners(showRedLine);






        //planets
        var long_line = $('section.work_directions .lines .direct_line'),
            skew_line = long_line.find('.skew_line'),
            _1_circle = long_line.find('.first_circle'),
            _2_circle = long_line.find('.second_circle'),
            _3_circle = long_line.find('.third_circle');


        function hideUnderlinePlanets() {
            long_line.css('width', '0');
            skew_line.css('width', '0');
            _1_circle.css('opacity', '0');
            _2_circle.css('opacity', '0');
            _3_circle.css('opacity', '0');
        }

        hideUnderlinePlanets()

        function showUnderlinePlanets() {
            long_line.delay(700).animate({
                width: '205rem'
            }, 600);
            skew_line.delay(2100).animate({
                width: '55rem'
            }, 600)
            _1_circle.delay(1500).animate({
                opacity: '1'
            }, 200);
            _2_circle.delay(1300).animate({
                opacity: '1'
            }, 200);
            _3_circle.delay(1300).animate({
                opacity: '1'
            }, 200);
        }

        /* --------- --------- --------- < UNDERLINES --------- --------- --------- */









        /* --------- --------- ---------  HEADER & FOOTER > --------- --------- ---------  */

        /*  change color of fixed nav block when scrolled under nth px       */



        function changeHeaderColor() {
            if ($("header").length > 0) {
                if (GlobalVariables.screen_num > 1) {
                    showHeaderBg();
                } else {
                    hideHeaderBg();
                }
            }
        }

        window.addEventListener('touchstart', changeHeaderColor);
        window.addEventListener('wheel', changeHeaderColor);
        window.addEventListener('keydown', changeHeaderColor);






        // Scroll to position from header button 

        document.querySelector('#works_btn').addEventListener('click', function (e) {
            e.preventDefault();
            changeHeaderColor();
            removeClass('active', 'footer');
            if (GlobalVariables.screen_num > 8) {
                translateFullScreen(screen_effect.scr3);
                GlobalVariables.screen_num = 8;
            } else if (GlobalVariables.screen_num < 3) {
                GlobalVariables.screen_num = 2;
                translateBody('down');
            }
        })



        document.querySelector('#offers_btn').addEventListener('click', function (e) {
            e.preventDefault();
            changeHeaderColor();
            removeClass('active', 'footer');
            translateFullScreen(screen_effect.scr2);
            GlobalVariables.screen_num = 2;
            removeAllClassesFromPortfolio()
        })





        /* --------- --------- --------- < HEADER & FOOTER --------- --------- --------- */







        /* --------- --------- --------- PORTFOLIO HOVERS > --------- --------- --------- */


        var port = document.querySelectorAll('.dynamic_portfolio >div');

        function hoverShow(e) {

            e.target.querySelector('.hover_logo').classList.add('active');
        }

        function hoverHide(e) {
            e.target.querySelector('.hover_logo').classList.remove('active');
        }

        function goToWorkPage(e) {
            document.location.href = e.target.querySelector('a').getAttribute('href');
        }

        function addPortfolioListeners() {
            for (var i = 0; i < port.length - 1; i++) {
                if (i !== 0 && i !== 4) {
                    port[i].addEventListener('mouseenter', function (e) {
                        hoverShow(e)
                    });
                    port[i].addEventListener('mouseleave', function (e) {
                        hoverHide(e)
                    });
                    port[i].addEventListener('click', function (e) {
                        goToWorkPage(e)
                    });
                }

            }
        }

        addPortfolioListeners();

        function addHoverToWideImagesPortfolio(block_index) {
            for (var i = 0; i < arguments.length; i++) {
                port[arguments[i]].addEventListener('mouseenter',
                    function (e) {
                        hoverShow(e)
                    });

                port[arguments[i]].addEventListener('mouseleave',
                    function (e) {
                        hoverHide(e)
                    });
                port[arguments[i]].addEventListener('click',
                    function (e) {
                        goToWorkPage(e)
                    });
            }
        }

        addHoverToWideImagesPortfolio(0, 4);



        /* --------- --------- --------- PORTFOLIO HOVERS < --------- --------- --------- */


        /* ANCHOR FIX > */
        function checkLocation() {
            if (window.innerWidth / window.innerHeight > aspect_ratio && document.querySelector('.work_directions')) {
                var url = $(location).attr('href');

                if (url.indexOf('#') != -1) {
                    var from = url.indexOf('#');
                    if (url.indexOf('?') != -1) {
                        var to = url.indexOf('?');
                    }
                    var anchor = url.slice(from, to || url.length);

                    switch (anchor) {

                        case '#portfolio':

                            GlobalVariables.screen_num = 2;

                            translateBody('down');

                            changeHeaderColor();

                            showRedLine();

                            break;

                        case '#services':

                            GlobalVariables.screen_num = 1;

                            translateBody('down');

                            changeHeaderColor();

                            break;
                    }
                }
            }
        }

        checkLocation();

        /* < ANCHOR FIX  */








    }
}


showIndexPageSaparately();

//window.addEventListener('resize', showIndexPageSaparately);
