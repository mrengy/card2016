$( document ).ready(function() {
    var pauseTime = 4;
    var transitionTime = 3;

    var initialTimeout = window.setTimeout(fadeOutSlide1, pauseTime);

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
    	target.fadeTo(transitionTime,1,'swing');
    }

});
