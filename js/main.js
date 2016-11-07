$( document ).ready(function() {
    fadeOut($("#slide-1"));

    function fadeOut(target){
    	target.fadeTo(1000,0,
    		function(){
    			target.addClass('hidden');
    		}
    	);
    }
});
