/**
 * LazyLoading
 */
define([
	'elements',
	'events',
	'basejs/vendor/lazyload'
], function(el, evt, LazyLoad) {
		"use strict";


	var LazyLoading = function(options) {
		var options = defaults(options);

		function init() {
			var myLazyLoad = new LazyLoad({
				threshold: (options.isMobile) ? 0 : -200,
				elements_selector: options.lazyClass,
				throttle: (options.isMobile) ? 40 : 200,
				data_src: "src",
				class_loaded: 'has-loaded',
				show_while_loading: true,
				callback_set: (options.isBooks) ? loadFirstBookOverlayImage : null
			});
		}

		function loadFirstBookOverlayImage(element) {
			// select the image of the first section of currently loaded book
			// .js-book-slide[data-book-id="BOOKID"] [data-book-item-index="0"] .js-ll-book-imgs
			var selector = '.js-book-slide[data-book-id="' + element.parentNode.getAttribute('data-book-id') + '"] ' +
				'[data-book-item-index="0"] .js-ll-book-imgs';

			setSource(document.querySelector(selector));
		}

		function setSource(img) {
			if(img === null) return;

			var src = img.getAttribute('data-src');
			var srcSet = img.getAttribute('data-srcset');
			var isLoaded = el.hasClass(img, 'is-loaded');

			if(!isLoaded){
				if (srcSet) {
					img.setAttribute("srcset", srcSet);
				}

				if (src) {
					img.setAttribute("src", src);
				}
				el.addClass(img, 'is-loaded');
			}
		}


		function defaults(opts) {
			var options = opts || {};
			var defaults = {
				lazyClass: '.js-be-lazy'
			};

			for (var prop in defaults) {
				if (!options[prop]){
					options[prop] = defaults[prop];
				}
			}
			return options;
		}

		init(); // get the party started

		return {
		};
	}
	return LazyLoading;
});
