var window_offset;

;



//for modal windows - create modal window with class "modal" and id, create trigger with "data-modal-id" attribute, with value is modal id. in func "set modal button" add trigger selector
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
        slider,
        header,
        slider_interval,

        // window_offset,
        tick1 = 0,
        tick2 = 0;

    /* --------------------------------------------- calls --------------------------------------------- */

    callFunctions();
    addListeners();
    setSliderWidth();
    getArrows();
    getArrowsInParticularSlider();
    setModalButton();
    setElemForPropertyScrolling();
    createGlowingPlanets();
    glowingPlanet();
    manageGlowing();
    hideSliderArrow(1, 0);
    hideSliderArrow(2, 0);
    checkIfSlidesExist();
    highSlidePopUp();




    function callFunctions() {
        slider = document.getElementsByClassName('slider');
        header = document.getElementsByTagName('header')[0];
        if (slider.length > 0) {
            createNav(0);
        }
        if (document.getElementsByClassName('slider')[2]) {
            setElemsAttr();
        }
    }

    /* --------------------------------------------- create elements --------------------------------------------- */

    /**
     * create pagination for slider and attr for slides
     * @param {number} slider_num [number of slider on page]
     */
    function createNav(slider_num) {
        wrapper = slider[slider_num].querySelector('.slides_wrapper');
        slide = wrapper.querySelectorAll('.slide');
        pag = slider[slider_num].querySelector('.pagination');
        slides_amount = slide.length;
        slide[0].classList.add('active'); //for fade in effect
        slide[0].querySelector('.slide_content_wrapper').style.opacity = "1"; //for fade in effect

        if (slide.length > 1 && pag) {
            for (var i = 0; i < slides_amount; i++) {
                var new_elem = document.createElement('div');
                new_elem.className = 'nav_item';
                new_elem.setAttribute('data-slide-num', i);
                new_elem.addEventListener('click', sliderMove);
                var full_elem = pag.querySelector('div').appendChild(new_elem) //.setAttribute('data-slide', i)
                ;
                slide[i].setAttribute('data-slide-num', i)
                if (i === 0) {
                    new_elem.classList.add('active');
                }
            }
        }
    };

    /**
     * set attr elems for slider with part slides
     */
    function setElemsAttr() {
        var slide_position = document.getElementsByClassName('slider')[2].querySelectorAll('.slide');
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

    /**
     * Hiding arrows when slides ends
     * @param {[[num]]} indexSlider [[index of slider on page]]
     * @param {[[num]]} indexArrow  [[index of arrow]]
     */

    function hideSliderArrow(indexSlider, indexArrow) {
        if (slider[indexSlider]) {
            slider[indexSlider].getElementsByClassName('arrow')[indexArrow].setAttribute('hidden', '');
        }

    }

    function showSliderArrow(indexSlider, indexArrow) {
        if (slider[indexSlider]) {
            slider[indexSlider].getElementsByClassName('arrow')[indexArrow].removeAttribute('hidden');
        }
    }

    function checkIfSlidesExist() {
        if (slider.length > 0) {
            if (slider[1].getElementsByClassName('slide').length === 1) {
                hideSliderArrow(1, 1)
            }
            if (slider[2].getElementsByClassName('slide').length < 4 && slider[2].getElementsByClassName('slide').length > 1) {
                hideSliderArrow(2, 1)
            }
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
    /* --------------------------------------------- sizes --------------------------------------------- */



    /**
     * set width of slider_wrapper
     */
    function setSliderWidth() {
        if (slider.length > 0) {
            for (var i = 1; i < slider.length; i++) {
                slide = slider[i].getElementsByClassName('slide');
                var width = slide[0].offsetWidth;
                if (window.innerWidth > 1200) {
                    slider[i].querySelector('.slides_wrapper').style.width = width * slide.length + "rem"
                } else {
                    slider[i].querySelector('.slides_wrapper').style.width = (width /*n px*/ * Math.ceil((100 / window.innerWidth) * 1000) / 1000) /*n vw*/ * 1000 / 82 * slide.length + "rem";
                }
            }
        }
    }

    /**
     * total page height
     * @returns {num} [page_height]
     */
    function calcPageHeight() {
        if (header) {
            var total = 0;
            for (var i = 0; i < document.body.children.length; i++) {
                total += document.body.children[i].offsetHeight;
            }
            total -= getHeaderHeight();
            return total;
        }
    }

    /**
     * Define to what elem should scrolling in setTimeOut func 
     * first param: which elem I want to see 
     * second param: border when scrolling should stop (created additional element for fixed header offset)
     */
    function setScrollingArguments0() {
        elem_position = "0";
        elem_name = 'body'
    }

    function setScrollingArguments1() {

        elem_position = calcPageHeight() - document.getElementsByTagName('footer')[0].offsetHeight - getHeaderHeight();
        elem_name = 'footer .invisible_scroll'
    }

    function setScrollingArguments2() {

        elem_position = document.getElementsByClassName('full_screen_slider')[0].offsetHeight - getHeaderHeight();
        elem_name = 'section.work_directions .invisible_scroll'
    }

    function setScrollingArguments3() {

        elem_position = document.getElementsByClassName('full_screen_slider')[0].offsetHeight + document.getElementsByClassName('work_directions')[0].offsetHeight - getHeaderHeight();
        elem_name = 'section.performed_works .invisible_scroll'
    }

    /**
     * set actual parameters of fixed header for invisible elem, which define, when scrolling stops. inisible elem should be put at the top part of relatively position elem where I want to stop scrolling
     */
    function setElemForPropertyScrolling() {
        for (var i = 0; i < document.getElementsByClassName('invisible_scroll').length; i++) {
            document.getElementsByClassName('invisible_scroll')[i].style.height = getHeaderHeight() + "px";
            document.getElementsByClassName('invisible_scroll')[i].style.top = "-" + getHeaderHeight() + "px";
        }
    }

    /**
     * get header height (for adaptivity)
     * @returns {[num]} [height of header]
     */
    function getHeaderHeight() {
        return header.offsetHeight;
    }

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

    /* --------------------------------------------- sliders --------------------------------------------- */

    /**
     * for slider with pagination
     * @param {object} slide_index [clicked element]
     */
    function sliderMove(slide_index) {
        var prev_index;
        var active_slide;
        pag_index = slide_index.target.getAttribute('data-slide-num');
        var nav_item = slide_index.target.parentElement.getElementsByClassName('nav_item');
        var slide = slide_index.target.parentElement.parentElement.parentElement.querySelector('.slide[data-slide-num="' + pag_index + '"]');
        for (var j = 0; j < nav_item.length; j++) {
            if (nav_item[j].classList.contains('active')) {
                prev_index = j;
                nav_item[j].classList.remove('active'); //change style of nav elem
                active_slide = slide_index.target.parentElement.parentElement.parentElement.querySelectorAll('.slide')[prev_index];
            }
        }
        active_slide.classList.remove('active');
        active_slide.querySelector('.slide_content_wrapper').style.opacity = "0";
        slide_index.target.classList.add('active'); //change style of nav elem
        slide.classList.add('active'); //show slide
        slide.querySelector('.slide_content_wrapper').style.opacity = "1";
    }

    /**
     * for slider with arrows where moving all slide: moving + arrow hiding;
     * @param {object} e [clicked element]
     */
    function sliderArrowMove(e) {
        //checkWidth(e, 1);

        if (e.target.getAttribute('data-direction') == 'right' && tick1 != 0) {
            tick1 -= 1;
            if (tick1 === 0) {
                hideSliderArrow(1, 0);
            } else if (tick1 === (e.target.parentElement.querySelectorAll('.slide').length - 2)) {
                showSliderArrow(1, 1);
            }
        } else if (e.target.getAttribute('data-direction') == 'left' && tick1 != (e.target.parentElement.querySelectorAll('.slide').length - 1)) {
            tick1 += 1;
            if (tick1 == (e.target.parentElement.querySelectorAll('.slide').length - 1)) {
                hideSliderArrow(1, 1);
            }
            if (tick1 >= 1) {
                showSliderArrow(1, 0);
            }
        }
        slides_wrapper = e.target.parentElement.querySelector('.slides_wrapper');
        //var width = parseFloat(getComputedStyle(slides_wrapper.querySelector('.slide')).width);
        //slides_wrapper.style.right = tick1 * width + "px";
        slides_wrapper.style.transform = "translateX(-" + tick1 * 100 / slides_wrapper.querySelectorAll('.slide').length + "%)";

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

    /* --------------------------------------------- events --------------------------------------------- */

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
        for (var i = 0; i < document.getElementsByClassName('submit_app_btn').length; i++) {
            document.getElementsByClassName('submit_app_btn')[i].addEventListener('click', modalOpen);
        }
        if (document.querySelector('section.work_top_part .bg_top .wrapper .description a')) {
            document.querySelector('section.work_top_part .bg_top .wrapper .description a').addEventListener('click', modalOpen);
        }
        for (var i = 0; i < document.getElementsByClassName('modal_comment').length; i++) {
            document.getElementsByClassName('modal_comment')[i].addEventListener('click', modalOpen);
        }
        for (var i = 0; i < document.getElementsByClassName('modal_resume').length; i++) {
            document.getElementsByClassName('  modal_resume')[i].addEventListener('click', modalOpen);
        }
        if (document.querySelector('footer .contacts >p >a')) {
            document.querySelector('footer .contacts >p >a').addEventListener('click', modalOpen);
        }
        for (var i = 0; i < document.querySelectorAll('.modal .close').length; i++) {
            document.querySelectorAll('.modal .close')[i].addEventListener('click', modalClose);
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
     * listener for change color of invalid field
     */
    function addButtonListener() {
        var form_button = document.getElementsByTagName('button')
        for (var i = 0; i < form_button.length; i++) {
            form_button[i].addEventListener('click', changeInvalidColor)
        }
    }

    /**
     * checking if element exist - add listener
     */
    function addListeners() {
        if (document.getElementById('logo_btn')) {
            document.getElementById('logo_btn').addEventListener('click', scrollingButtonAction);
            document.getElementById('logo_btn').addEventListener('click', setScrollingArguments0);
        }
        if (document.getElementById('cont_btn')) {
            document.getElementById('cont_btn').addEventListener('click', scrollingButtonAction);
            document.getElementById('cont_btn').addEventListener('click', setScrollingArguments1);
        }

        if (document.getElementById('offers_btn')) {
            document.getElementById('offers_btn').addEventListener('click', scrollingButtonAction);
            document.getElementById('offers_btn').addEventListener('click', setScrollingArguments2);
        }
        if (document.getElementById('works_btn')) {
            document.getElementById('works_btn').addEventListener('click', scrollingButtonAction);
            document.getElementById('works_btn').addEventListener('click', setScrollingArguments3);
        }
        if (document.getElementById('tel_modal')) {
            document.getElementById('tel_modal').addEventListener('focus', showTelComment);
            document.getElementById('tel_modal').addEventListener('blur', hideTelComment);
        }
        if (document.getElementsByTagName('button')) {
            addButtonListener()
        }
        if (document.querySelectorAll('.portfolio >div').length > 0) {
            for (var i = 0; i < document.querySelectorAll('.portfolio >div').length; i++) {
                document.querySelectorAll('.portfolio >div')[i].addEventListener('click', goPortfolioLink);
                if (device.desktop()) {
                    document.querySelectorAll('.portfolio >div')[i].addEventListener('mouseenter', showPortfolioLogo);
                    document.querySelectorAll('.portfolio >div')[i].addEventListener('mouseleave', hidePortfolioLogo);
                    document.querySelectorAll('.portfolio >div')[i].addEventListener('mouseenter', zoomInImg);
                    document.querySelectorAll('.portfolio >div')[i].addEventListener('mouseleave', zoomOutImg);
                } else {
                    document.querySelectorAll('.portfolio >div .hover_logo')[i].style.zIndex = "-1";
                }

            }
        }
        if (document.getElementsByClassName('tel_num').length > 0 && device.desktop()) {
            for (var i = 0; i < document.getElementsByClassName('tel_num').length; i++) {
                document.getElementsByClassName('tel_num')[i].addEventListener('mouseenter', showHeaderTel);
                document.getElementsByClassName('tel_num')[i].addEventListener('mouseleave', hideHeaderTel);
            }
        }
        createElemsForTablets();
        if (document.querySelector('.correct_work_on_tablet')) {
            document.querySelector('.correct_work_on_tablet').addEventListener('click', tabletHeaderTelToggle);
        }
    }

    /**
     * field with image in portfolio section becomes clickable (takes link from hover area) itself
     * @param {object} e [[direct project image]]
     */
    function goPortfolioLink(e) {
        if (e.target.tagName == 'IMG') {
            document.location.href = e.target.parentElement.getElementsByTagName('a')[0].getAttribute('href')
        } else {
            document.location.href = e.target.getElementsByTagName('a')[0].getAttribute('href')
        }
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


    window.addEventListener('click', checkTarget);
    window.addEventListener('resize', calcPageHeight);
    window.addEventListener('resize', glowingPlanet);


    /* --------------------------------------------- other functions --------------------------------------------- */




    function modalOpen(e) {
        e.preventDefault();
        takeUsedButton(e);
        var modal_id = e.target.getAttribute('data-modal-id');

        document.getElementById(modal_id).style.display = "block";
        var int = setInterval(function () {
            if ((getComputedStyle(document.getElementById(modal_id)).opacity) < 0.98) {
                document.getElementById(modal_id).style.opacity = +document.getElementById(modal_id).style.opacity + 0.1;
            } else {
                clearInterval(int)
            }
        }, 30)
        var body_width = document.body.offsetWidth;
        window_offset = window.pageYOffset;
        document.body.style.marginRight = window.innerWidth - body_width + "px";
        header.style.marginRight = window.innerWidth - body_width + "px";
        document.body.style.width = body_width + "px";
        document.body.style.top = "-" + window_offset + "px";
        document.body.classList.add('hidden');
        header.style.display = "none";


        // window.addEventListener('scroll', scrollBodySync)
    }

    function modalClose(e) {
        var elem = e.target;
        while (!elem.classList.contains('modal')) {
            elem = elem.parentElement;
        }
        var modal_id = elem.id;
        document.getElementById(modal_id).style.display = "none";
        document.getElementById(modal_id).style.opacity = "0";
        document.body.style.marginRight = 0;
        header.style.marginRight = 0;
        document.body.style.width = (document.body.offsetHeight >= 1200) ? "100%" : "100vw";
        document.body.classList.remove('hidden');
        window.scrollTo(0, window_offset);
        header.style.display = "block";
        // window.removeEventListener('scroll', scrollBodySync)
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
                if (window.pageYOffset + document.documentElement.clientHeight >= document.body.offsetHeight) {
                    console.log(window.pageYOffset);
                    console.log(document.documentElement.clientHeight);
                    console.log(document.body.offsetHeight);
                    clearInterval(scroll_interval)
                }
            } else if (button_coord > arguments[1]) {
                window.scrollBy(0, -70);
                if (window.pageYOffset <= arguments[1] + 70) {
                    clearInterval(scroll_interval);
                    document.querySelector(arguments[2]).scrollIntoView(true)
                }
            }
        }, 30);
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
     * tuning of glowing planets
     */
    function glowingPlanet() {
        var img = document.querySelectorAll('.work_directions .wrapper .direction .direction_wrapper .service img');
        var planet = document.querySelectorAll('.work_directions .wrapper .direction .direction_wrapper .service .glowing');
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

    /**
     * show comment for tel form in modal window
     */
    function showTelComment() {
        var tel_comment = document.querySelector('.tel_comment');
        tel_comment.style.visibility = "visible";
        tel_comment.style.opacity = "1";
    }

    function hideTelComment() {
        var tel_comment = document.querySelector('.tel_comment');
        tel_comment.style.visibility = "hidden";
        tel_comment.style.opacity = "0";
    }
    /**
     * [hover effect for portfolio]
     * @param {object} e [portfolio item]
     */
    function showPortfolioLogo(e) {
        e.target.querySelector('.portfolio .hover_logo').classList.add('active');
    }

    function hidePortfolioLogo(e) {
        e.target.querySelector('.portfolio .hover_logo').classList.remove('active');
    }

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







    function takeUsedButton(e) {
        if (e.target.hasAttribute('data-trigger-ident')) {
            document.getElementById('takes_used_button').value = e.target.getAttribute('data-trigger-ident')
        }
    }


    function setModalAttribute() {
        var elem = document.querySelector('section.work_top_part .description a[href^="#"]');
        if (elem) {
            console.log('link exist');
            elem.setAttribute('data-modal-id', 'modal_order');
            elem.setAttribute('data-trigger-ident', 'vnutryak')
        }


    }


    setModalAttribute()


    function zoomInImg(e) {
        e.target.querySelector('img').classList.add('zoom_img')
    }

    function zoomOutImg(e) {
        e.target.querySelector('img').classList.remove('zoom_img')
    }



    function autonomicSlider() {
        var slide = document.querySelectorAll('.full_screen_slider .slide');
        var i = 1;
        if (slide.length > 0) {
            function sliderAutoMove(i) {
                var nav_item = document.querySelectorAll('.pagination .nav_item');
                if (i !== 0) {
                    nav_item[i - 1].classList.remove('active');
                    slide[i - 1].classList.remove('active');
                    slide[i - 1].querySelector('.slide_content_wrapper').style.opacity = "0";
                } else {
                    nav_item[nav_item.length - 1].classList.remove('active');
                    slide[slide.length - 1].classList.remove('active');
                    slide[slide.length - 1].querySelector('.slide_content_wrapper').style.opacity = "0";
                }
                nav_item[i].classList.add('active'); //change style of nav elem
                slide[i].classList.add('active'); //show slide
                slide[i].querySelector('.slide_content_wrapper').style.opacity = "1";
            }
            slider_interval = setInterval(function () {
                if (i < slide.length - 1) {
                    sliderAutoMove(i);
                    i++
                } else {
                    sliderAutoMove(i);
                    i = 0;
                }
            }, 7000)
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




    autonomicSlider()
    autoSliderStop()









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
        console.log('sdfg');
        var title = document.querySelectorAll('.performed_works .main_h, .review .main_h, .team .main_h');
        for (var i = 0; i < title.length; i++) {
            var elem = document.createElement('div')
            var line = title[i].appendChild(elem);
            line.classList.add('thin_red_line');
        }
    }

    createRedLine();



    /*  Smooth scroll to next page when page onscroll  */

    (function () {

        var transition_time = "700";

        function addTransitionTime(selector) {
            if (document.querySelector(selector)) {
                document.querySelector(selector).style.transition = transition_time + "ms";
            }
        }
        addTransitionTime('.main_wrapper');
        addTransitionTime('.first_work');
        addTransitionTime('.first_work .left_part');
        addTransitionTime('.first_work .right_part');
        addTransitionTime('.second_work');
        addTransitionTime('.third_work');
        addTransitionTime('.fourth_work');
        addTransitionTime('.fifth_work .left_part');
        addTransitionTime('.fifth_work .right_part');
        addTransitionTime('.sixth_work');


        function addScrollListeners() {
            var listeners = ['wheel', 'keydown', 'touchstart', 'touchmove', 'touchend'];
            for (var i = 0; i < listeners.length; i++) {
                window.addEventListener(listeners[i], function (e) {
                    pageSlide(e)
                })
            }

        }
        addScrollListeners()


        var screen_num = 1;
        var scroll_mark = true;

        function pageSlide(e) {
            if (scroll_mark) {
                scroll_mark = false;
                defineSlideDirection(e);
                if (defineSlideDirection(e) == 'down') {
                    translateBody('down');
                    if (screen_num < 9) {
                        screen_num++;
                    }
                } else if (defineSlideDirection(e) == 'up' && screen_num > 1) {
                    translateBody('up');
                    screen_num--;


                }
                setTimeout(function () {
                    scroll_mark = true
                }, transition_time)
            }
        }


        var screen_effect = {
            scr1: "0",
            scr2: "-100%",
            scr3: "-200%",
            scr4: "-300%",
        }

        function getFullScreen(coord) {
            return document.querySelector('.main_wrapper').style.top = coord;
        }

        function addClass(selector, classSelector) {
            document.querySelector(selector).classList.add(classSelector);
        }

        function removeClass(selector, classSelector) {
            document.querySelector(selector).classList.remove(classSelector);
        }


        function translateBody(direction, full_screen) {
            switch (screen_num) {
            case 1:
                if (direction == "down") {
                    getFullScreen(screen_effect.scr2);
                }
                break;
            case 2:
                if (direction == "down") {
                    addClass('.scroll_mouse', 'active');
                    getFullScreen(screen_effect.scr3);
                    setTimeout(function () {
                        addClass('.first_work .left_part', 'active');
                        addClass('.first_work .right_part', 'active')
                    }, transition_time)

                } else if (direction == "up") {
                    getFullScreen(screen_effect.scr1);
                }
                break;
            case 3:
                if (direction == "down") {
                    addClass('.second_work', 'active');

                } else if (direction == "up") {
                    removeClass('.scroll_mouse', 'active');
                    removeClass('.first_work .left_part', 'active');
                    removeClass('.first_work .right_part', 'active')
                    setTimeout(function () {
                        getFullScreen(screen_effect.scr2);
                    }, transition_time)
                }
                break;
            case 4:
                if (direction == "down") {
                    addClass('.third_work', 'active');
                } else if (direction == "up") {
                    removeClass('.second_work', 'active');
                }
                break;
            case 5:
                if (direction == "down") {
                    addClass('.first_work', 'remove');
                    addClass('.second_work', 'remove');
                    addClass('.third_work', 'remove');
                    addClass('.fourth_work', 'active');
                } else if (direction == "up") {
                    removeClass('.third_work', 'active');
                }
                break;
            case 6:
                if (direction == "down") {
                    addClass('.fourth_work', 'remove');
                    addClass('.fifth_work .right_part', 'active');
                    addClass('.fifth_work .left_part', 'active');
                } else if (direction == "up") {
                    removeClass('.first_work', 'remove');
                    removeClass('.second_work', 'remove');
                    removeClass('.third_work', 'remove');
                    removeClass('.fourth_work', 'active');
                }
                break;
            case 7:
                if (direction == "down") {
                    addClass('.fifth_work .right_part', 'remove');
                    removeClass('.fifth_work .left_part', 'active');
                    addClass('.sixth_work', 'active');

                } else if (direction == "up") {
                    removeClass('.fourth_work', 'remove');
                    removeClass('.fifth_work .right_part', 'active');
                    removeClass('.fifth_work .left_part', 'active');
                }

                break;
            case 8:
                if (direction == "down") {
                    getFullScreen(screen_effect.scr4);
                    setHeight('.scroll_container_wrapper .scroll_block');
                    addClass('.scroll_mouse', 'remove');

                } else if (direction == "up") {
                    removeClass('.fifth_work .right_part', 'remove');
                    addClass('.fifth_work .left_part', 'active');
                    removeClass('.sixth_work', 'active');
                }

                break;
            case 9:

                if (direction == "down") {
                    document.querySelector('.scroll_marker').value = "true";
                    if (document.querySelector('.scroll_position').value == "end") {
                        addClass('footer', 'active');
                    }
                } else if (direction == "up") {
                    screen_num++;
                    document.querySelector('.scroll_marker').value = "";
                    if (document.querySelector('footer').classList.contains('active')) {
                        removeClass('footer', 'active');
                    } else if (document.querySelector('.scroll_container').style.transform == "translateY(0px)") {
                        document.querySelector('.scroll_marker').value = "";
                        getFullScreen(screen_effect.scr3);
                        screen_num--;
                    } else {
                        document.querySelector('.scroll_marker').value = "true";
                    }
                }
                break;
            }
        }




        /* Define direction */
        function defineSlideDirection(e) {
            if (e.type == "keydown") {
                return getKeyCode(e);
            } else if (e.type == "touchstart" || e.type == "touchmove" || e.type == "touchend") {
                return getSwipeDirection(e);
            } else if (e.type == "wheel") {
                return getWheelDirection(e);
            }
        }


        function getKeyCode(e) {
            if (e.keyCode == 40) {
                //console.log('down');
                return 'down'
            } else if (e.keyCode == 38) {
                //console.log('up');
                return 'up'
            }
        }

        function getWheelDirection(e) {
            if (e.deltaY > 0) {
                //console.log('wheel down');
                return 'down'
            } else if (e.deltaY < 0) {
                //console.log('wheel up');
                return 'up'
            }
        }


        function getTouchCoord(e) {
            return e.touches[0].clientY
        }


        var firstCoord, lastCoord;

        function getSwipeDirection(e) {
            if (e.type == 'touchstart') {
                firstCoord = getTouchCoord(e);
            } else if (e.type == 'touchmove') {
                lastCoord = getTouchCoord(e);
            } else if (e.type == 'touchend') {
                if (lastCoord - firstCoord > 10) {
                    return 'up';
                } else if (lastCoord - firstCoord < -10) {
                    return 'down';
                }
            }
        }



        /**
         * change color of fixed nav block when scrolled under nth px
         */
        function changeHeaderColor() {
            if (header) {
                if (screen_num > 1) {
                    header.getElementsByClassName('header_bg')[0].style.opacity = "0.9";

                } else {
                    header.getElementsByClassName('header_bg')[0].style.opacity = "0";

                }
            }
        }

        window.addEventListener('touchstart', changeHeaderColor);
        window.addEventListener('wheel', changeHeaderColor);
        window.addEventListener('keydown', changeHeaderColor);



        function setHeight(selector) {
            document.querySelector(selector).style.height = getHeight(selector) + 'px';
        }

        function getHeight(selector) {
            return document.querySelector(selector).offsetHeight
        }

    })();









})();