jQuery(window).bind('keydown', function(event) {
	if (event.ctrlKey || event.metaKey) {
		if(String.fromCharCode(event.which).toLowerCase() == 's') {
			// stop the page from trying to download
			event.preventDefault();
			// trigger page update or page publish
			jQuery('#publish').click();
		}
	}
});