;
(function () {
    'use strict';

    var window_offset;
    var head_nav_btn = document.querySelector('.toggle_btn');
    var lang_btn = document.querySelector('.lang_btn');
    var slider = document.getElementsByClassName('slider');
    var direction;
    var x1, x2;

    setModalButton();
    addListeners();




    /**
     * set modal button
     */
    function setModalButton() {
        for (var i = 0; i < document.getElementsByClassName('submit_app_btn').length; i++) {
            document.getElementsByClassName('submit_app_btn')[i].addEventListener('click', modalOpen);
        }
        if (document.querySelector('section.work_part a')) {
            document.querySelector('section.work_part a').addEventListener('click', modalOpen);
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
     * modal_window + smooth display
     */
    function modalOpen(e) {
        var index;
        if (e.target.classList.contains('submit_app_btn') || (!e.target.classList.contains('modal_resume') && !e.target.classList.contains('modal_comment') && e.target.tagName == 'A')) {
            index = 0;
        } else if (e.target.classList.contains('modal_resume')) {
            e.preventDefault();
            index = 1
        } else if (e.target.classList.contains('modal_comment')) {
            e.preventDefault();
            index = 2
        }

        document.getElementsByClassName('modal')[index].removeAttribute('hidden');
        document.getElementsByClassName('modal')[index].style.opacity = "1";
        window_offset = window.pageYOffset;
        document.body.style.top = "-" + window_offset + "px";
        document.body.classList.add('hidden');
    }

    function modalClose(e) {
        var index;
        if (e.target.parentElement.parentElement.id == 'modal_order') {
            index = 0
        } else if (e.target.parentElement.parentElement.id == 'modal_resume') {
            index = 1
        } else if (e.target.parentElement.parentElement.id == 'modal_comment') {
            index = 2
        }
        document.getElementsByClassName('modal')[index].setAttribute('hidden', '');
        document.getElementsByClassName('modal')[index].style.opacity = "0";

        document.body.classList.remove('hidden');
        document.body.style.top = "0";
        window.scrollTo(0, window_offset);
    }


    /**
     * add listeners for toggle elements
     */
    function addListeners() {
        if (head_nav_btn) {
            head_nav_btn.addEventListener('click', toggleNav);
        }

        if (document.getElementById('tel_modal')) {
            document.getElementById('tel_modal').addEventListener('focus', showTelComment);
            document.getElementById('tel_modal').addEventListener('blur', hideTelComment);
        }
    }

    /**
     * show/hide header nav
     */

    function toggleNav() {
        if (head_nav_btn.classList.contains('active')) {
            head_nav_btn.classList.remove('active');
            head_nav_btn.parentElement.querySelector('ul').setAttribute('hidden', '');
            head_nav_btn.parentElement.querySelector('ul').style.opacity = "0"

        } else {
            head_nav_btn.classList.add('active');
            head_nav_btn.parentElement.querySelector('ul').removeAttribute('hidden')
            head_nav_btn.parentElement.querySelector('ul').style.opacity = "1"
        }
    }



    /**
     * show comment for tel form in modal window
     */
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









    /**
     * set width of slider_wrapper
     */
    function setSliderWidth() {
        if (slider.length > 0) {
            for (var i = 1; i < slider.length; i++) {
                var slide = slider[i].getElementsByClassName('slide');

                slider[i].querySelector('.slides_wrapper').style.width = slide.length * 100 + '%';
                var full_width = slide.length * 100;
                for (var j = 0; j < slide.length; j++) {
                    slide[j].style.width = 100 / slide.length + '%';
                }


            }
        }
    }



    setSliderWidth()






    /* --------------------------------------------- sliders --------------------------------------------- */


    /**
     * slider: moving + arrow hiding;
     * @param {object} e [clicked element]
     */
    function sliderArrowMove(e) {
        var elem = e.target;
        console.log(e.target)
        if (!elem.classList.contains('slider')) {

            while (!elem.parentElement.classList.contains('slider')) {
                elem = elem.parentElement;

            }


            //    if (elem.parentElement.classList.contains('slider')) {





            var control = elem.parentElement.querySelector('input[type="hidden"]');
            var slide_index = parseInt(elem.parentElement.querySelector('.slide_index').getAttribute('data-slider'));
            var tick = parseInt(control.value);


            if (elem.getAttribute('data-direction') == 'right' || direction == 'left' && tick != 0) {
                control.value = tick - 1;
                tick -= 1;
                if (tick === 0) {
                    hideSliderArrow(slide_index, 0);
                } else if (tick === (elem.parentElement.querySelectorAll('.slide').length - 2)) {
                    showSliderArrow(slide_index, 1);
                }
            } else if (elem.getAttribute('data-direction') == 'left' || direction == 'right' && tick != (elem.parentElement.querySelectorAll('.slide').length - 1)) {
                control.value = tick + 1;
                tick += 1;
                console.log(tick);
                if (tick == (elem.parentElement.querySelectorAll('.slide').length - 1)) {
                    hideSliderArrow(slide_index, 1);
                }
                if (tick >= 1) {
                    showSliderArrow(slide_index, 0);
                }
            }
            var slides_wrapper = elem.parentElement.querySelector('.slides_wrapper');
            slides_wrapper.style.transform = "translateX(-" + tick * 100 / slides_wrapper.querySelectorAll('.slide').length + "%)";


        }



    }


    /*
    
    
    function sliderArrowMove(e) {console.log(e.target);
                                 
                                 
                                 
                                 
                                 
        var control = e.target.parentElement.querySelector('input[type="hidden"]');
        var slide_index = parseInt(e.target.parentElement.querySelector('.slide_index').getAttribute('data-slider')) ;
        var tick = parseInt(control.value);


        if (e.target.getAttribute('data-direction') == 'right' || sliderTouch() == 'left') {
            control.value = tick - 1;
            tick -= 1;
            if (tick === 0) {

                hideSliderArrow(slide_index, 0);
            } else if (tick === (e.target.parentElement.querySelectorAll('.slide').length - 2)) {
                showSliderArrow(slide_index, 1);
            }
        } else if (e.target.getAttribute('data-direction') == 'left' || sliderTouch() == 'right') {
            control.value = tick + 1;
            tick += 1;
            console.log(tick);
            if (tick == (e.target.parentElement.querySelectorAll('.slide').length - 1)) {
                hideSliderArrow(slide_index, 1);
            }
            if (tick >= 1) {
                showSliderArrow(slide_index, 0);
            }
        }
        var slides_wrapper = e.target.parentElement.querySelector('.slides_wrapper');
        slides_wrapper.style.transform = "translateX(-" + tick * 100 / slides_wrapper.querySelectorAll('.slide').length + "%)";
                                 
                                 
                                 
                                 

    }

    
    */

    /* --------------------------------------------- events --------------------------------------------- */

    /**
     * add listener for arrows at sliders
     */
    function getArrows() {
        for (var i = 0; i < document.querySelectorAll('.slider .arrow').length; i++) {
            document.querySelectorAll('.slider .arrow')[i].addEventListener('click', sliderArrowMove);
        }
    }


    getArrows()



    /**
     * Hiding arrows when slides ends
     * @param {[[num]]} indexSlider [[index of slider on page]]
     * @param {[[num]]} indexArrow  [[index of arrow]]
     */

    function hideSliderArrow(indexSlider, indexArrow) {
        if (slider[indexSlider]) {
            slider[indexSlider].getElementsByClassName('arrow')[indexArrow].setAttribute('hidden', '');
        }

    }

    function showSliderArrow(indexSlider, indexArrow) {
        if (slider[indexSlider]) {
            slider[indexSlider].getElementsByClassName('arrow')[indexArrow].removeAttribute('hidden');
        }
    }

    function checkIfSlidesExist() {
        for (var i = 0; i < slider.length; i++) {
            if (slider[i]) {
                hideSliderArrow(i, 0);
                if (slider[i].getElementsByClassName('slide').length < 2) {

                    hideSliderArrow(i, 1)
                }
            }
        }
    }
    checkIfSlidesExist()


    function sliderController() {
        for (var i = 0; i < slider.length; i++) {
            slider[i].querySelector('input[type="hidden"]').value = "0";
        }
    }


    sliderController()




    function sliderTouch() {
        for (var i = 0; i < slider.length; i++) {
            slider[i].addEventListener('touchstart', sliderTouchMove);
            slider[i].addEventListener('touchmove', sliderTouchMove)
            slider[i].addEventListener('touchend', sliderTouchMove);
        }

    }





    function sliderTouchMove(e) {

        if (e.type == "touchstart") {
            x1 = e.touches[0].clientX;
        } else if (e.type == "touchmove") {
            x2 = e.touches[0].clientX;
        } else if (e.type == "touchend") {
            calcTouchDifference(e)
        }
    }


    function calcTouchDifference(e) {
        direction = null;
        var difference = x1 - x2;
        if (x1 > x2 && difference > 10 && x2 !== 0) {
            direction = 'right';
            x1 = 0;
            x2 = 0;
        } else if (x2 > x1 && difference < -10) {
            direction = "left";
            x1 = 0;
            x2 = 0;
        }
        if (direction !== null) {
            sliderArrowMove(e)


        }
    }


    sliderTouch()
    
    
    function workCarouselSize() {
        var scr_wrap = document.querySelector('.screens_wrapper');
        if (scr_wrap) {
            scr_wrap.style.width = parseFloat(getComputedStyle(scr_wrap.querySelector('img')).width) * scr_wrap.querySelectorAll('img').length + 'px';
                               
                      }
        
        
    }
    workCarouselSize() 

    
 







})();