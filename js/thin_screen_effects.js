;
(function () {
    'use strict';
    /* INDEX PAGE ON THIN SCREEN*/




    function getHeaderHeight() {
        return $('header').outerHeight();
    }

    /**
     * total page height
     * @returns {num} [page_height]
     */
    function calcPageHeight() {
        if ($("header")) {
            var total = 0;
            for (var i = 0; i < document.body.children.length; i++) {
                total += document.body.children[i].offsetHeight;
            }
            total -= getHeaderHeight();
            return total;
        }
    }


    /*  Show red line below titles when page scrolling */

    function showRedLine() {
        var title = document.querySelectorAll('.performed_works .main_h, .review .main_h, .team .main_h');

        if (title.length > 2) {
            if (window.pageYOffset > (calcPageHeight() - document.getElementsByTagName('footer')[0].offsetHeight) - (document.querySelector('section.team').offsetHeight * 2)) {
                document.querySelector('section.team .main_h .thin_red_line').style.width = "100rem";
            } else if (window.pageYOffset >
                (document.querySelector('.slide_content_wrapper').offsetHeight + document.querySelector('.performed_works').offsetHeight + document.querySelector('.work_directions').offsetHeight)) {
                document.querySelector('section.review .main_h .thin_red_line').style.width = "100rem";
            } else if (window.pageYOffset > (document.querySelector('.slide_content_wrapper').offsetHeight + (document.querySelector('.work_directions').offsetHeight / 2))) {
                document.querySelector('section.performed_works .main_h .thin_red_line').style.width = "100rem";
            }
        }
    }









    /* ----------------------------------------- PORTFOLIO > ----------------------------------------- */

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

    /* ----------------------------------------- < PORTFOLIO ----------------------------------------- */


    function addPortfolioListeners() {
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

    }





    function managePage() {
       // if (window.innerWidth / window.innerHeight <= aspect_ratio) {
          
            addPortfolioListeners();
            window.addEventListener('scroll', showRedLine);

       // } else {
          //  window.removeEventListener('scroll', showRedLine);

       // }
    }

    managePage()





  //  window.addEventListener('resize', managePage);




})();