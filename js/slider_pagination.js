;
(function () {

    'use strict';

    if (($('.work_directions').length > 0)) {

        var SliderPaginationSettings = {
            wrapper: function () {
                return this.current_slider.find('.slides_wrapper')
            },
            slide_arr: function () {
                return this.wrapper().find('.slide')
            },
            pag: function () {
                return this.current_slider.find('.pagination')
            },
            slides_amount: function () {
                return this.slide_arr().length
            }
        }

        SliderPaginationSettings.current_slider = $('section.full_screen_slider .slider');





        function createNav() {
            if (SliderPaginationSettings.slide_arr().length > 1 && SliderPaginationSettings.pag().length > 0) {
                for (var i = 0; i < SliderPaginationSettings.slides_amount(); i++) {
                    var new_elem = document.createElement('div');
                    new_elem.className = 'nav_item';
                    new_elem.setAttribute('data-slide-num', i);
                    SliderPaginationSettings.pag().find('>div').append(new_elem);
                }
            }
        };

        createNav()




        function addDefaultSettingsOnSlides() {
            SliderPaginationSettings.slide_arr()[0].classList.add('active'); //for fade in effect
            SliderPaginationSettings.slide_arr()[0].querySelector('.slide_content_wrapper').style.opacity = "1"; //for fade in effect
            if (SliderPaginationSettings.current_slider.find('.nav_item').length > 0) {
                SliderPaginationSettings.current_slider.find('.nav_item')[0].classList.add('active');
            }
        }


        addDefaultSettingsOnSlides()



        function setAttrOnSlides() {
            for (var i = 0; i < SliderPaginationSettings.slides_amount(); i++) {
                SliderPaginationSettings.slide_arr()[i].setAttribute('data-slide-num', i)
            }
        }
        setAttrOnSlides()


        function addPaginationListeners() {
            SliderPaginationSettings.current_slider.find('.nav_item').each(function () {
                this.addEventListener('click', function (e) {
                    sliderPagMove(e)
                });
            });
        }

        addPaginationListeners()



        /**
         * for slider with pagination
         * @param {object} slide_index [clicked element]
         */
        function sliderPagMove(ev) {
            end_animation_marker = false;
            var prev_index,
                active_slide,
                pag_index = ev.target.getAttribute('data-slide-num'),
                nav_item = ev.target.parentElement.getElementsByClassName('nav_item'),
                slide = ev.target.parentElement.parentElement.parentElement.querySelector('.slide[data-slide-num="' + pag_index + '"]');
            for (var j = 0; j < nav_item.length; j++) {
                if (nav_item[j].classList.contains('active')) {
                    prev_index = j;
                    nav_item[j].classList.remove('active'); //change style of nav elem
                    active_slide = ev.target.parentElement.parentElement.parentElement.querySelectorAll('.slide')[prev_index];
                }
            }
            active_slide.classList.remove('active');
            active_slide.querySelector('.slide_content_wrapper').style.opacity = "0";
            ev.target.classList.add('active'); //change style of nav elem
            slide.classList.add('active'); //show slide
            slide.querySelector('.slide_content_wrapper').style.opacity = "1";
        }

    }
})();