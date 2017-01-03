 ;
 (function () {
     if (window.innerWidth / window.innerHeight <= aspect_ratio) {

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
         setElemForPropertyScrolling();

         function getHeaderHeight() {
             return header.offsetHeight;
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
         }

         addListeners()


     }
 })();