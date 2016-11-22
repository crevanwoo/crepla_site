   /*  Smooth scroll to next page when page onscroll  */

   ;
   (function () {
       if (window.innerWidth > 800) {

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
           addTransitionTime('.first_work');
           addTransitionTime('.first_work .left_part');
           addTransitionTime('.first_work .right_part');
           addTransitionTime('.second_work');
           addTransitionTime('.third_work');
           addTransitionTime('.fourth_work');
           addTransitionTime('.fifth_work .left_part');
           addTransitionTime('.fifth_work .right_part');
           addTransitionTime('.sixth_work');









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

               removeClass('.first_work .left_part', 'active');
               removeClass('.first_work .right_part', 'active');
               removeClass('.first_work', 'remove');
               removeClass('.second_work', 'active');
               removeClass('.second_work', 'remove');
               removeClass('.third_work', 'active');
               removeClass('.third_work', 'remove');
               removeClass('.fourth_work', 'active');
               removeClass('.fourth_work', 'remove');
               removeClass('.fifth_work .left_part', 'active');
               removeClass('.fifth_work .right_part', 'active');
               removeClass('.fifth_work .right_part', 'remove');
               removeClass('.sixth_work', 'active');



           }





           function translateBody(direction) {
               switch (GlobalVariables.screen_num) {
               case 1:
                   if (direction == "down") {
                       getFullScreen(screen_effect.scr2);
                       GlobalVariables.screen_num++;
                   }
                   break;
               case 2:
                   if (direction == "down") {
                       addClass('.scroll_mouse', 'active');
                       getFullScreen(screen_effect.scr3);
                       setTimeout(function () {
                           addClass('.first_work .left_part', 'active');
                           addClass('.first_work .right_part', 'active')
                       }, GlobalVariables.transition_time)
                       GlobalVariables.screen_num++;

                   } else if (direction == "up") {
                       getFullScreen(screen_effect.scr1);
                       GlobalVariables.screen_num--;
                   }
                   break;
               case 3:
                   if (direction == "down") {
                       addClass('.second_work', 'active');
                       GlobalVariables.screen_num++;

                   } else if (direction == "up") {
                       removeClass('.scroll_mouse', 'active');
                       removeClass('.first_work .left_part', 'active');
                       removeClass('.first_work .right_part', 'active')
                       setTimeout(function () {
                           getFullScreen(screen_effect.scr2);
                       }, GlobalVariables.transition_time)
                       GlobalVariables.screen_num--
                   }
                   break;
               case 4:
                   if (direction == "down") {
                       addClass('.third_work', 'active');
                       GlobalVariables.screen_num++;
                   } else if (direction == "up") {
                       removeClass('.second_work', 'active');
                       GlobalVariables.screen_num--
                   }
                   break;
               case 5:
                   if (direction == "down") {
                       addClass('.first_work', 'remove');
                       addClass('.second_work', 'remove');
                       addClass('.third_work', 'remove');
                       addClass('.fourth_work', 'active');
                       GlobalVariables.screen_num++;
                   } else if (direction == "up") {
                       removeClass('.third_work', 'active');
                       GlobalVariables.screen_num--;
                   }
                   break;
               case 6:
                   if (direction == "down") {
                       addClass('.fourth_work', 'remove');
                       addClass('.fifth_work .right_part', 'active');
                       addClass('.fifth_work .left_part', 'active');
                       GlobalVariables.screen_num++;
                   } else if (direction == "up") {
                       removeClass('.first_work', 'remove');
                       removeClass('.second_work', 'remove');
                       removeClass('.third_work', 'remove');
                       removeClass('.fourth_work', 'active');
                       GlobalVariables.screen_num--;
                   }
                   break;
               case 7:
                   if (direction == "down") {
                       addClass('.fifth_work .right_part', 'remove');
                       removeClass('.fifth_work .left_part', 'active');
                       addClass('.sixth_work', 'active');
                       GlobalVariables.screen_num++

                   } else if (direction == "up") {
                       removeClass('.fourth_work', 'remove');
                       removeClass('.fifth_work .right_part', 'active');
                       removeClass('.fifth_work .left_part', 'active');
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
                       removeClass('.fifth_work .right_part', 'remove');
                       addClass('.fifth_work .left_part', 'active');
                       removeClass('.sixth_work', 'active');
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
           
           
           
           
           
     /* function showRedLine() {console.log('dsfasdf');
                              var scroll_container_height = document.querySelector('.scroll_container').offsetHeight,
                              window_height = window.innerHeight,
                              scrolled_distance_str = document.querySelector('.scroll_container').style.transform,
                              scrolled_distance_num = parseInt(scrolled_distance_str.slice(scrolled_distance_str.indexOf('(') + 1));                                
        if (GlobalVariables.screen_num == 3) {
            setTimeout(function(){document.querySelector('section.performed_works .main_h .thin_red_line').style.width = "100rem";}, GlobalVariables.transition_time)
            
       
        } else if (GlobalVariables.screen_num == 9) { console.log(  scrolled_distance_num)
            
            if (window_height > scroll_container_height/2) {  
            if (scrolled_distance_num > scroll_container_height/4) {document.querySelector('section.review .main_h .thin_red_line').style.width = "100rem";   }
            }
         
        }/*
        else if (window.pageYOffset == document.innerHeight - window.innerHeight) {   console.log(document.innerHeight - window.innerHeight)
                                  
                                  document.querySelector('section.team .main_h .thin_red_line').style.width = "100rem";}*/
    }}
*/

        
         function addScrollListeners2(funcName) {
               var listeners = ['wheel', 'keydown', 'touchstart', 'touchmove', 'touchend'];
               for (var i = 0; i < listeners.length; i++) {
                   window.addEventListener(listeners[i], function (e) {
                       funcName(e);
                   })
               }
           };

           addScrollListeners2(showRedLine)
           






       }

   })();