  ;(function () {
      
      
      
      



getArrowsInParticularSlider();


   /**
    * add listener for arrows at slider with arrows where moving part of slide
    */
   function getArrowsInParticularSlider() {
       for (var i = 0; i < document.querySelectorAll('.team .slider .arrow').length; i++) {
           document.querySelectorAll('.team .slider .arrow')[i].addEventListener('click', sliderArrowMoveInParticularSlider)
       }
   }




   /**
    * for slider with arrows where moving part of slide + hiding arrows
    * @param {object} e [clicked element]
    */
   function sliderArrowMoveInParticularSlider(e) {
       //checkWidth(e, 3);
       slides_wrapper = e.target.parentElement.querySelector('.slides_wrapper');
       var slide_position = slides_wrapper.querySelectorAll('.slide'),
           next, prev;
       if (e.target.getAttribute('data-direction') == 'right' && tick2 != 0) {
           tick2 -= 1;
           if (tick2 === 0) {
               hideSliderArrow(2, 0);
           }
           if (tick2 === (e.target.parentElement.querySelectorAll('.slide').length - 4)) {
               showSliderArrow(2, 1);
           }
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

           if (tick2 == (e.target.parentElement.querySelectorAll('.slide').length - 3)) {
               hideSliderArrow(2, 1);
           }
           if (tick2 >= 1) {
               showSliderArrow(2, 0);
           }

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
       }
       //var width = parseFloat(getComputedStyle(slides_wrapper.querySelector('.slide')).width);
       //slides_wrapper.style.right = tick2 * width + "px";
       slides_wrapper.style.transform = "translateX(-" + tick2 * 100 / slides_wrapper.querySelectorAll('.slide').length + "%)";

   }
      
      
      
      
      
      
      
      
      
      
      
      
      
      
  })();