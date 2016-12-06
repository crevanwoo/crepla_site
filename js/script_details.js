

    /**
     * listener for change color of invalid field
     */
    function addButtonListener() {
        var form_button = document.getElementsByTagName('button')
        for (var i = 0; i < form_button.length; i++) {
            form_button[i].addEventListener('click', changeInvalidColor)
        }
    }






    /*  Show red line below titles when page scrolling */

    function showRedLine() {
        if (window.pageYOffset > (calcPageHeight() - document.getElementsByTagName('footer')[0].offsetHeight) - (document.querySelector('section.team').offsetHeight * 2)) {
            document.querySelector('section.team .main_h .thin_red_line').style.width = "100rem";
        } else if (window.pageYOffset >
            (document.querySelector('.slide_content_wrapper').offsetHeight + document.querySelector('.performed_works').offsetHeight + document.querySelector('.work_directions').offsetHeight)) {
            document.querySelector('section.review .main_h .thin_red_line').style.width = "100rem";
        } else if (window.pageYOffset > (document.querySelector('.slide_content_wrapper').offsetHeight + (document.querySelector('.work_directions').offsetHeight / 2))) {
            document.querySelector('section.performed_works .main_h .thin_red_line').style.width = "100rem";
        }
    }


    window.addEventListener('scroll', showRedLine)
    
    


    function createRedLine() {
        var title = document.querySelectorAll('.performed_works .main_h, .review .main_h, .team .main_h');
        for (var i = 0; i < title.length; i++) {
            var elem = document.createElement('div')
            var line = title[i].appendChild(elem);
            line.classList.add('thin_red_line');
        }
    }

    createRedLine();




    function zoomInImg(e) {
        e.target.querySelector('img').classList.add('zoom_img')
    }

    function zoomOutImg(e) {
        e.target.querySelector('img').classList.remove('zoom_img')
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











/* ----------------------------------------- HEADER > ----------------------------------------- */


    window.addEventListener('scroll', changeHeaderColor);
    /**
     * change color of fixed nav block when scrolled under nth px
     */
    function changeHeaderColor() {
        if (header) {
            if (window.pageYOffset > 0) {
                header.getElementsByClassName('header_bg')[0].style.opacity = "0.9";

            } else {
                header.getElementsByClassName('header_bg')[0].style.opacity = "0";

            }
        }
    }



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
        setInterval(function () {
            if (i < header_elem.length)
                header_elem[i].classList.remove('trans_right');
            i++
        }, 300)
    }


    addTransitionClassToHeaderElems();
    slideHeaderElems();






    /**
     * show header lang onhover
     * @param {object} e [[lang elem]]
     */

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
     * elem on tel header
     */
    function createElemsForTablets() {
        if (!device.desktop() && document.querySelector('header .contacts .tel')) {
            var area = document.createElement('div');
            document.querySelector('header .contacts .tel').appendChild(area);
            area.classList.add('correct_work_on_tablet');
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

    function showGlowing(e) {
        e.target.querySelector(".glowing").classList.add('active');
    }

    function hideGlowing(e) {
        e.target.querySelector(".glowing").classList.remove('active');
    }

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
    }

   

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
    }

/* ----------------------------------------- < HIGHSLIDE FIX ----------------------------------------- */



/* -----------------------------------------  ----------------------------------------- */




/* -----------------------------------------  ----------------------------------------- */


/* -----------------------------------------  ----------------------------------------- */



/* -----------------------------------------  ----------------------------------------- */





/* -----------------------------------------  ----------------------------------------- */


/* -----------------------------------------  ----------------------------------------- */



/* -----------------------------------------  ----------------------------------------- */



