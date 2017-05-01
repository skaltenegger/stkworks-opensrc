/**
 * PageTransitions
 */
define([
	'elements',
	'events',
], function(el, evt) {
	"use strict";

	var PageTransitions = function(options) {
		var excludes = [
			'js-nav-work',
			'js-menu-close',
			'js-menu-toggle',
			'js-scroll-to',
			'js-no-page-transition',
			'js-open-book',
			'js-next-book-section',
			'js-prev-book-section',
			'js-next-book',
			'js-prev-book',
			'js-close-book',
			'js-show-map'
		];




// $('div').each(function() {
//   var elClasses = ' ' + $(this).attr('class').replace(/\s+/, ' ') + ' ';
//   if (regex.test(elClasses)) {
//     $(this).addClass('valid');
//   }
// })


		function init() {
			var links = el.find('a');
			var i;

			for (i = 0; i < links.length; ++i) {
				//exclude external links and those from the excludes array
 				if(links[i].getAttribute('target') !== null || el.hasClasses(links[i], excludes)) continue;

 				evt.addListener(links[i], 'click', function(event){


 					var target; // normalize the damn thing
					if (!event) var event = window.event;
					if (event.targetet) target = event.targetet;
					else if (event.srcElement) target = event.srcElement;
					if (target.nodeType == 3) // defeat Safari bug
						target = target.parentNode;

					if(target.tagName != 'A'){
						target = el.findParentByTag(target, 'a');
					}

					var url = target.getAttribute('href');

					if(!url.startsWith('mailto:')) {
						event.preventDefault();
						el.addClass(el.find('#site')[0], 'anim-out');
						window.setTimeout(function(){
							window.location.href = url;
						}, 1000);
					};


 				});

			}

		}

		function defaults(opts) {
			var options = opts || {};

			var defaults = {
			};

			for (var prop in defaults) {
				if (!options[prop]){
					options[prop] = defaults[prop];
				}
			}
			return options;
		}

		// get the party started
		init();

		return {
		};

	}
	return PageTransitions;
});
