
   ;
   (function () {
   	if (window.innerWidth/window.innerHeight <= 1221/696) { console.log('324');

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






/* ----------------------------------------- HEADER > ----------------------------------------- */



window.addEventListener('scroll', changeHeaderColor);
/**
 * change color of fixed nav block when scrolled under nth px
 */
var header = document.querySelector('header');

function changeHeaderColor() {
    if (header) {
        if (window.pageYOffset > 0) {
            header.getElementsByClassName('header_bg')[0].style.opacity = "0.9";

        } else {
            header.getElementsByClassName('header_bg')[0].style.opacity = "0";

        }
    }
}



/* ----------------------------------------- < HEADER ----------------------------------------- */



/* ----------------------------------------- PORTFOLIO > ----------------------------------------- */


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



    function zoomInImg(e) {
        e.target.querySelector('img').classList.add('zoom_img')
    }

    function zoomOutImg(e) {
        e.target.querySelector('img').classList.remove('zoom_img')
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

/* ----------------------------------------- < PORTFOLIO ----------------------------------------- */   }})();