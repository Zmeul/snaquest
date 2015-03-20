(function () {
    "use strict";

    var KEY_NAMES = { LEFT : 37, RIGHT : 39, UP : 38, DOWN : 40};
    var KEY_NAMES_INV = _.invert(KEY_NAMES);

    Game.Controls = function () {
        this.initialize();
    };

    Game.Controls.prototype = {

        initialize : function () {
            this.keys = {};
            _.each(KEY_NAMES, function (value, key) {
                this.keys[key] = false;
            }, this);
        },

        start : function () {
            $(document).on('keydown.gameControl', _.bind(this.keydown, this));
            $(document).on('keyup.gameControl', _.bind(this.keyup, this));
            
            $("#btn_up").click(function(){  
                var e_up = $.Event('keydown');  
                e_up.which = 38;               
                $(document).trigger(e_up);
            });
            
            $("#btn_down").click(function(){  
                var e_down = $.Event('keydown');  
                e_down.which = 40;               
                $(document).trigger(e_down);
            });
            
            $("#btn_left").click(function(){  
                var e_left = $.Event('keydown');  
                e_left.which = 37;               
                $(document).trigger(e_left);
            });
            
            $("#btn_right").click(function(){  
                var e_down = $.Event('keydown');  
                e_down.which = 39;               
                $(document).trigger(e_right);
            });
            
            //--- Swipe test
            document.addEventListener('touchstart', handleTouchStart, false);        
            document.addEventListener('touchmove', handleTouchMove, false);

            var xDown = null;                                                        
            var yDown = null;                                                        

            function handleTouchStart(evt) {                                         
                xDown = evt.touches[0].clientX;                                      
                yDown = evt.touches[0].clientY;                                      
            };                                                

            function handleTouchMove(evt) {
                if ( ! xDown || ! yDown ) {
                    return;
                }

                var xUp = evt.touches[0].clientX;                                    
                var yUp = evt.touches[0].clientY;

                var xDiff = xDown - xUp;
                var yDiff = yDown - yUp;

                if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                    if ( xDiff > 0 ) {
                        /* left swipe */ 
                        $(document).trigger(e_left);
                    } else {
                        /* right swipe */
                        $(document).trigger(e_right);
                    }                       
                } else {
                    if ( yDiff > 0 ) {
                        /* up swipe */ 
                        $(document).trigger(e_up);
                    } else { 
                        /* down swipe */
                        $(document).trigger(e_down);
                    }                                                                 
                }
                /* reset values */
                xDown = null;
                yDown = null;  

            }
            
        },

        stop : function () {
            $(document).off(".gameControl");
        },

        keydown : function (e) {
            var key = e.which;
            if (KEY_NAMES_INV[key]) {
                e.preventDefault();
                this.keys[KEY_NAMES_INV[key]] = true;
                this.trigger("keydown", KEY_NAMES_INV[key]);
            }
        },

        keyup : function (e) {
            var key = e.which;
            if (KEY_NAMES_INV[key]) {
                e.preventDefault();
                this.keys[KEY_NAMES_INV[key]] = false;
            }
        }
    };


    _.extend(Game.Controls.prototype, Backbone.Events);

}());
