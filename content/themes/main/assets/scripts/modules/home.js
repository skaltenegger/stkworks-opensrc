/**
 * Menu
 */ 
 

define(['elements', 'events', 'waypoints'], function(el, evt, Waypoint) {
	"use strict";
	var Home = function() {  

			var waypoint = new Waypoint({
			  element: document.getElementById('hero'),
			  handler: function(direction) {
			    notify(this.id + ' hit')
			  }
			}); 
 
	 }; 
	 return Home; 

});

