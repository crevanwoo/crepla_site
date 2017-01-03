if (window.innerWidth / window.innerHeight <= aspect_ratio) {

    'use strict';

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

    var scroll_size = 70;
    var fps = 30;
    var elem_name, elem_position;



    /**
     * set actual parameters of fixed header for invisible elem, which define, when scrolling stops. inisible elem should be put at the top part of relatively position elem where I want to stop scrolling
     */
    function setElemForPropertyScrolling() {
        for (var i = 0; i < document.getElementsByClassName('invisible_scroll').length; i++) {
            document.getElementsByClassName('invisible_scroll')[i].style.height = getHeaderHeight() + "px";
            document.getElementsByClassName('invisible_scroll')[i].style.top = "-" + getHeaderHeight() + "px";
        }
    }
    setElemForPropertyScrolling();

    function getHeaderHeight() {
        return header.offsetHeight;
    }



    var cancel_condition, transition_size;

    function movePage() {

        if (cancel_condition()) {
            document.querySelector(elem_name).scrollIntoView(true);
            cancelAnimationFrame(movePage);
            return
        }

        window.scrollBy(0, transition_size);
        setTimeout(function () {
            requestAnimationFrame(movePage);

        }, 1000 / fps)

    }



    function calcConditionCaseDown() {
        if ((window.pageYOffset + document.documentElement.clientHeight >= document.body.offsetHeight) || (window.pageYOffset >= elem_position - scroll_size)) {
            return true
        } else {
            return false
        }
    }


    function calcConditionCaseUp() {
        if ((document.body.offsetHeight <= document.documentElement.clientHeight) || (window.pageYOffset <= elem_position + scroll_size)) {
            return true
        } else {
            return false
        }
    }


    /**
     * smooth scrolling 
     * @param {object} e [coord of clicked link from what is scrolling]
     * arguments --> look in "sizes" part, there is a points where scrolling stop
     * scrollIntoView(true): stop whete element on top of a page
     * last "if" mean "stop at the end of page"
     */
    function manageMoving(e) {

        var button_coord = e.pageY;
        e.preventDefault();
        if (button_coord < elem_position) {
            transition_size = scroll_size;
            cancel_condition = calcConditionCaseDown;
            movePage();




        } else if (button_coord > elem_position) {

            transition_size = -scroll_size;
            cancel_condition = calcConditionCaseUp;
            movePage();


        }
    }


    $('#works_btn').on('click', function (e) {
        if ($('.crepla_ru').length > 0) {
            e.preventDefault();
            elem_name = 'section.performed_works .invisible_scroll';
            elem_position = $(elem_name).parent().offset().top;
            manageMoving(e);
        } else if ($('.works_directions').length > 0 && (window.innerWidth / window.innerHeight <= aspect_ratio)) {}
    });

    $('#cont_btn').on('click', function (e) {
        if ($('.crepla_ru').length > 0) {
            e.preventDefault();
            elem_position = calcPageHeight() - document.getElementsByTagName('footer')[0].offsetHeight - getHeaderHeight();
            elem_name = 'footer .invisible_scroll';
            manageMoving(e);
        } else if ($('.works_directions').length > 0 && (window.innerWidth / window.innerHeight <= aspect_ratio)) {
            e.preventDefault();
            elem_position = calcPageHeight() - document.getElementsByTagName('footer')[0].offsetHeight - getHeaderHeight();
            elem_name = 'footer .invisible_scroll';
            manageMoving(e);
        }
    })

    $('#logo_btn').on('click', function (e) {
        if ($('.crepla_ru').length > 0) {
            e.preventDefault();
            elem_name = 'body';
            elem_position = "0";
            manageMoving(e);
        } else if ($('.works_directions').length > 0 && (window.innerWidth / window.innerHeight <= aspect_ratio)) {}

    })

    $('#offers_btn').on('click', function (e) {
        if ($('.works_directions').length > 0 && (window.innerWidth / window.innerHeight <= aspect_ratio)) {
            e.preventDefault();
            elem_name = 'body';
            elem_position = "0";
            manageMoving(e);


        }

    })




}