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

    	/*prototype lightning definition*/
	lightning.push($(".lightning"));
    var w0 = parseInt(lightning[0].css("width"), 10);
    var h0 = parseInt(lightning[0].css("height"), 10);
    var minWidth = w0 / 4;
    /* initial left position of prototype lightning*/
    var l0 = parseInt(lightning[0].css("left"));

    /*spawning and moving next lightning*/
    function newLightning(){
        thisLightning = lightning[0].clone();
        lightning.push(thisLightning);

        thisLightningWidth = getRandomInt(minWidth, w0);

        thisLightning.css("width", thisLightningWidth);
        thisLightning.css("height", thisLightningWidth / (w0/h0));
        thisLightning.css("top", getRandomInt(0, windowHeight)*1.5);
        thisLightning.attr('id', 'lightning-'+lightningCounter);

        thisLightning.appendTo(lightning[0].parent());

        //moving it after creating it
        thisLightning.animate({left: windowWidth}, lightningTravelTime*(thisLightningWidth/w0), 'swing', function(){
            //remove this lightning from DOM
            this.remove();
            //remove this lightning from array
            lightning.splice($.inArray(thisLightning, lightning),1);
        });

        lightningCounter ++;

        //run again after random time
        window.setTimeout(newLightning, getRandomInt(0,lightningWaitTime));
    }

    //make the next lightning

    //remove if no longer needed
    function moveLightning(){
        $.each(lightning, function(key, value){
            //skip the first one, as it will remain as the prototype
            if(key > 0){
                this.animate({left: windowWidth}, lightningTravelTime*(this[0].width/w0), 'swing');
            }
        });
    }

    // run this function only once. Start the lightning moving and get rid of the functions to reposition the speech bubble
    $('#kepler a').one( 'click', function(){
        //$window.off('resize');
        $window.off('scroll');
        fadeOut($('#bubble'));
        //moveLightning();
        newLightning();
        //newLightning();
        $('#keplerImg').unwrap();

        //track google analytics event
        ga('send', 'event', 'Kepler', 'click', 'Easter Eggs');

        //don't follow the link
        return false;
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
