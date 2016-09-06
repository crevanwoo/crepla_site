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
		tick = 0,
		slider = document.getElementsByClassName('slider'),
		header = document.getElementsByTagName('header')[0],
		header_height = header.offsetHeight,
		contact_position = calcPageHeight() - document.getElementsByTagName('footer')[0].offsetHeight - header_height,
		offers_position = document.getElementsByClassName('top_offer')[0].offsetHeight - header_height,
		works_position = document.getElementsByClassName('top_offer')[0].offsetHeight + document.getElementsByClassName('work_directions')[0].offsetHeight - header_height;

	/* --- create elements --- */

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


	/* --- sizes --- */

	/**
	 * set width of slider_wrapper
	 */
	function setSliderWidth() {
		for (var i = 0; i < slider.length; i++) {
			slide = slider[i].getElementsByClassName('slide');
			var width = parseFloat(getComputedStyle(slide[0]).width);
			//slider[i].querySelector('.slides_wrapper').style.width = width * slide.length + "px";
			//if (i == 1) {
			//slider[i].querySelector('.slides_wrapper').style.width = (width + 2) * slide.length + "px";
			//}

			slider[i].querySelector('.slides_wrapper').style.width = (width + 2) * slide.length + "px";
			if (i == 1) {
				slider[i].querySelector('.slides_wrapper').style.width = (width + 3) * slide.length + "px";
			}
		}
	}

	/**
	 * total page height
	 * @returns {num} [page_height]
	 */
	function calcPageHeight() {
		var total = 0;
		for (var i = 0; i < document.body.children.length; i++) {
			total += document.body.children[i].offsetHeight;
		}
		total -= header_height;
		return total;
	}

	/**
	 * Define to what elem should scrolling in setTimeOut func 
	 * first param: which elem I want to see 
	 * second param: border when scrolling should stop (created additional element for fixed header offset)
	 */
	function setScrollingArguments1() {
		elem_position = contact_position;
		elem_name = 'footer .invisible_scroll'
	}

	function setScrollingArguments2() {
		elem_position = offers_position;
		elem_name = 'section.work_directions .invisible_scroll'
	}

	function setScrollingArguments3() {
		elem_position = works_position;
		elem_name = 'section.performed_works .invisible_scroll'
	}

	/**
	 * set actual parameters of fixed header for invisible elem, which define, when scrolling stops. inisible elem should be put at the top part of relatively position elem where I want to stop scrolling
	 */
	function setElemForPropertyScrolling() {
		for (var i = 0; i < document.getElementsByClassName('invisible_scroll').length; i++) {
			document.getElementsByClassName('invisible_scroll')[i].style.height = header_height + "px";
			document.getElementsByClassName('invisible_scroll')[i].style.top = "-" + header_height + "px";
		}
	}

	/* --- sliders --- */

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
			console.log('2slider')
		}
		var width = parseFloat(getComputedStyle(slides_wrapper.querySelector('.slide')).width);
		slides_wrapper.style.right = tick * width + "px";
	}

	/* events */

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
		document.getElementsByClassName('modal')[0].setAttribute('hidden', '');
		for (var i = 0; i < document.getElementsByClassName('submit_app_btn').length; i++) {
			document.getElementsByClassName('submit_app_btn')[i].addEventListener('click', modalOpen);
		}
		document.querySelector('.modal .close').addEventListener('click', modalClose);
	}

	window.addEventListener('scroll', changeHeaderColor);
	document.getElementById('cont_btn').addEventListener('click', scrollingButtonAction);
	document.getElementById('cont_btn').addEventListener('click', setScrollingArguments1);
	document.getElementById('offers_btn').addEventListener('click', scrollingButtonAction);
	document.getElementById('offers_btn').addEventListener('click', setScrollingArguments2);
	document.getElementById('works_btn').addEventListener('click', scrollingButtonAction);
	document.getElementById('works_btn').addEventListener('click', setScrollingArguments3);

	/* --- other functions --- */

	/**
	 * modal_window
	 */
	function modalOpen() {
		document.getElementsByClassName('modal')[0].removeAttribute('hidden');
		document.getElementsByTagName('body')[0].classList.add('hidden');
	}

	function modalClose() {
		document.getElementsByClassName('modal')[0].setAttribute('hidden', '');
		document.getElementsByTagName('body')[0].classList.remove('hidden');
	}

	/**
	 * change color of fixed nav block when scrolled under nth px
	 */
	function changeHeaderColor() {
		header.getElementsByClassName('header_bg')[0].setAttribute('hidden', '');
		if (window.pageYOffset > 0) {
			header.getElementsByClassName('header_bg')[0].removeAttribute('hidden');
		} else {
			header.getElementsByClassName('header_bg')[0].setAttribute('hidden', '');
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

	/* calls */
	createNav(0);
	setSliderWidth();
	getArrows();
	getArrowsInParticularSlider();
	setModalButton();
	changeHeaderColor();
	setElemForPropertyScrolling()

})();