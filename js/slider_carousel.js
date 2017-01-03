;
(function () {


    if (($('.work_directions').length > 0)) {

        var current_slider = $('section.team .slider'),
            wrapper = current_slider.find('.slides_wrapper'), // slides_wrapper
            slide = wrapper.find('.slide'), //slide_position
            amount = slide.length;


        function setWidthOnSliderElements() {

            wrapper.css('width', amount + "00%");
            slide.each(function () {
                $(this).css('width', 100 / (amount * 3) + '%')

            })
        }


        setWidthOnSliderElements();

        function setElemsAttr() {
            var slide_position = current_slider.find('.slide');
            if (slide_position[0]) {
                slide_position[0].setAttribute('data-slide-position', 'left');
            }
            if (slide_position[1]) {
                slide_position[1].setAttribute('data-slide-position', 'top');
            }
            if (slide_position[2]) {
                slide_position[2].setAttribute('data-slide-position', 'right');
            }
            if (slide_position[3]) {
                slide_position[3].setAttribute('data-slide-position', 'right_bottom');
            }
        }

        setElemsAttr()


        current_slider.find('.arrow').on('click', function (e) {
            manageSlider(e)
        })




        var tick = 0;


        function manageSlider(e) {




            var position, next, prev;
            if (e.target.getAttribute('data-direction') == 'right' && tick != 0) {
                tick -= 1;
                if (tick === 0) {
                    hideSliderArrow(2, 0);
                }
                if (tick === (amount - 4)) {
                    showSliderArrow(2, 1);
                }
                for (var j = 0; j < amount; j++) {
                    position = slide[j].getAttribute('data-slide-position');

                    switch (position) {
                    case 'left_bottom':
                        slide[j].setAttribute('data-slide-position', 'left');
                        prev = slide[j].previousElementSibling;
                        break;
                    case 'left':
                        slide[j].setAttribute('data-slide-position', 'top');
                        break;
                    case 'top':
                        slide[j].setAttribute('data-slide-position', 'right')
                        break;
                    case 'right':
                        slide[j].setAttribute('data-slide-position', 'right_bottom');
                        break;
                    case 'right_bottom':
                        slide[j].removeAttribute('data-slide-position');
                        break;
                    }
                }

                if (prev) {
                    prev.setAttribute('data-slide-position', 'left_bottom');
                }
            } else if (e.target.getAttribute('data-direction') == 'left' && tick != (amount - 3)) {
                tick += 1;

                if (tick == (amount - 3)) {
                    hideSliderArrow(2, 1);
                }
                if (tick >= 1) {
                    showSliderArrow(2, 0);
                }

                for (var j = 0; j < amount; j++) {
                    position = slide[j].getAttribute('data-slide-position');

                    switch (position) {
                    case 'left_bottom':
                        slide[j].removeAttribute('data-slide-position');
                        break;
                    case 'left':
                        slide[j].setAttribute('data-slide-position', 'left_bottom');
                        break;
                    case 'top':
                        slide[j].setAttribute('data-slide-position', 'left');
                        break;
                    case 'right':
                        slide[j].setAttribute('data-slide-position', 'top');
                        break;
                    case 'right_bottom':
                        slide[j].setAttribute('data-slide-position', 'right');
                        next = slide[j].nextElementSibling;
                        break;
                    }
                }

                if (next) {
                    next.setAttribute('data-slide-position', 'right_bottom');
                }
            }
            sliderArrowMove(e);

        }



        function sliderArrowMove(e) {
            var slides_wrapper = e.target.parentElement.querySelector('.slides_wrapper');
            slides_wrapper.style.transform = "translateX(-" + tick * 100 / (amount * 3) + "%)";
        }


    }

})();