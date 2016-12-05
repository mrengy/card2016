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

    	/*initial lightning definition*/
	lightning[0] = $(".lightning");
    var w0 = parseInt(lightning[0].css("width"), 10);
    var h0 = parseInt(lightning[0].css("height"), 10);
    var minWidth = w0 / 4;

    	/*setting next lightning*/
    var wThis = getRandomInt(minWidth, w0);
    var hThis = wThis / (w0/h0)
    var topThis = getRandomInt(0, $(window).height());
    var lThis = parseInt(lightning[0].css("left"));
    lightning[0].css("width", wThis);
    lightning[0].css("height", hThis);
    lightning[0].css("top", topThis);

    	/*moving lightning*/
    var lightningMoveInterval = setInterval(moveLightning, 10);
    
    function moveLightning(){
    	//only start when slide 3 is done
    	if( $.inArray("slide-3",slideCompleted) !== -1){
    		lightning[0].css("left", lThis);
    		lThis ++;
            if ( (lightningSpawning == false) && ( parseFloat(lightning[0].css("left")) > $(window).width() ) ){
                console.log('start the party');
                lightningSpawning = true;
            }
    	}
    }

    	/*reusable generic functions*/
    function getRandomInt (min, max) {
	    return Math.floor(Math.random()*(max-min+1)+min);
	}

    /*positioning bubble*/
    var $window = $(window),
        $footer = $('footer'),
        $bubble = $('#bubble'),
        $silhouettes = $('#silhouettes'),
        silhouettesHeight = $silhouettes.height(),
        footerHeight = $footer.height();

    $window.resize(function(){
        silhouettesHeight = $silhouettes.height();
        footerHeight = $footer.height();
    });

    $window.scroll(function(){
        $bubble.toggleClass('offscreen', $window.scrollTop() < (silhouettesHeight - footerHeight - 60));
        console.log("silhouettesHeight: "+silhouettesHeight);
        console.log("scrollTop: "+$window.scrollTop());
    });
});
