var end_animation_marker = true;

function createSlideAnimation() { /* INDEX PAGE */



    'use strict';


    if ($('.work_directions').length > 0) {





        function animateGuys() {


            setTimeout(function () {
                moveOld();
            }, 1500)


        }


        var AnimationSettings = {
            fps: 20,
            transition_old: 1,
            transition_young: 1,
            frame_state: true,
        }



        var old = document.querySelector('.old_guy'),
            image_1 = "url(" + old.getAttribute('data-img-1') + ")",
            image_2 = "url(" + old.getAttribute('data-img-2') + ")";

        function moveOld() {

            if (AnimationSettings.frame_state) {
                old.style.backgroundImage = image_1;
                AnimationSettings.frame_state = false
            } else {
                old.style.backgroundImage = image_2;
                AnimationSettings.frame_state = true;
            }
            old.style.transform = "translateX(" + AnimationSettings.transition_old + "rem)";
            AnimationSettings.transition_old += (window.innerWidth - document.querySelector('.slide_content').offsetWidth) / 100;
            setTimeout(function () {
                if (AnimationSettings.transition_old > (((window.innerWidth - document.querySelector('.slide_content').offsetWidth) / 3))) {
                    cancelAnimationFrame(moveOld);
                    document.querySelector('.old_guy .speak').classList.add('active');
                    AnimationSettings.frame_state = true;
                    showBtn();


                    return
                }
                requestAnimationFrame(moveOld);

            }, 1000 / AnimationSettings.fps);
        }


        var young = document.querySelector('.young_guy'),
            image_3 = "url(" + young.getAttribute('data-img-1') + ")",
            image_4 = "url(" + young.getAttribute('data-img-2') + ")";

        function moveYoung() {

            if (AnimationSettings.frame_state) {
                young.style.backgroundImage = image_3;
                AnimationSettings.frame_state = false
            } else {
                young.style.backgroundImage = image_4;
                AnimationSettings.frame_state = true;
            }
            young.style.transform = "translateX(" + AnimationSettings.transition_young + "rem)";
            AnimationSettings.transition_young += (window.innerWidth - document.querySelector('.slide_content').offsetWidth) / 50;
            setTimeout(function () {
                if (AnimationSettings.transition_young > (((window.innerWidth - document.querySelector('.slide_content').offsetWidth) / 3))) {
                    cancelAnimationFrame(moveYoung);
                    document.querySelector('.young_guy .speak').classList.add('active');
                    setTimeout(function () {
                        if (end_animation_marker) {
                            autonomicSlider()
                        }
                    }, 1200);


                    return
                }
                requestAnimationFrame(moveYoung);

            }, 1000 / AnimationSettings.fps);
        }

        function setYoungPos() {
            document.querySelector('.young_guy').style.right = ((window.innerWidth - document.querySelector('.slide_content').offsetWidth) / 2) + 'px';
        }

        setYoungPos();


        function showBtn() {
            setTimeout(function () {
                document.querySelector('.slide_content .submit_app_btn').classList.add('active');
                showCaterpillar()
            }, 500)

        }

        function showCaterpillar() {
            setTimeout(function () {
                document.querySelector('.slide_content .icons_block').classList.add('active');
                showYoungGuy();
            }, 500)

        }

        function showYoungGuy() {
            document.querySelector('.young_guy').classList.add('active');
            moveYoung()
        }

        animateGuys();


        var slider_counter = 1,
            pag_slide = document.querySelectorAll('.full_screen_slider .slide');

        var slider_interval = setInterval(function () {
            if (slider_counter < pag_slide.length - 1) {
                sliderAutoMove(slider_counter, pag_slide);
                slider_counter++
            } else {
                sliderAutoMove(slider_counter, pag_slide);
                slider_counter = 0;
            }
        }, 7000)


        function sliderAutoMove(slider_counter, pag_slide) {
            var nav_item = document.querySelectorAll('.pagination .nav_item');
            if (slider_counter !== 0) {
                nav_item[slider_counter - 1].classList.remove('active');
                pag_slide[slider_counter - 1].classList.remove('active');
                pag_slide[slider_counter - 1].querySelector('.slide_content_wrapper').style.opacity = "0";
            } else {
                nav_item[nav_item.length - 1].classList.remove('active');
                pag_slide[pag_slide.length - 1].classList.remove('active');
                pag_slide[pag_slide.length - 1].querySelector('.slide_content_wrapper').style.opacity = "0";
            }
            nav_item[slider_counter].classList.add('active'); //change style of nav elem
            pag_slide[slider_counter].classList.add('active'); //show slide
            pag_slide[slider_counter].querySelector('.slide_content_wrapper').style.opacity = "1";
        }



        function autonomicSlider() {

            if (pag_slide.length > 0) {
                sliderAutoMove(slider_counter, pag_slide)

            }
        }


        function autoSliderStop() {
            for (var i = 0; i < document.querySelectorAll('.pagination .nav_item').length; i++) {
                document.querySelectorAll('.pagination .nav_item')[i].addEventListener('click', sliderStop)
            }
        }



        function sliderStop() {
            clearInterval(slider_interval)
        }


        autoSliderStop();

    }


}

createSlideAnimation();
