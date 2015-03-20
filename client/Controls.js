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
            
            function triggerKeydown(key){
                var e= $.Event('keydown');
                e.which = key;               
                $(document).trigger(e);
            }
            
            $("#btn_up").click(function(){      triggerKeydown(38) });
            $("#btn_down").click(function(){    triggerKeydown(40) });
            $("#btn_left").click(function(){    triggerKeydown(37) }); 
            $("#btn_right").click(function(){   triggerKeydown(39) });

            //--- Swipe test
            document.addEventListener('touchstart', handleTouchStart, false);        
            document.addEventListener('touchmove', handleTouchMove, false);

            var xDown = null;                                                        
            var yDown = null;      
           
            function handleTouchStart(evt) {     
                console.log('touch-start');
                xDown = evt.touches[0].clientX;                                      
                yDown = evt.touches[0].clientY;                                      
            };                                                

            function handleTouchMove(evt) {
                console.log('touch-move');
                
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
                        triggerKeydown(37);
                    } else {
                        /* right swipe */
                        triggerKeydown(39);
                    }                       
                } else {
                    if ( yDiff > 0 ) {
                        /* up swipe */ 
                        triggerKeydown(38);
                    } else { 
                        /* down swipe */
                        triggerKeydown(40);
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
