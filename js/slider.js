;
(function () {
    'use strict';

    var element,
        elem_position,
        elem_name,
        wrapper,
        slides_wrapper,
        slide,
        slides_amount,
        pag,
        pag_index,


        tick1 = 0,
        tick2 = 0,

        slider,
        header;


    callFunctions();



    /* --------------------------------------------- create elements --------------------------------------------- */

    /**
     * create pagination for slider and attr for slides
     * @param {number} slider_num [number of slider on page]
     */

    function createNav(slider_num) {
        console.log('sdafsadfdsf')
        wrapper = slider[slider_num].querySelector('.slides_wrapper');
        slide = wrapper.querySelectorAll('.slide');
        pag = slider[slider_num].querySelector('.pagination');
        slides_amount = slide.length;
        slide[0].classList.add('active'); //for fade in effect
        slide[0].querySelector('.slide_content_wrapper').style.opacity = "1"; //for fade in effect

        if (slide.length > 1 && pag) {
            for (var i = 0; i < slides_amount; i++) {
                var new_elem = document.createElement('div');
                new_elem.className = 'nav_item';
                new_elem.setAttribute('data-slide-num', i);
                new_elem.addEventListener('click', sliderMove);
                var full_elem = pag.querySelector('div').appendChild(new_elem) //.setAttribute('data-slide', i)
                ;
                slide[i].setAttribute('data-slide-num', i)
                if (i === 0) {
                    new_elem.classList.add('active');
                }
            }
        }
    };

    /**
     * set attr elems for slider with part slides
     */
    function setElemsAttr() {
        var slide_position = document.getElementsByClassName('slider')[2].querySelectorAll('.slide');
        slide_position[0].setAttribute('data-slide-position', 'left');
        slide_position[1].setAttribute('data-slide-position', 'top');
        slide_position[2].setAttribute('data-slide-position', 'right');
        slide_position[3].setAttribute('data-slide-position', 'right_bottom');
    }
    /**
     * create glowing across animated planets
     */
    function createGlowingPlanets() {
        var img = document.querySelectorAll('.work_directions .wrapper .direction .direction_wrapper .service img');
        var parent = document.querySelectorAll('.work_directions .wrapper .direction .direction_wrapper .service');
        for (var i = 0; i < img.length; i++) {
            var new_elem = document.createElement('div');
            new_elem.classList.add('glowing');
            parent[i].insertBefore(new_elem, img[i]);
        }
    }

    /* --------------------------------------------- sizes --------------------------------------------- */

    /**
     * set width of slider_wrapper
     */
    function setSliderWidth() {
        if (slider.length > 0) {
            for (var i = 1; i < slider.length; i++) {
                slide = slider[i].getElementsByClassName('slide');
                var width = slide[0].offsetWidth;
                //var width = parseFloat(getComputedStyle(slide[0]).width);
                //slider[i].querySelector('.slides_wrapper').style.width = width * slide.length + "px";
                //if (i == 1) {
                //slider[i].querySelector('.slides_wrapper').style.width = (width + 2) * slide.length + "px";
                //}
                slider[i].querySelector('.slides_wrapper').style.width = width * slide.length + "px";
                /*slider[i].querySelector('.slides_wrapper').style.width = (width + 2) * slide.length + "px";
                if (i == 1) {
                	slider[i].querySelector('.slides_wrapper').style.width = (width + 3) * slide.length + "px";
                }*/
            }
        }
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

    /**
     * Define to what elem should scrolling in setTimeOut func 
     * first param: which elem I want to see 
     * second param: border when scrolling should stop (created additional element for fixed header offset)
     */
    function setScrollingArguments1() {

        elem_position = calcPageHeight() - document.getElementsByTagName('footer')[0].offsetHeight - getHeaderHeight();
        elem_name = 'footer .invisible_scroll'
    }

    function setScrollingArguments2() {

        elem_position = document.getElementsByClassName('full_screen_slider')[0].offsetHeight - getHeaderHeight();
        elem_name = 'section.work_directions .invisible_scroll'
    }

    function setScrollingArguments3() {

        elem_position = document.getElementsByClassName('full_screen_slider')[0].offsetHeight + document.getElementsByClassName('work_directions')[0].offsetHeight - getHeaderHeight();
        elem_name = 'section.performed_works .invisible_scroll'
    }

    /**
     * set actual parameters of fixed header for invisible elem, which define, when scrolling stops. inisible elem should be put at the top part of relatively position elem where I want to stop scrolling
     */
    function setElemForPropertyScrolling() {
        for (var i = 0; i < document.getElementsByClassName('invisible_scroll').length; i++) {
            document.getElementsByClassName('invisible_scroll')[i].style.height = getHeaderHeight() + "px";
            document.getElementsByClassName('invisible_scroll')[i].style.top = "-" + getHeaderHeight() + "px";
        }
    }

    /* --------------------------------------------- sliders --------------------------------------------- */

    /**
     * for slider with pagination
     * @param {object} slide_index [clicked element]
     */

    function sliderMove(slide_index) {

        var prev_index;
        var active_slide;
        pag_index = slide_index.target.getAttribute('data-slide-num');
        var nav_item = slide_index.target.parentElement.getElementsByClassName('nav_item');
        var slide = slide_index.target.parentElement.parentElement.parentElement.querySelector('.slide[data-slide-num="' + pag_index + '"]');
        for (var j = 0; j < nav_item.length; j++) {
            if (nav_item[j].classList.contains('active')) {
                prev_index = j;
                nav_item[j].classList.remove('active'); //change style of nav elem
                active_slide = slide_index.target.parentElement.parentElement.parentElement.querySelectorAll('.slide')[prev_index];





                //active_slide.classList.remove('active');//hide slide

            }
        }
        /* var tick = false;
         if (tick === false) {
             tick = true;
             var int1 = setInterval(function () {
                 if ((getComputedStyle(active_slide).opacity) > 0.02 && active_slide.classList.contains('active')) {
                     console.log('start');
                     active_slide.style.opacity = +active_slide.style.opacity - 0.2;

                 } else {
                     var int2 = setInterval(function () {
                         if ((getComputedStyle(slide).opacity) < 0.98) {

                             slide.style.opacity = +slide.style.opacity + 0.2;

                         } else {

                             clearInterval(int2)
                         }
                     }, 50);

                     console.log('end');
                     active_slide.classList.remove('active');
                     clearInterval(int1);
                     tick = false;
                 }
             }, 50);
         }*/

        active_slide.classList.remove('active');
        active_slide.querySelector('.slide_content_wrapper').style.opacity = "0"; //
        slide_index.target.classList.add('active'); //change style of nav elem
        slide.classList.add('active');
        slide.querySelector('.slide_content_wrapper').style.opacity = "1"; //show slide









        //slides_wrapper = slide_index.target.parentElement.parentElement.parentElement.querySelector('.slides_wrapper');
        //var width = parseFloat(getComputedStyle(slides_wrapper.querySelector('.slide')).width);
        // slides_wrapper.style.right = pag_index * width + "px";
    }

    /**
     * for slider with arrows where moving all slide
     * @param {object} e [clicked element]
     */

    function sliderArrowMove(e) {
        if (e.target.getAttribute('data-direction') == 'right' && tick1 != 0) {
            tick1 -= 1
        } else if (e.target.getAttribute('data-direction') == 'left' && tick1 != (e.target.parentElement.querySelectorAll('.slide').length - 1)) {
            tick1 += 1
        }
        slides_wrapper = e.target.parentElement.querySelector('.slides_wrapper');
        var width = parseFloat(getComputedStyle(slides_wrapper.querySelector('.slide')).width);
        slides_wrapper.style.right = tick1 * width + "px";
        console.log('1slider')
    }

    /**
     * for slider with arrows where moving part of slide
     * @param {object} e [clicked element]
     */
    function sliderArrowMoveInParticularSlider(e) {
        slides_wrapper = e.target.parentElement.querySelector('.slides_wrapper');
        var slide_position = slides_wrapper.querySelectorAll('.slide'),
            next, prev;
        if (e.target.getAttribute('data-direction') == 'right' && tick2 != 0) {
            tick2 -= 1;
            for (var j = 0; j < slide_position.length; j++) {
                var position = slide_position[j].getAttribute('data-slide-position');
                if (position == 'right_bottom') {
                    slide_position[j].removeAttribute('data-slide-position');
                } else if (position == 'right') {
                    slide_position[j].setAttribute('data-slide-position', 'right_bottom');
                } else if (position == 'top') {
                    slide_position[j].setAttribute('data-slide-position', 'right')
                } else if (position == 'left') {
                    slide_position[j].setAttribute('data-slide-position', 'top');
                } else if (position == 'left_bottom') {
                    slide_position[j].setAttribute('data-slide-position', 'left');
                    prev = slide_position[j].previousElementSibling;
                }
            }
            if (prev) {
                prev.setAttribute('data-slide-position', 'left_bottom');
            }
        } else if (e.target.getAttribute('data-direction') == 'left' && tick2 != (e.target.parentElement.querySelectorAll('.slide').length - 3)) {
            tick2 += 1;
            for (var j = 0; j < slide_position.length; j++) {
                var position = slide_position[j].getAttribute('data-slide-position');
                if (position == 'left_bottom') {
                    slide_position[j].removeAttribute('data-slide-position')
                } else if (position == 'left') {
                    slide_position[j].setAttribute('data-slide-position', 'left_bottom');
                } else if (position == 'top') {
                    slide_position[j].setAttribute('data-slide-position', 'left')
                } else if (position == 'right') {
                    slide_position[j].setAttribute('data-slide-position', 'top');

                } else if (position == 'right_bottom') {
                    slide_position[j].setAttribute('data-slide-position', 'right');
                    next = slide_position[j].nextElementSibling;
                }
            }
            if (next) {
                next.setAttribute('data-slide-position', 'right_bottom');
            }
            console.log(prev, next)
        }
        var width = parseFloat(getComputedStyle(slides_wrapper.querySelector('.slide')).width);
        slides_wrapper.style.right = tick2 * width + "px";
    }

    /* --------------------------------------------- events --------------------------------------------- */

    /**
     * add listener for arrows at slider with arrows where moving all slide
     */
    function getArrows() {
        for (var i = 0; i < document.querySelectorAll('.review .slider .arrow').length; i++) {
            document.querySelectorAll('.review .slider .arrow')[i].addEventListener('click', sliderArrowMove)
        }
    }

    /**
     * add listener for arrows at slider with arrows where moving part of slide
     */
    function getArrowsInParticularSlider() {
        for (var i = 0; i < document.querySelectorAll('.team .slider .arrow').length; i++) {
            document.querySelectorAll('.team .slider .arrow')[i].addEventListener('click', sliderArrowMoveInParticularSlider)
        }
    }

    /**
     * set modal button
     */
    function setModalButton() {
        //document.getElementsByClassName('modal')[0].setAttribute('hidden', '');
        for (var i = 0; i < document.getElementsByClassName('submit_app_btn').length; i++) {
            document.getElementsByClassName('submit_app_btn')[i].addEventListener('click', modalOpen);
        }
        for (var i = 0; i < document.getElementsByClassName('modal_comment').length; i++) {
            document.getElementsByClassName('modal_comment')[i].addEventListener('click', modalOpen);
        }
        for (var i = 0; i < document.getElementsByClassName('modal_resume').length; i++) {
            document.getElementsByClassName('  modal_resume')[i].addEventListener('click', modalOpen);
        }


        for (var i = 0; i < document.querySelectorAll('.modal .close').length; i++) {
            document.querySelectorAll('.modal .close')[i].addEventListener('click', modalClose);
        }

    }

    /**
     * for header menus
     * @param {object} e [clicked elem]
     */
    function checkTarget(e) {
        console.log(e.target);
        if (document.getElementsByClassName('lang') > 0 && !e.target.classList.contains('lang') || (e.target.classList.contains('lang') && e.target.classList.contains('active'))) {
            if (e.target.classList.contains('lang')) {
                e.target.classList.remove('active')
            }
            hideElems('lang');
        } else if (e.target.classList.contains('lang')) {
            showElems('lang')
        }
        if (document.getElementsByClassName('tel_num') > 0 && !e.target.classList.contains('tel_num') || (e.target.classList.contains('tel_num') && e.target.classList.contains('active'))) {
            if (e.target.classList.contains('tel_num')) {
                e.target.classList.remove('active')
            }
            hideElems('tel_num')
        } else if (e.target.classList.contains('tel_num')) {
            showElems('tel_num')
        }
    }

    window.addEventListener('click', checkTarget);
    window.addEventListener('scroll', changeHeaderColor);
    window.addEventListener('resize', setSliderWidth);
    window.addEventListener('resize', calcPageHeight);
    window.addEventListener('resize', glowingPlanet);


    /* --------------------------------------------- other functions --------------------------------------------- */

    /**
     * modal_window + smooth display
     */
    function modalOpen(e) {
        var index;
        if (e.target.classList.contains('submit_app_btn')) {
            index = 0
        } else if (e.target.classList.contains('modal_resume')) {
            e.preventDefault();
            index = 1
        } else if (e.target.classList.contains('modal_comment')) {
            e.preventDefault();
            index = 2
        }

        document.getElementsByClassName('modal')[index].style.display = "block";
        var int = setInterval(function () {
            if ((getComputedStyle(document.getElementsByClassName('modal')[index]).opacity) < 0.98) {
                document.getElementsByClassName('modal')[index].style.opacity = +document.getElementsByClassName('modal')[index].style.opacity + 0.1;

            } else {
                clearInterval(int)
            }
        }, 30)


        document.getElementsByTagName('body')[0].classList.add('hidden');
    }

    function modalClose(e) {
        var index;
        if (e.target.parentElement.parentElement.parentElement.id == 'modal_order') {
            index = 0
        } else if (e.target.parentElement.parentElement.parentElement.id == 'modal_resume') {
            index = 1
        } else if (e.target.parentElement.parentElement.parentElement.id == 'modal_comment') {
            index = 2
        }

        document.getElementsByClassName('modal')[index].style.display = "none";
        document.getElementsByClassName('modal')[index].style.opacity = "0";

        document.getElementsByTagName('body')[0].classList.remove('hidden');
    }

    /**
     * change color of fixed nav block when scrolled under nth px
     */
    function changeHeaderColor() {
        if (header) {
            if (window.pageYOffset > 0) {
                header.getElementsByClassName('header_bg')[0].style.opacity = "0.9"
            } else {
                header.getElementsByClassName('header_bg')[0].style.opacity = "0"
            }
        }
    }

    /**
     * smooth scrolling 
     * @param {object} e [coord of clicked link from what is scrolling]
     * arguments --> look in "sizes" part, there is a points where scrolling stop
     * scrollIntoView(true): stop whete element on top of a page
     * last "if" mean "stop at the end of page"
     */
    function scrollingButtonAction(e) {
        var button_coord = e.pageY;
        e.preventDefault();
        var scroll_interval = setInterval(function scrolling() {
            arguments[1] = elem_position;
            console.log(arguments[1]);
            arguments[2] = elem_name;
            if (button_coord < arguments[1]) {
                window.scrollBy(0, 70);
                if (window.pageYOffset >= arguments[1]) {
                    clearInterval(scroll_interval);
                    document.querySelector(arguments[2]).scrollIntoView(true)
                }
            } else if (button_coord > arguments[1]) {
                window.scrollBy(0, -70);
                if (window.pageYOffset <= arguments[1] + 70) {
                    clearInterval(scroll_interval);
                    document.querySelector(arguments[2]).scrollIntoView(true)
                }
            }
            if (window.pageYOffset + document.documentElement.clientHeight >= calcPageHeight()) {
                clearInterval(scroll_interval)
            }
        }, 30);
    }

    /**
     * show and hide header lists
     * @param {[[string]]} elem_class_name [name of class of list element]
     */
    function showElems(elem_class_name) {
        document.getElementsByClassName(elem_class_name)[0].classList.add('active');
        for (var i = 1; i < document.getElementsByClassName(elem_class_name).length; i++) {
            document.getElementsByClassName(elem_class_name)[i].removeAttribute('hidden')
        }
    }

    function hideElems(elem_class_name) {
        document.getElementsByClassName(elem_class_name)[0].classList.remove('active');
        for (var i = 1; i < document.getElementsByClassName(elem_class_name).length; i++) {
            document.getElementsByClassName(elem_class_name)[i].setAttribute('hidden', '')
        }
    }
    /* --------------------------------------------- calls --------------------------------------------- */

    setSliderWidth();
    getArrows();
    getArrowsInParticularSlider();
    setModalButton();

    setElemForPropertyScrolling();

    createGlowingPlanets();
    glowingPlanet();
    manageGlowing();






    /*  function animationPlanets(elem, time, point1x, point1y, point2x, point2y, point3x, point3y) {
          var element = elem;
          setInterval(
          function() { elem.style.transform = "translate(" point1x + "," + point1y + ")";
              
          
          }, time)
      }*/





    function glowingPlanet() {
        var img = document.querySelectorAll('.work_directions .wrapper .direction .direction_wrapper .service img');
        var planet = document.querySelectorAll('.work_directions .wrapper .direction .direction_wrapper .service .glowing');
        for (var i = 0; i < planet.length; i++) {

            planet[i].style.left = '5%'; //parseInt(getComputedStyle(img[i]).width) / 4 + 'px';
            planet[i].style.top = img[i].offsetHeight / 4 + 'px';
            planet[i].style.width = '20%'; //parseInt(getComputedStyle(img[i]).width) / 2 + 'px';
            planet[i].style.height = img[i].offsetHeight / 2 + 'px';

        }
    };

    function manageGlowing() {
        var elem = document.querySelectorAll('.work_directions .wrapper .direction .direction_wrapper .service');
        for (var i = 0; i < elem.length; i++) {
            elem[i].addEventListener('mouseenter', showGlowing);
            elem[i].addEventListener('mouseleave', hideGlowing);
        }
    }

    function showGlowing(e) {
        e.target.querySelector(".glowing").classList.add('active');
    }

    function hideGlowing(e) {
        e.target.querySelector(".glowing").classList.remove('active');
    }






    //resize, load; hover - jnltkmyj


    function changeInvalidColor(e) {

        var form_input = e.target.parentElement.getElementsByTagName('input');
        for (var i = 0; i < form_input.length; i++) {
            form_input[i].classList.add('valid')
        }




    }

    function addButtonListener() {
        var form_button = document.getElementsByTagName('button')
        for (var i = 0; i < form_button.length; i++) {

            form_button[i].addEventListener('click', changeInvalidColor)
        }

    }
    addButtonListener();

    function showTelComment() {
        var tel_comment = document.querySelector('.tel_comment');
        tel_comment.style.visibility = "visible";
        tel_comment.style.opacity = "1";


    }

    function hideTelComment() {
        var tel_comment = document.querySelector('.tel_comment');
        tel_comment.style.visibility = "hidden";
        tel_comment.style.opacity = "0";


    }





    function getHeaderHeight() {
        return header.offsetHeight;
    }







    function addListeners() {
        if (document.getElementById('cont_btn')) {
            document.getElementById('cont_btn').addEventListener('click', scrollingButtonAction);
            document.getElementById('cont_btn').addEventListener('click', setScrollingArguments1);
        }

        if (document.getElementById('offers_btn')) {
            document.getElementById('offers_btn').addEventListener('click', scrollingButtonAction);
            document.getElementById('offers_btn').addEventListener('click', setScrollingArguments2);
        }
        if (document.getElementById('works_btn')) {
            document.getElementById('works_btn').addEventListener('click', scrollingButtonAction);
            document.getElementById('works_btn').addEventListener('click', setScrollingArguments3);
        }
        if (document.getElementById('tel_modal')) {
            document.getElementById('tel_modal').addEventListener('focus', showTelComment);
            document.getElementById('tel_modal').addEventListener('blur', hideTelComment);
        }




    }
    addListeners();

    function callFunctions() {
        slider = document.getElementsByClassName('slider');
        header = document.getElementsByTagName('header')[0];

        if (slider.length > 0) {
            createNav(0);
        }
        if (header) {
            changeHeaderColor();
        }
        if (document.getElementsByClassName('slider')[2]) {
            setElemsAttr();
        }

    }



})();