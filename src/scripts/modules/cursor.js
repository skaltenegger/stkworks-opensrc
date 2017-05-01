/**
 * Cursor
 */
define(['elements', 'events'], function(el, evt) {
		"use strict";

	var Cursor = function(options) {
		// setup defaults
		var options = defaults(options);
		var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		var viewportHalfHeight = viewportHeight / 2;
		var posX = 0;
		var posY = 0;
		var lastScrollPos = 0;
		var isMoving = false;
		var isScrolling = false;
		var rotation;
		var freeze = false;
		var cursorHalfX = options.cursor.offsetWidth / 2;
		var cursorHalfY = options.cursor.offsetHeight / 2;
		var header = el.find('.js-site-head')[0];
		var infoBoxes = el.find('.js-book-description-box');

		var transforms = ["transform",
											"msTransform",
											"webkitTransform",
											"mozTransform",
											"oTransform"];

		var transformProperty = getSupportedPropertyName(transforms);

		function init() {
			hideCursor();
			evt.addListener(document, 'mousemove', onMove);

			evt.addListener(header, 'mouseenter', showCursor);
			evt.addListener(header, 'mouseleave', hideCursor);
			for (var i = 0; i < infoBoxes.length; ++i) {
				evt.addListener(infoBoxes[i], 'mouseenter', showCursor);
				evt.addListener(infoBoxes[i], 'mouseleave', hideCursor);
				evt.addListener(window, 'scroll', onScroll);

			}

			requestAnimationFrame(animationLoop);
		}

		function defaults(opts) {
			var options = opts || {};

			var defaults = {
				container: window,
				cursor: el.find('#cursor')[0]
			};

			for (var prop in defaults) {
				if (!options[prop]){
					options[prop] = defaults[prop];
				}
			}
			return options;
		}

		function getSupportedPropertyName(properties) {
			for (var i = 0; i < properties.length; i++) {
				if (typeof document.body.style[properties[i]] != "undefined") {
					return properties[i];
				}
			}
			return null;
		}

		function onMove(evt) {
			posX = evt.pageX - cursorHalfX;
			posY = evt.pageY - cursorHalfY;
			isMoving = true;
		}

		function onScroll(evt) {
			isScrolling = true;
		}

		function animationLoop() {
			if(isMoving && !freeze || isScrolling) {

				var sp = getScrollPosition();
				if(isScrolling) {
					var scrollDelta = sp - lastScrollPos;
					posY += scrollDelta;
					lastScrollPos = sp;
					isScrolling = false;
				}

				setTranslate3DTransformXY(options.cursor, posX + 'px', posY + 'px');

				if((posY - sp) <= viewportHalfHeight){
					rotateCursor('up');
				} else if((posY - sp) > viewportHalfHeight){
					rotateCursor('down');
				}
				isMoving = false;
			}
			requestAnimationFrame(animationLoop);

		}



		function setTranslate3DTransformXY(element, xPos, yPos){
			yPos = yPos || 0;
			var value = "translate(" + xPos + ", " + yPos + ")";
			element.style[transformProperty] = value;
		}

		// Cross-browser way to get the current scroll position
		function getScrollPosition(element) {
			element = element || document.documentElement;

			if (element.scrollTop == 0) {
				return document.body.scrollTop;
			} else {
				return element.scrollTop;
			}
		}


		function hideCursor(){
			document.body.style.cursor = 'none';
			el.removeClass(options.cursor, 'is-hidden');
		}

		function showCursor() {
			// wait for css-transition
			window.setTimeout(function(){
				document.body.style.cursor = 'auto';
			}, 300);
			el.addClass(options.cursor, 'is-hidden');
		}

		function rotateCursor(direction) {

			// if(rotation === direction){ console.log('nothing to do');return; }

			if(rotation !== undefined) {
				el.removeClass(options.cursor, 'is-rotated-' + rotation);
			}
			// console.direction);
			el.addClass(options.cursor, 'is-rotated-' + direction);
			rotation = direction;
		}

		// get the party started
		init();
		return {
			getRotation: function(){
				return rotation;
			}
		};
	};

	return Cursor;
});
