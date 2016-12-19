$( document ).ready(function() {
    /* slide transitions */
    var pauseTime = 400;
    var transitionTime = 300;
    var initialTimeout = window.setTimeout(fadeOutSlide1, pauseTime);
    var slideCompleted = new Array();
    var lightningSpawning = false;

    function fadeOutSlide1(){
    	fadeOut($("#slide-1"));
    	reveal($("#slide-2"));
    	var afterSlide1Timeout = window.setTimeout(revealSlide3, pauseTime);
    }

    function revealSlide3(){
    	reveal($("#slide-3"));
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

        /* time to wait between lightning (also randomly adjusted each time)*/
    var lightningTime = 2000;

    	/*prototype lightning definition*/
	lightning.push($(".lightning"));
    var w0 = parseInt(lightning[0].css("width"), 10);
    var h0 = parseInt(lightning[0].css("height"), 10);
    var minWidth = w0 / 4;

    	/*setting next lightning*/
    function newLightning(pos){
        lightning[pos].css("width", getRandomInt(minWidth, w0));
        lightning[pos].css("height", lightning[pos][pos].width/ (w0/h0));
        lightning[pos].css("top", getRandomInt(0, $(window).height() ));
    }

    //make the first lightning
    newLightning(0);
    
    //console.log(lightning[0][0].width);

    	/*global variable for interval to move the lightning*/
    var lightningMoveInterval ;

        /* initial left position of prototype lightning*/
    var lThis = parseInt(lightning[0].css("left"));

    function moveLightning(){
        //moving single lightning
		lightning[0].css("left", lThis);
		lThis ++;

        //when lighning reached the other side
        if ( (lightningSpawning == false) && ( parseFloat(lightning[0].css("left")) > windowWidth ) ){
            console.log('lightning reached other side');
            lightningSpawning = true;
            //remove the object (this keeps some of the data - there's another way to do it)
            lightning[0].detach();

        }
    }

    // run this function only once. Start the lightning moving and get rid of the functions to reposition the speech bubble
    $('#kepler a').one( 'click', function(){
        $window.off('resize');
        $window.off('scroll');
        fadeOut($('#bubble'));
        lightningMoveInterval = setInterval(moveLightning, 33);
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
        console.log('recalculate ran');
    }

    function toggleOffscreen(){
        $bubble.toggleClass('offscreen', ($window.scrollTop() + windowHeight) < bubbleTop);
        console.log('scroll ran');
    }

    // run recalculate once on start
    recalculateWindow();
    //run recalculate again on each window resize
    $window.on('resize', recalculateWindow);

    //run toggleOffscreen on each scroll event
    $window.on('scroll', toggleOffscreen);        
    
});
