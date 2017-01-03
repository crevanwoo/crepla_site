;
(function () {
    'use strict';
    if ($('.work_directions').length > 0) {

        var CustomScrollSettings = {
            wrapper_selector: '.scroll_container_wrapper',
            container_selector: '.scroll_container',
            container_step_size: 300,
            /* Amount of scrolling pictures */
            runner_step: 0, //don't touch
            runner_marker: true, //don't touch
            runner_selector: '.scroll_runner',
            step: 0, //don't touch
            marker: '.scroll_marker',
            scroll_position_trigger: true,
            scroll_position_selector: '.scroll_position',
            scroll_position: 'start',
        };


        function addScrollListeners() {
            var listeners = ['wheel', 'keydown', 'touchstart', 'touchmove', 'touchend'];
            for (var i = 0; i < listeners.length; i++) {
                window.addEventListener(listeners[i], function (e) {
                    pageScroll(e);
                })
            }
        };


        function pageScroll(e) {
            if (document.querySelector(CustomScrollSettings.marker).value) {
                CustomScrollSettings.direction = ScrollDirection.defineScrollDirection(e);
                ElementsMoving.containerMove();
                ElementsMoving.runnerMove();
            }
        }

        function setScrollPositionValue() {
            if (CustomScrollSettings.scroll_position_trigger) {
                document.querySelector(CustomScrollSettings.scroll_position_selector).value = CustomScrollSettings.scroll_position
            }
        }



        var ElementsDefinition = {

            container: function () {
                return document.querySelector(CustomScrollSettings.container_selector)
            },

            thumb: function () {
                return this.container().parentElement.querySelector(CustomScrollSettings.runner_selector)
            },

        }


        var ElementsSizes = {

            wrapper_height: function (elem) {
                return elem.parentElement.offsetHeight;
            },

            container_height: function (elem) {
                return elem.offsetHeight;
            },

            container_step_size: function () {
                return (100 * CustomScrollSettings.container_step_size / this.container_height(ElementsDefinition.container()))
            },

            runner_step_size: function () {
                return this.container_step_size()
            },

            setRunnerSize: function () {
                var container = ElementsDefinition.container();
                ElementsDefinition.thumb().style.height = 100 / this.container_height(container) * this.wrapper_height(container) + "%";
            },

        }


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
                } else if (e.type == 'touchmove') {
                    this.lastCoord = this.getTouchCoord(e);
                } else if (e.type == 'touchend') {
                    if (this.lastCoord - this.firstCoord > 10) {
                        return 'up';
                    } else if (this.lastCoord - this.firstCoord < -10) {
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


        var ElementsMoving = {


            runnerMove: function () {

                var direction = CustomScrollSettings.direction,
                    step_size = ElementsSizes.container_step_size(),
                    runner_marker = CustomScrollSettings.runner_marker,
                    thumb = ElementsDefinition.thumb(),
                    runner_step_size = ElementsSizes.runner_step_size();


                if (direction == 'down') { //-
                    if (runner_marker) {
                        CustomScrollSettings.runner_step += runner_step_size;
                        thumb.style.top = CustomScrollSettings.runner_step + "%";
                    } else {
                        CustomScrollSettings.runner_step = (100 - parseFloat(thumb.style.height));
                        thumb.style.top = CustomScrollSettings.runner_step + "%";
                    }
                } else if (direction == 'up') { //+
                    if (runner_marker) {
                        CustomScrollSettings.runner_step -= runner_step_size;
                        thumb.style.top = CustomScrollSettings.runner_step + "%";
                    } else {
                        CustomScrollSettings.runner_step = 0;
                        thumb.style.top = CustomScrollSettings.runner_step + "%";
                    }
                }
            },


            containerMove: function () {
                var direction = CustomScrollSettings.direction,
                    step_size = CustomScrollSettings.container_step_size,
                    container = ElementsDefinition.container(),
                    wrapper_height = ElementsSizes.wrapper_height(container),
                    container_height = ElementsSizes.container_height(container);

                if (direction == 'down') {
                    if (container_height - wrapper_height + CustomScrollSettings.step > step_size) { //-  
                        CustomScrollSettings.runner_marker = true;
                        CustomScrollSettings.step -= step_size;
                        container.style.transform = "translateY(" + CustomScrollSettings.step + "px)";
                        CustomScrollSettings.scroll_position = "";
                        setScrollPositionValue();
                    } else {
                        CustomScrollSettings.runner_marker = false;
                        container.style.transform = "translateY(-" + (container_height - wrapper_height) + "px)";
                        CustomScrollSettings.scroll_position = "end";
                        setScrollPositionValue();
                    }
                } else if (direction == 'up') {
                    if (CustomScrollSettings.step + step_size < 0) {
                        CustomScrollSettings.runner_marker = true;
                        CustomScrollSettings.step += step_size;
                        container.style.transform = "translateY(" + CustomScrollSettings.step + "px)";
                        CustomScrollSettings.scroll_position = "";
                        setScrollPositionValue();
                    } else {
                        CustomScrollSettings.runner_marker = false;
                        CustomScrollSettings.step = 0;
                        container.style.transform = "translateY(" + CustomScrollSettings.step + "px)";
                        CustomScrollSettings.scroll_position = "start";
                        setScrollPositionValue();
                    }
                }
            },

        }

        ElementsSizes.setRunnerSize();

        addScrollListeners();

    }

})();