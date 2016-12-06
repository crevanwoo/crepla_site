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

 

    /* --------------------------------------------- sizes --------------------------------------------- */



 
	
  

    /**
     * get header height (for adaptivity)
     * @returns {[num]} [height of header]
     */
    function getHeaderHeight() {
        return header.offsetHeight;
    }

    
    /* --------------------------------------------- sliders --------------------------------------------- */

  

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


 


    window.addEventListener('click', checkTarget);
    window.addEventListener('resize', calcPageHeight);
    window.addEventListener('resize', glowingPlanet);


















})();