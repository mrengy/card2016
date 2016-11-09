$( document ).ready(function() {
    var initialTimeout = window.setTimeout(fadeOutSlide1, 4000);

    function fadeOutSlide1(){
    	fadeOut($("#slide-1"));
    }

    function fadeOut(target){
    	target.fadeTo(3000,0,'swing',
    		function(){
    			target.addClass('hidden');
    		}
    	);
    }


});
