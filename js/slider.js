;
(function () {
	'use strict';

	var

		slides_amount,
		wrapper,
		slide,
		pag,
		pag_index,
		element,
		slides_wrapper,


		tick = 0,
		slider = document.getElementsByClassName('slider');


	/**
	 * create pagination for slider
	 * @param {number} slider_num [number of slider on page]
	 */

	function createNav(slider_num) {
		wrapper = slider[slider_num].querySelector('.slides_wrapper');
		slide = wrapper.querySelectorAll('.slide');
		pag = slider[slider_num].querySelector('.pagination');
		slides_amount = slide.length;
		if (pag) {
			for (var i = 0; i < slides_amount; i++) {
				var new_elem = document.createElement('div');
				new_elem.className = 'nav_item';
				new_elem.addEventListener('click', sliderMove);
				var full_elem = pag.querySelector('div').appendChild(new_elem).setAttribute('data-slide', i);

				if (i === 0) {
					new_elem.classList.add('active');
				}
			}
		}

	};

	/**
	 * for slider with pagination
	 * @param {object} slide_index [clicked element]
	 */

	function sliderMove(slide_index) {
		pag_index = slide_index.target.getAttribute('data-slide');
		var nav_item = slide_index.target.parentElement.getElementsByClassName('nav_item');
		for (var j = 0; j < nav_item.length; j++) {
			nav_item[j].classList.remove('active')
		}
		slide_index.target.classList.add('active');
		slides_wrapper = slide_index.target.parentElement.parentElement.parentElement.querySelector('.slides_wrapper');
		var width = parseFloat(getComputedStyle(slides_wrapper.querySelector('.slide')).width);
		slides_wrapper.style.right = pag_index * width + "px";
	}





	/**
	 * for slider with arrows where moving all slide
	 * @param {object} e [clicked element]
	 */

	function sliderArrowMove(e) {
		if (e.target.getAttribute('data-direction') == 'right' && tick != 0) {
			tick -= 1
		} else if (e.target.getAttribute('data-direction') == 'left' && tick != (e.target.parentElement.querySelectorAll('.slide').length - 1)) {
			tick += 1
		}
		slides_wrapper = e.target.parentElement.querySelector('.slides_wrapper');
		var width = parseFloat(getComputedStyle(slides_wrapper.querySelector('.slide')).width);
		slides_wrapper.style.right = tick * width + "px";
		console.log(e.target.parentElement.querySelectorAll('.slide').length)

	}
	/**
	 * add listener for arrows at slider with arrows where moving all slide
	 */

	function getArrows() {
		for (var i = 0; i < document.querySelectorAll('.review .slider .arrow').length; i++) {

			document.querySelectorAll('.review .slider .arrow')[i].addEventListener('click', sliderArrowMove)
		}
	}


	getArrows();






	/**
	 * set width of slider_wrapper
	 */

	function setSliderWidth() {
		for (var i = 0; i < slider.length; i++) {
			slide = slider[i].getElementsByClassName('slide');
			var width = parseFloat(getComputedStyle(slide[0]).width);
			slider[i].querySelector('.slides_wrapper').style.width = width * slide.length + "px";
			if (i == 1) {
				slider[i].querySelector('.slides_wrapper').style.width = (width + 2) * slide.length + "px";
			}


		}
	}




	createNav(0);
	setSliderWidth();


	/**
	 * add listener for arrows at slider with arrows where moving part of slide
	 */

	function getArrowsInParticularSlider() {
		for (var i = 0; i < document.querySelectorAll('.team .slider .arrow').length; i++) {

			document.querySelectorAll('.team .slider .arrow')[i].addEventListener('click', sliderArrowMoveInParticularSlider)
		}
	}
	getArrowsInParticularSlider()
		/**
		 * for slider with arrows where moving part of slide
		 * @param {object} e [clicked element]
		 */

	function sliderArrowMoveInParticularSlider(e) {
		slides_wrapper = e.target.parentElement.querySelector('.slides_wrapper');
		var slide_position = slides_wrapper.querySelectorAll('.slide'),
			next, prev;

		if (e.target.getAttribute('data-direction') == 'right' && tick != 0) {
			tick -= 1;


			for (var j = 0; j < slide_position.length; j++) {
				var position = slide_position[j].getAttribute('data-slide-position');
				if (position == 'right') {
					slide_position[j].removeAttribute('data-slide-position');
				} else if (position == 'top') {
					slide_position[j].setAttribute('data-slide-position', 'right')
				} else if (position == 'left') {
					slide_position[j].setAttribute('data-slide-position', 'top');
					prev = slide_position[j].previousElementSibling;
				}
			}
			prev.setAttribute('data-slide-position', 'left');


		} else if (e.target.getAttribute('data-direction') == 'left' && tick != (e.target.parentElement.querySelectorAll('.slide').length - 3)) {
			tick += 1;

			for (var j = 0; j < slide_position.length; j++) {
				var position = slide_position[j].getAttribute('data-slide-position');
				if (position == 'left') {
					slide_position[j].removeAttribute('data-slide-position');
				} else if (position == 'top') {
					slide_position[j].setAttribute('data-slide-position', 'left')
				} else if (position == 'right') {
					slide_position[j].setAttribute('data-slide-position', 'top');
					next = slide_position[j].nextElementSibling;
				}
			}
			next.setAttribute('data-slide-position', 'right');




		}



		var width = parseFloat(getComputedStyle(slides_wrapper.querySelector('.slide')).width);
		slides_wrapper.style.right = tick * width + "px";


	}




	function setModalButton() {
		document.getElementsByClassName('modal')[0].setAttribute('hidden', '');
		for (var i = 0; i < document.getElementsByClassName('submit_app_btn').length; i++) {
			document.getElementsByClassName('submit_app_btn')[i].addEventListener('click', modalOpen);
		}
		document.querySelector('.modal .close').addEventListener('click', modalClose);
	}
	setModalButton();

	function modalOpen() {
		document.getElementsByClassName('modal')[0].removeAttribute('hidden');
		document.getElementsByTagName('body')[0].classList.add('hidden');
	}

	function modalClose() {
		document.getElementsByClassName('modal')[0].setAttribute('hidden', '');
		document.getElementsByTagName('body')[0].classList.remove('hidden');
	}









	/*change color of fixed nav block when scrolled under nth px*/
	var header = document.getElementsByTagName('header')[0];
	var header_height = header.offsetHeight;

	function changeHeaderColor() {
		header.getElementsByClassName('header_bg')[0].setAttribute('hidden', '');
		if (window.pageYOffset > 0) {
			header.getElementsByClassName('header_bg')[0].removeAttribute('hidden');

		} else {
			header.getElementsByClassName('header_bg')[0].setAttribute('hidden', '');

		}
	}
	changeHeaderColor();
	window.addEventListener('scroll', changeHeaderColor);


	/*window.onload = function () {
		nav_color();
		height_above_form = heightAboveForm();
	};
	window.onresize = function () {
		height_above_form = heightAboveForm();
	};*/



	/*			Scrolling to form			*/

	function calcPageHeight() {
		var total = 0;
		for (var i = 0; i < document.body.children.length; i++) {
			total += document.body.children[i].offsetHeight;

		}
		total -= header_height;

		return total;
	}
	//var contacts_position = // document.querySelector('footer .contacts').


	var contact_position = calcPageHeight() - document.getElementsByTagName('footer')[0].offsetHeight - header_height;


	document.getElementById('cont_btn').addEventListener('click', scrollingButtonAction)

	function scrollingButtonAction(e) {

		var button_coord = e.pageY;
		e.preventDefault();

		var scroll_interval = setInterval(function scrolling() {
			arguments[1] = contact_position;
			console.log(arguments[1]);
			arguments[2] = 'footer .contacts';

			if (button_coord < arguments[1]) {
				window.scrollBy(0, 70);
				if (window.pageYOffset >= arguments[1]) {
					clearInterval(scroll_interval);
					document.querySelector(arguments[2]).scrollIntoView(false)
				}
			} else if (button_coord > arguments[1]) {
				window.scrollBy(0, -70);
				if (window.pageYOffset <= arguments[1] + 140) {
					clearInterval(scroll_interval);
					document.querySelector(arguments[2]).scrollIntoView(false)
				}
			}
		}, 30);


	}









})();