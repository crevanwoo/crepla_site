;
(function () {
	if (window.innerWidth / window.innerHeight > 1221 / 696) {

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
			if (document.querySelector(selector)) {
				document.querySelector(selector).style.transition = GlobalVariables.transition_time + "ms";
			}
		}

		addTransitionTime('.main_wrapper');
		addTransitionTime('.single_work:nth-of-type(1)');
		addTransitionTime('.single_work:nth-of-type(1) >div:nth-of-type(1)');
		addTransitionTime('.single_work:nth-of-type(1) >div:nth-of-type(2)');
		addTransitionTime('.single_work:nth-of-type(2)');
		addTransitionTime('.single_work:nth-of-type(3)');
		addTransitionTime('.single_work:nth-of-type(4)');
		addTransitionTime('.single_work:nth-of-type(5) >div:nth-of-type(1)');
		addTransitionTime('.single_work:nth-of-type(5) >div:nth-of-type(2)');
		addTransitionTime('.single_work:nth-of-type(6)');









		/**
		 * change color of fixed nav block when scrolled under nth px
		 */



		function changeHeaderColor() {
			var header = document.querySelector('header');
			if (header) {
				if (GlobalVariables.screen_num > 1) {
					header.getElementsByClassName('header_bg')[0].style.opacity = "0.9";

				} else {
					header.getElementsByClassName('header_bg')[0].style.opacity = "0";

				}
			}
		}

		window.addEventListener('touchstart', changeHeaderColor);
		window.addEventListener('wheel', changeHeaderColor);
		window.addEventListener('keydown', changeHeaderColor);





		var ScrollDirection = {

			getKeyCode: function (e) {
				if (e.keyCode == 40) {
					return 'down'
				} else if (e.keyCode == 38) {
					return 'up'
				}
			},

			getTouchCoord: function (e) {
				return e.touches[0].clientY
			},

			getSwipeDirection: function (e) {
				if (e.type == 'touchstart') {
					this.firstCoord = this.getTouchCoord(e);
					this.lastCoord = NaN;
				} else if (e.type == 'touchmove') {
					this.lastCoord = this.getTouchCoord(e);
				} else {
					if (this.lastCoord - this.firstCoord > GlobalVariables.touch_sensitivity) {
						return 'up';
					} else if (this.lastCoord - this.firstCoord < -GlobalVariables.touch_sensitivity) {
						return 'down';
					}
				}

			},

			getWheelDirection: function (e) {
				if (e.deltaY > 0) {
					return 'down'
				} else if (e.deltaY < 0) {
					return 'up'
				}
			},

			defineScrollDirection: function (e) {
				if (e.type == "keydown") {
					return this.getKeyCode(e);
				} else if (e.type == "touchstart" || e.type == "touchmove" || e.type == "touchend") {
					return this.getSwipeDirection(e);
				} else if (e.type == "wheel") {
					return this.getWheelDirection(e);
				}
			},

		}



		// Show/hide footer on header in button click

		document.querySelector('#cont_btn').addEventListener('click', function () {
			addClass('footer', 'active');
		})

		document.querySelector('.footer_close').addEventListener('click', function () {
			removeClass('footer', 'active');
		})









		// Вспомогательные 

		function getFullScreen(coord) {
			return document.querySelector('.main_wrapper').style.top = coord;
		}

		function addClass(selector, classSelector) {
			document.querySelector(selector).classList.add(classSelector);
		}

		function removeClass(selector, classSelector) {
			document.querySelector(selector).classList.remove(classSelector);
		}

		function setHeight(selector) {
			document.querySelector(selector).style.height = getHeight(selector) + 'px';
		}

		function getHeight(selector) {
			return document.querySelector(selector).offsetHeight
		}



		function removeAllClassesFromPortfolio() {
			var work = document.querySelectorAll('.single_work');
			for (var i = 0; i < work.length; i++) {
				displayOff(work[i])
			}

			removeClass('.single_work:nth-of-type(1) >div:nth-of-type(1)', 'active');
			removeClass('.single_work:nth-of-type(1) >div:nth-of-type(2)', 'active');
			removeClass('.single_work:nth-of-type(1)', 'remove');
			removeClass('.single_work:nth-of-type(2)', 'active');
			removeClass('.single_work:nth-of-type(2)', 'remove');
			removeClass('.single_work:nth-of-type(3)', 'active');
			removeClass('.single_work:nth-of-type(3)', 'remove');
			removeClass('.single_work:nth-of-type(4)', 'active');
			removeClass('.single_work:nth-of-type(4)', 'remove');
			removeClass('.single_work:nth-of-type(5) >div:nth-of-type(1)', 'active');
			removeClass('.single_work:nth-of-type(5) >div:nth-of-type(2)', 'active');
			removeClass('.single_work:nth-of-type(5) >div:nth-of-type(2)', 'remove');
			removeClass('.single_work:nth-of-type(6)', 'active');



		}





		function translateBody(direction) {
			switch (GlobalVariables.screen_num) {
			case 1:
				if (direction == "down") {
					getFullScreen(screen_effect.scr2);
					showUnderlinePlanets();
					GlobalVariables.screen_num++;
				}
				break;
			case 2:
				if (direction == "down") {
					addClass('.scroll_mouse', 'active');
					getFullScreen(screen_effect.scr3);
					displayOn('.single_work:nth-of-type(1)');
					displayOn('.single_work:nth-of-type(2)');
					displayOn('.single_work:nth-of-type(3)');
					displayOn('.single_work:nth-of-type(4)');
					setTimeout(function () {
						addClass('.single_work:nth-of-type(1) >div:nth-of-type(1)', 'active');
						addClass('.single_work:nth-of-type(1) >div:nth-of-type(2)', 'active');

					}, GlobalVariables.transition_time);
					setTimeout(function () {
						$('.single_work:nth-of-type(1) .hover_logo').css('display', 'block');

					}, GlobalVariables.transition_time * 2);



					GlobalVariables.screen_num++;

				} else if (direction == "up") {
					getFullScreen(screen_effect.scr1);
					GlobalVariables.screen_num--;
				}
				break;
			case 3:
				if (direction == "down") {

					addClass('.single_work:nth-of-type(2)', 'active');
					GlobalVariables.screen_num++;

				} else if (direction == "up") {

					removeClass('.scroll_mouse', 'active');
					removeClass('.single_work:nth-of-type(1) >div:nth-of-type(1)', 'active');
					removeClass('.single_work:nth-of-type(1) >div:nth-of-type(2)', 'active')
					displayOff('.single_work:nth-of-type(1)');
					displayOff('.single_work:nth-of-type(2)');
					displayOff('.single_work:nth-of-type(3)');
					displayOff('.single_work:nth-of-type(4)');

					setTimeout(function () {
						getFullScreen(screen_effect.scr2);
					}, GlobalVariables.transition_time)


					$('.single_work:nth-of-type(1) .hover_logo').css('display', 'none');
					GlobalVariables.screen_num--
				}
				break;
			case 4:
				if (direction == "down") {
					addClass('.single_work:nth-of-type(3)', 'active');
					GlobalVariables.screen_num++;
				} else if (direction == "up") {
					removeClass('.single_work:nth-of-type(2)', 'active');
					GlobalVariables.screen_num--
				}
				break;
			case 5:
				if (direction == "down") {

					displayOn('.single_work:nth-of-type(5)');
					displayOn('.single_work:nth-of-type(6)');

					addClass('.single_work:nth-of-type(1)', 'remove');
					addClass('.single_work:nth-of-type(2)', 'remove');
					addClass('.single_work:nth-of-type(3)', 'remove');
					addClass('.single_work:nth-of-type(4)', 'active');

					$('.single_work:nth-of-type(1) .hover_logo').css('display', 'none');

					GlobalVariables.screen_num++;
				} else if (direction == "up") {
					removeClass('.single_work:nth-of-type(3)', 'active');

					GlobalVariables.screen_num--;
				}
				break;
			case 6:
				if (direction == "down") {

					addClass('.single_work:nth-of-type(4)', 'remove');
					addClass('.single_work:nth-of-type(5) >div:nth-of-type(2)', 'active');
					addClass('.single_work:nth-of-type(5) >div:nth-of-type(1)', 'active');
					displayOff('.single_work:nth-of-type(1)');
					displayOff('.single_work:nth-of-type(2)');
					displayOff('.single_work:nth-of-type(3)');

					$('.single_work:nth-of-type(5) .hover_logo').css('display', 'block');




					GlobalVariables.screen_num++;
				} else if (direction == "up") {
					removeClass('.single_work:nth-of-type(1)', 'remove');
					removeClass('.single_work:nth-of-type(2)', 'remove');
					removeClass('.single_work:nth-of-type(3)', 'remove');
					removeClass('.single_work:nth-of-type(4)', 'active');
					displayOff('.single_work:nth-of-type(5)');
					displayOff('.single_work:nth-of-type(6)');

					$('.single_work:nth-of-type(1) .hover_logo').css('display', 'block');


					GlobalVariables.screen_num--;
				}
				break;
			case 7:
				if (direction == "down") {
					addClass('.single_work:nth-of-type(5) >div:nth-of-type(2)', 'remove');
					removeClass('.single_work:nth-of-type(5) >div:nth-of-type(1)', 'active');
					addClass('.single_work:nth-of-type(6)', 'active');

					$('.single_work:nth-of-type(5) .hover_logo').css('display', 'none');
					GlobalVariables.screen_num++

				} else if (direction == "up") {


					removeClass('.single_work:nth-of-type(4)', 'remove');
					removeClass('.single_work:nth-of-type(5) >div:nth-of-type(2)', 'active');
					removeClass('.single_work:nth-of-type(5) >div:nth-of-type(1)', 'active');
					displayOn('.single_work:nth-of-type(1)');
					displayOn('.single_work:nth-of-type(2)');
					displayOn('.single_work:nth-of-type(3)');

					$('.single_work:nth-of-type(5) .hover_logo').css('display', 'none');


					GlobalVariables.screen_num--;
				}

				break;
			case 8:
				if (direction == "down") {
					getFullScreen(screen_effect.scr4);
					setHeight('.scroll_container_wrapper .scroll_block');
					addClass('.scroll_mouse', 'remove');

					GlobalVariables.screen_num++;

				} else if (direction == "up") {

					removeClass('.single_work:nth-of-type(5) >div:nth-of-type(2)', 'remove');
					addClass('.single_work:nth-of-type(5) >div:nth-of-type(1)', 'active');

					removeClass('.single_work:nth-of-type(6)', 'active');

					$('.single_work:nth-of-type(5) .hover_logo').css('display', 'block');

					GlobalVariables.screen_num--
				}

				break;
			case 9:
				if (direction == "down") {
					document.querySelector('.scroll_marker').value = "true";
					if (document.querySelector('.scroll_position').value == "end") {
						addClass('footer', 'active');
					}
				} else if (direction == "up") {
					console.log(GlobalVariables.screen_num);
					document.querySelector('.scroll_marker').value = "";
					if (document.querySelector('footer').classList.contains('active')) {
						removeClass('footer', 'active');
					} else if (document.querySelector('.scroll_container').style.transform == "translateY(0px)") {
						document.querySelector('.scroll_marker').value = "";
						getFullScreen(screen_effect.scr3);
						GlobalVariables.screen_num--;
					} else {
						document.querySelector('.scroll_marker').value = "true";
					}
				}
				break;
			}
		}





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
				GlobalVariables.scroll_mark = true
			}, time)
		}


		// Scroll to position from header button 

		document.querySelector('#works_btn').addEventListener('click', function () {
			changeHeaderColor();
			removeClass('footer', 'active');
			if (GlobalVariables.screen_num > 8) {
				getFullScreen(screen_effect.scr3);
				GlobalVariables.screen_num = 8;
			} else if (GlobalVariables.screen_num < 3) {
				GlobalVariables.screen_num = 2;
				translateBody('down');
			}
		})



		document.querySelector('#offers_btn').addEventListener('click', function () {
			getFullScreen(screen_effect.scr2);
			GlobalVariables.screen_num = 2;
			changeHeaderColor();
			removeClass('footer', 'active');
			removeAllClassesFromPortfolio()
		})





		document.querySelector('.scroll_container').style.transform = "translateY(0px)";




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
				console.log(scrolled_distance_num + '' + scroll_container_height);

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









		var port = document.querySelectorAll('.dynamic_portfolio >div');







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

		function addHoverToWideImagesPortfolio(i) {
			port[i].addEventListener('mouseenter',
				function (e) {
					hoverShow(e)
				});

			port[i].addEventListener('mouseleave',
				function (e) {
					hoverHide(e)
				});
			port[i].addEventListener('click',
				function (e) {
					goToWorkPage(e)
				});
		}

		addHoverToWideImagesPortfolio(0)

		addHoverToWideImagesPortfolio(4)





		function hoverShow(e) {
			e.target.querySelector('.hover_logo').classList.add('active');
		}


		function hoverHide(e) {
			e.target.querySelector('.hover_logo').classList.remove('active');
		}

		function goToWorkPage(e) {
			document.location.href = e.target.querySelector('a').getAttribute('href');
		}



		addPortfolioListeners()


		function displayOn(selector) {
			document.querySelector(selector).style.display = "block"

		}

		function displayOff(selector) {
			setTimeout(function () {
				document.querySelector(selector).style.display = "none"
			}, GlobalVariables.transition_time)
		}





		$('.single_work:nth-of-type(6)').on('mouseenter', function () {
			$(this).find('div').addClass('active');
		})


		$('.single_work:nth-of-type(6)').on('mouseleave', function () {
			$(this).find('div').removeClass('active');
		})






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






	}
})();