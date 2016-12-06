var header = document.getElementsByTagName('header')[0]; 

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
     }

    function takeUsedButton(e) {
        if (e.target.hasAttribute('data-trigger-ident')) {
            document.getElementById('takes_used_button').value = e.target.getAttribute('data-trigger-ident')
        }
    }



setModalButton()





    function setModalAttribute() {
        var elem = document.querySelector('section.work_top_part .description a[href^="#"]');
        if (elem) {
            console.log('link exist');
            elem.setAttribute('data-modal-id', 'modal_order');
            elem.setAttribute('data-trigger-ident', 'vnutryak')
        }


    }


    setModalAttribute()



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
  