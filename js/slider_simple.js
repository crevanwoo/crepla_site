;
(function () {


    'use strict';


    if ($('.work_directions').length > 0) {

        var current_slider = $('section.review .slider'),
            wrapper = current_slider.find('.slides_wrapper'),
            slide = wrapper.find('.slide'),
            amount = slide.length;


        function setWidthOnSliderElements() {

            wrapper.css('width', amount + "00%");
            slide.each(function () {
                $(this).css('width', 100 / amount + '%');

            });
        }



        setWidthOnSliderElements();




        /**
         * for slider with arrows where moving all slide: moving + arrow hiding;
         * @param {object} e [clicked element]
         */

        var tick = 0;


        function sliderArrowMove(e) {
            var slides_wrapper = e.target.parentElement.querySelector('.slides_wrapper');
            slides_wrapper.style.transform = "translateX(-" + tick * 100 / amount + "%)";
        }


        function manageSlider(e) {
            if (e.target.getAttribute('data-direction') === 'right' && tick !== 0) {
                tick -= 1;
                if (tick === 0) {
                    hideSliderArrow(1, 0);
                } else if (tick === (e.target.parentElement.querySelectorAll('.slide').length - 2)) {
                    showSliderArrow(1, 1);
                }
            } else if (e.target.getAttribute('data-direction') === 'left' && tick !== (e.target.parentElement.querySelectorAll('.slide').length - 1)) {
                tick += 1;
                if (tick === (e.target.parentElement.querySelectorAll('.slide').length - 1)) {
                    hideSliderArrow(1, 1);
                }
                if (tick >= 1) {
                    showSliderArrow(1, 0);
                }
            }
            sliderArrowMove(e);
        }


        current_slider.find('.arrow').on('click', function (e) {
            manageSlider(e);
        })


    }
})();