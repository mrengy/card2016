$( document ).ready(function() {
    var pauseTime = 4000;
    var transitionTime = 3000;

    var initialTimeout = window.setTimeout(fadeOutSlide1, pauseTime);

    function fadeOutSlide1(){
    	fadeOut($("#slide-1"));
    	reveal($("#slide-2"));
    	var afterSlide1Timeout = window.setTimeout(revealSlide3, pauseTime);
    }

    function revealSlide3(){
    	reveal($("#slide-3"));
    	console.log('revealSlide3 called');
    }

    function fadeOut(target){
    	target.fadeTo(transitionTime,0,'swing',
    		function(){
    			target.addClass('hidden');
    		}
    	);
    }

    function reveal(target){
    	console.log('reveal called');
    	//target.removeClass('hidden');
    	target.fadeTo(transitionTime,1,'swing');
    }

});
