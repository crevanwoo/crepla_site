;
var window_offset;
var aspect_ratio = 1280 / 900;
var mark;
var version;
checkSize();
setDefaultVersion();

	$(window).on('resize', checkSize)

	
	function checkSize(){
		if (window.innerWidth / window.innerHeight > aspect_ratio) {
			mark = true;
			version = "desktop";
			
			
		} else  {
			mark = false;
			version = "tablet";
			
			
		}	
	}

	function setDefaultVersion(){
		if (mark) {			
			version = "desktop";			
			
		} else  {		
			version = "tablet";		
			
		}	
	}



(function () {
    'use strict';

    if ($('.work_content').length > 0) {

        $('body').css('overflow', 'auto')
    }





    // Show/hide footer on header in button click

    document.querySelector('#cont_btn').addEventListener('click', function (e) {
        e.preventDefault();
        $('footer').addClass('active');
    })

    document.querySelector('.footer_close').addEventListener('click', function () {
        $('footer').removeClass('active');
    })

    /* -----------------------------------------  Header ----------------------------------------- */




    /* Sliding header elems when page has loaded */



    function addTransitionClassToHeaderElems() {
        var header_elem = document.querySelectorAll('header nav ul li, header nav .logo, header .contacts .tel, header .contacts .lang_btn, header .contacts .submit_app_btn ');
        for (var i = 0; i < header_elem.length; i++) {
            header_elem[i].classList.add('trans_right');
        }
    }


    function slideHeaderElems() {
        var header_elem = document.querySelectorAll('.trans_right');
        var i = 0;
        var interval = setInterval(function () {
            if (i < header_elem.length) {
                header_elem[i].classList.remove('trans_right');
                i++
            } else(clearInterval(interval))
        }, 300)
    }


    addTransitionClassToHeaderElems(); //this commented on the site
    slideHeaderElems(); //this commented on the site



    /**
     * show header lang onhover
     * @param {object} e [[lang elem]]
     */

    if (document.getElementsByClassName('tel_num').length > 0 && device.desktop()) {
        for (var i = 0; i < document.getElementsByClassName('tel_num').length; i++) {
            document.getElementsByClassName('tel_num')[i].addEventListener('mouseenter', showHeaderTel);
            document.getElementsByClassName('tel_num')[i].addEventListener('mouseleave', hideHeaderTel);
        }
    }


    function showHeaderTel(e) {
        for (var i = 1; i < document.querySelector('header .contacts .tel').getElementsByClassName('tel_num').length; i++) {
            document.querySelector('header .contacts .tel').getElementsByClassName('tel_num')[i].removeAttribute('hidden');
        }
        document.querySelector('header .contacts .tel').querySelector('span').classList.add('active');
        document.querySelector('header .contacts .tel').classList.add('active');
    }

    function hideHeaderTel(e) {
        for (var i = 1; i < document.querySelector('header .contacts .tel').getElementsByClassName('tel_num').length; i++) {
            document.querySelector('header .contacts .tel').getElementsByClassName('tel_num')[i].setAttribute('hidden', '');
        }
        document.querySelector('header .contacts .tel').querySelector('span').classList.remove('active');
        document.querySelector('header .contacts .tel').classList.remove('active');

    }


    /**
     * elem on tel header
     */
    function createElemsForTablets() {
        if (!device.desktop() && document.querySelector('header .contacts .tel')) {
            var area = document.createElement('div');
            document.querySelector('header .contacts .tel').appendChild(area);
            area.classList.add('correct_work_on_tablet');
        }
    }
    createElemsForTablets();


    /**
     * [show header tels on tablets]
     */
    function tabletHeaderTelToggle() {
        if (document.querySelector('.correct_work_on_tablet').classList.contains('active')) {
            document.querySelector('.correct_work_on_tablet').classList.remove('active');
            hideHeaderTel()
        } else {
            document.querySelector('.correct_work_on_tablet').classList.add('active');
            showHeaderTel()
        }
    }


    if (document.querySelector('.correct_work_on_tablet')) {
        document.querySelector('.correct_work_on_tablet').addEventListener('click', tabletHeaderTelToggle);
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






    /**
     * for header menus
     * @param {object} e [clicked elem]
     */
    function checkTarget(e) {
        if (document.getElementsByClassName('lang').length > 0) {
            if (!e.target.classList.contains('lang') || (e.target.classList.contains('lang') && e.target.classList.contains('active'))) {
                if (e.target.classList.contains('lang')) {
                    e.target.classList.remove('active')
                }
                hideElems('lang');
                if (e.target.parentElement.querySelector('.arrow')) {
                    e.target.parentElement.querySelector('.arrow').classList.remove('active')
                }
            } else if (e.target.classList.contains('lang')) {
                showElems('lang');
                if (e.target.parentElement.querySelector('.arrow')) {
                    e.target.parentElement.querySelector('.arrow').classList.add('active')
                }
            }
        }
    }

    window.addEventListener('click', checkTarget);
    window.addEventListener('touchstart', checkTarget);



    /* ----------------------------------------- < HEADER ----------------------------------------- */



    /* ----------------------------------------- PLANETS > ----------------------------------------- */



    /**
     * add listeners for animated planets glowing
     */
    function manageGlowing() {
        var elem = document.querySelectorAll('.work_directions .wrapper .direction .direction_wrapper .service');
        for (var i = 0; i < elem.length; i++) {
            elem[i].addEventListener('mouseenter', showGlowing);
            elem[i].addEventListener('mouseleave', hideGlowing);
        }
    };
    manageGlowing();


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
    };
    createGlowingPlanets();

    /**
     * tuning of glowing planets
     */
    function glowingPlanet() {
        var img = document.querySelectorAll('.work_directions .wrapper .direction .direction_wrapper .service img'),
            planet = document.querySelectorAll('.work_directions .wrapper .direction .direction_wrapper .service .glowing');
        for (var i = 0; i < planet.length; i++) {
            planet[i].style.left = '5%';
            planet[i].style.top = img[i].offsetHeight / 4 + 'px';
            planet[i].style.width = '20%';
            planet[i].style.height = img[i].offsetHeight / 2 + 'px';
        }
    };
    glowingPlanet();

    function showGlowing(e) {
        e.target.querySelector(".glowing").classList.add('active');
    }

    function hideGlowing(e) {
        e.target.querySelector(".glowing").classList.remove('active');
    }


    /* ----------------------------------------- < PLANETS ----------------------------------------- */


    /* ----------------------------------------- HIGHSLIDE FIX > ----------------------------------------- */




    /**
     * [highslide run as modal window]
     */
    function bodyFixOn() {
        var body_width = document.body.offsetWidth;
        window_offset = window.pageYOffset;
        document.body.style.marginRight = window.innerWidth - body_width + "px";
        document.body.style.width = body_width + "px";
        document.body.style.top = "-" + window_offset + "px";
        document.body.classList.add('hidden');
        document.querySelector('header').style.display = "none";
        addStyleForHighslide()
    }

    /* replace to highslide.js
    function bodyFixOut() {
         document.body.style.marginRight = 0;
         document.body.style.width = (document.body.offsetHeight >= 1200) ? "100%" : "100vw";
         document.body.classList.remove('hidden');
         window.scrollTo(0, window_offset);
         document.body.removeChild(document.querySelector('.style_tag'))
     }*/


    /**
     * [calc height for slide depends on window height and add style on page]
     */
    function addStyleForHighslide() {
        var height = window.innerHeight - 30;
        var div = document.createElement('div');
        var style = document.createElement('style');
        document.body.appendChild(div);
        div.appendChild(style);
        div.classList.add('style_tag');
        var newtext = document.createTextNode('.highslide-container {position: fixed !important; overflow: auto !important; height: ' + height + 'px !important} .highslide-wrapper {width: 1200rem !important; height: auto !important;     margin: auto !important; left: 0!important; right: 0; !important} .highslide-image {width: 100% !important; height: auto !important} .drop-shadow {display: none !important}');
        style.appendChild(newtext);
    }
    /**
     * [on page 'works' add listener on links bounded with highslide module ]
     */
    function highSlidePopUp() {
        var slide_link = document.querySelectorAll('.work_content a.highslide');
        if (slide_link.length > 0) {
            for (var i = 0; i < slide_link.length; i++) {
                slide_link[i].addEventListener('click', bodyFixOn)
            }
        }
    };
    highSlidePopUp();

    /* ----------------------------------------- < HIGHSLIDE FIX ----------------------------------------- */



    /* ----------------------------------------- FORMS > ----------------------------------------- */

    if (document.getElementsByTagName('button')) {
        addButtonListener()
    }


    /**
     * listener for change color of invalid field
     */
    function addButtonListener() {
        var form_button = document.getElementsByTagName('button')
        for (var i = 0; i < form_button.length; i++) {
            form_button[i].addEventListener('click', changeInvalidColor)
        }
    }
    /**
     * change color of input form if there is wrong value
     * @param {object} e [get clicked element (search in it's parent)]
     */
    function changeInvalidColor(e) {
        var form_input = e.target.parentElement.getElementsByTagName('input');
        for (var i = 0; i < form_input.length; i++) {
            form_input[i].classList.add('valid')
        }
    }



    /* ----------------------------------------- < FORMS ----------------------------------------- */


    /* ----------------------------------------- OTHER > ----------------------------------------- */



    function createRedLine() {
        var title = document.querySelectorAll('.performed_works .main_h, .review .main_h, .team .main_h');

        if (title.length > 2) {
            for (var i = 0; i < title.length; i++) {
                var elem = document.createElement('div')
                var line = title[i].appendChild(elem);
                line.classList.add('thin_red_line');
            }
        }
    }

    createRedLine();


    /* ----------------------------------------- < OTHER ----------------------------------------- */


})();




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




function fixBodyForSafari() {

    $('body').addClass('fix_for_safari');

}



function unfixBodyForSafari() {

    $('body').removeClass('fix_for_safari');

}


/* HEADER & FOOTER > */


function changeHeaderColor() {
    if ($("header").length > 0) {
        if (window.pageYOffset > 0) {
            showHeaderBg();
        } else {
            hideHeaderBg();
        }
    }
}

function showHeaderBg() {
    $('header .header_bg').css('opacity', '0.9');
}

function hideHeaderBg() {
    $('header .header_bg').css('opacity', '0');
}



function addHeaderContactButton() {
    if (window.innerWidth / window.innerHeight > aspect_ratio) {

        document.querySelector('#cont_btn').addEventListener('click', function (e) {
            e.preventDefault();
            $('footer').addClass('active');
        })

        document.querySelector('.footer_close').addEventListener('click', function (e) {
            e.preventDefault();
            $('footer').removeClass('active');
        })
    }

}

addHeaderContactButton();



function manageHeader() {
    if (window.innerWidth / window.innerHeight <= aspect_ratio || $('.work_content').length > 0) {
        unfixBodyForSafari();
        window.addEventListener('scroll', changeHeaderColor);
    } else {
        window.removeEventListener('scroll', changeHeaderColor);
    }
}

manageHeader();

function setFooterOffset() {
    if (window.innerWidth / window.innerHeight > aspect_ratio && $('.work_directions').length > 0 || $('.best_works_screen').length > 0 || $('.work_content').length > 0 ) {
        $('footer').css('bottom', -$('footer').innerHeight());
    }
	else { $('footer').css('bottom', 0);}
}
setFooterOffset()

$(window).on('resize', setFooterOffset)



/* < HEADER & FOOTER */
