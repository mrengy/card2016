$( document ).ready(function() {
    /* slide transitions */
    var pauseTime = 4000;
    var transitionTime = 3000;
    var initialTimeout = window.setTimeout(fadeOutSlide1, pauseTime);
    var slideCompleted = new Array();
    var lightningTravelTime = 3000;
    var lightningWaitTime = 1000;
    var thisLightning;
    var thisLightningWidth;
    var lightningCounter = 1;

    function fadeOutSlide1(){
    	fadeOut($("#slide-1"));
    	reveal($("#slide-2"));
    	var afterSlide1Timeout = window.setTimeout(revealSlide3, pauseTime);
    }

    function revealSlide3(){
    	reveal($("#slide-3"));
        var afterSlide3Timeout = window.setTimeout(revealBubble, pauseTime*2);
    }

    function revealBubble(){
        reveal($("#bubble"));
    }

    function fadeOut(target){
    	target.fadeTo(transitionTime,0,'swing',
    		function(){
    			target.addClass('hidden');
    		}
    	);
    }

    function reveal(target){
    	//target.removeClass('hidden');
    	target.fadeTo(transitionTime,1,'swing', function(){
            
            //add this slide id to the array listing completed slide names
            slideCompleted.push(target[0].id);
        });
    }

    /*lightning*/
    var lightning = new Array();

    /*lightning right*/
    var lightningRight = new Array();

    /*prototype lightning definition*/
	lightning.push($(".lightningLeft"));
    lightningRight.push($(".lightningRight"));

    var w0 = parseInt(lightning[0].css("width"), 10);
    var h0 = parseInt(lightning[0].css("height"), 10);
    var minWidth = w0 / 4;
    /* initial left position of prototype lightnings*/
    var l0 = parseInt(lightning[0].css("left"));
    var r0 = parseInt(lightningRight[0].css("left"));

    /*spawning and moving next lightning*/
    function newLightning(direction){
        var endLeftPos ;
        if (direction == 'left'){
            thisLightning = lightning[0].clone();
            lightning.push(thisLightning);
            endLeftPos = windowWidth;
        } else if (direction == 'right'){
            thisLightning = lightningRight[0].clone();
            lightningRight.push(thisLightning);
            endLeftPos = w0*(-1);
        }

        thisLightningWidth = getRandomInt(minWidth, w0);

        thisLightning.css("width", thisLightningWidth);
        thisLightning.css("height", thisLightningWidth / (w0/h0));
        thisLightning.css("top", getRandomInt(0, windowHeight)*1.5);
        thisLightning.attr('id', 'lightning-'+lightningCounter);

        thisLightning.appendTo(lightning[0].parent());

        //moving it after creating it
        thisLightning.animate({left: endLeftPos}, lightningTravelTime*(thisLightningWidth/w0), 'swing', function(){
                //remove this lightning from DOM
                this.remove();
                //remove this lightning from array
                if (direction == 'left'){
                    lightning.splice($.inArray(thisLightning, lightning),1);
                } else if (direction == 'right'){
                    lightningRight.splice($.inArray(thisLightning, lightningRight),1);
                }
        });

        lightningCounter ++;

        //track google analytics event
        ga('send', 'event', 'lightning', direction, 'Easter Eggs');

        //run left lightning again after random time
        if(direction == 'left'){
            window.setTimeout(function(){
                newLightning(direction);
            }, getRandomInt(0,lightningWaitTime));
        }

    }

    // run this function only once. Start the lightning moving and get rid of the functions to reposition the speech bubble
    $('#kepler a').one( 'click', function(){
        //$window.off('resize');
        $window.off('scroll');
        fadeOut($('#bubble'));
        //moveLightning();
        newLightning('left');
        //newLightning();
        $('#keplerImg').unwrap();

        //track google analytics event
        ga('send', 'event', 'Kepler', 'click', 'Easter Eggs');

        //don't follow the link
        return false;
    });

    //spawn lightning swimming from the right when lightning is clicked
    $('#slide-2').on('click', '.lightning', function(){
        var clickedLightningID = this.id;
        //console.log(parseInt(($('#'+clickedLightningID).css('width'))));
        var sizeClicked = parseInt(($('#'+clickedLightningID).css('width')));

        for (count = 0; count <= (w0-sizeClicked)/5; count++){
            newLightning('right');
        }
    });

    	/*reusable generic functions*/
    function getRandomInt (min, max) {
	    return Math.floor(Math.random()*(max-min+1)+min);
	}

    /*positioning bubble*/
    var $window = $(window),
        $bubble = $('#bubble'),
        windowHeight,
        windowWidth,
        bubbleTop;

    function recalculateWindow(){
        windowHeight = $window.height();
        windowWidth = $window.width();
        bubbleTop = $bubble.offset().top;
        //console.log('recalculate ran');
    }

    function toggleOffscreen(){
        $bubble.toggleClass('offscreen', ($window.scrollTop() + windowHeight) < bubbleTop);
        //console.log('scroll ran');
    }

    // run recalculate once on start
    recalculateWindow();
    //run recalculate again on each window resize
    $window.on('resize', recalculateWindow);

    //run toggleOffscreen on each scroll event
    $window.on('scroll', toggleOffscreen);        
    
});
