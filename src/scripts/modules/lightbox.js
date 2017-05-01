/**
 * Lightbox
 * TODO: lazy load of script
 */
define([
	'elements',
	'events',
	'basejs/vendor/photoswipe',
	'basejs/vendor/photoswipe-ui'
], function(elements, evt, PhotoSwipe, PhotoSwipeUI_Default) {
		"use strict";

	var Lightbox = function(options) {

		// setup defaults
		var options = defaults(options);
		var galleryElements;
		var slideElements;
		var pswp;
		var header;
		var transformProperty;
		var transforms = ["transform",
									"msTransform",
									"webkitTransform",
									"mozTransform",
									"oTransform"];


		function defaults(opts) {
			var options = opts || {};

			var defaults = {
				gallerySelector: '.js-gallery',
				slideSelector: '.js-slide'
			};

			for (var prop in defaults) {
				if (!options[prop]){
					options[prop] = defaults[prop];
				}
			}
			return options;
		}

		function parseThumbnailElements(el) {
			var thumbElements = slideElements;
			var numNodes = thumbElements.length;
			var items = [];
			var figureEl;
			var linkEl;
			var size;
			var item;
			var title;

			for(var i = 0; i < numNodes; i++) {
				figureEl = thumbElements[i]; // <figure> element

				// include only element nodes
				if(figureEl.nodeType !== 1) {
						continue;
				}

				linkEl = figureEl.children[0]; // <a> element
				size = linkEl.getAttribute('data-size').split('x');

				var overlayTitle = elements.find('.js-overlay-title', figureEl)[0].innerHTML;
				var overlayDescription = elements.find('.js-overlay-sub-title', figureEl)[0].innerHTML;

				title = overlayTitle;
				if(overlayTitle != '' && overlayDescription != ''){
					title = overlayTitle + '<span class="separator hide-on-mobile">/</span> ';
				}
				title += '<span class="hide-on-mobile">' + overlayDescription + '</span>';

					// create slide object
					item = {
							msrc: elements.find('.js-slide-thumbnail', figureEl)[0].src,
							src: linkEl.getAttribute('href'),
							w: parseInt(size[0], 10),
							h: parseInt(size[1], 10),
							title: title,
							vGap: {
								top:90,
								bottom:40
							}
					};
					item.el = figureEl; // save link to element for getT<humbBoundsFn
					items.push(item);
				}
				return items;
			}; // end parseThumbnailElements

			// find nearest parent element
			function closest(el, fn) {
					return el && ( fn(el) ? el : closest(el.parentNode, fn) );
			};

			// triggers when user clicks on thumbnail
			function onThumbnailsClick(e) {
				e = e || window.event;
				e.preventDefault ? e.preventDefault() : e.returnValue = false;

				var eTarget = e.target || e.srcElement;

				// find root element of slide
				var clickedListItem = closest(eTarget, function(el) {
					return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
				});

				if(!clickedListItem) { return; }

				var index = parseInt(clickedListItem.getAttribute('data-slide-index'));
				if(index >= 0) {
					elements.addClass(elements.find('.js-img-overlay', clickedListItem)[0], 'animate-out');
					elements.addClass(header, 'is-gallery');

					window.setTimeout(function(){
						elements.addClass(header, 'delay--5');
						openPhotoSwipe( index, galleryElements[0] );
					}, 400);
				}
				return false;
			};

			// parse picture index and gallery index from URL (#&pid=1&gid=2)
			function photoswipeParseHash() {
				var hash = window.location.hash.substring(1),
				params = {};

				if(hash.length < 5) {
					return params;
				}

				var vars = hash.split('&');
				for (var i = 0; i < vars.length; i++) {
						if(!vars[i]) {
								continue;
						}
						var pair = vars[i].split('=');
						if(pair.length < 2) {
								continue;
						}
						params[pair[0]] = pair[1];
				}

				if(params.gid) {
					params.gid = parseInt(params.gid, 10);
				}

				return params;
			};

			function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
				var gallery;
				var options;
				var pswpElement = document.querySelectorAll('.pswp')[0];
				var items = parseThumbnailElements(galleryElement);

				// define options (if needed)
				options = {
					galleryUID: galleryElement.getAttribute('data-pswp-uid'),
					getThumbBoundsFn: function(index) {
							// See Options -> getThumbBoundsFn section of documentation for more info
							var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
									pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
									rect = thumbnail.getBoundingClientRect();

							return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
					},
					showHideOpacity: false,
					spacing: 0,
					preloaderEl: false,
					fullscreenEl: false,
					zoomEl: false,
					shareEl: false,
					history: false,
					preload: [1,2],
					barsSize: {
						top: 90,
						bottom: 25
					}
				};

				// PhotoSwipe opened from URL
				if(fromURL) {
					if(options.galleryPIDs) {
						// parse real index when custom PIDs are used
						// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
						for(var j = 0; j < items.length; j++) {
							if(items[j].pid == index) {
								options.index = j;
								break;
							}
						}
					} else {
						// in URL indexes start from 1
						options.index = parseInt(index, 10) - 1;
					}
				} else {
					options.index = parseInt(index, 10);
				}

				// exit if index not found
				if( isNaN(options.index) ) {
						return;
				}

				if(disableAnimation) {
						options.showAnimationDuration = 0;
				}

				// Pass data to PhotoSwipe and initialize it
				gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
				gallery.init();
				gallery.listen('close', onLightboxClose);
				// disable zoom
				gallery.options.maxSpreadZoom = gallery.getZoomLevel();
				gallery.options.getDoubleTapZoom = function(isMouseClick, item) {
					return item.initialZoomLevel;
				};
			};

			function init(){
				// loop through all gallery elements and bind events
				galleryElements = document.querySelectorAll( options.gallerySelector );
				slideElements = document.querySelectorAll( options.slideSelector );
				header = elements.find('.js-site-head')[0];

				for(var i = 0, l = slideElements.length; i < l; i++) {
					slideElements[i].setAttribute('data-pswp-uid', i+1);
					slideElements[i].onclick = onThumbnailsClick;
				}

				transformProperty = getSupportedPropertyName(transforms);
				// var hashData = photoswipeParseHash();
				// if(hashData.pid && hashData.gid) {
				// 	openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
				// }
			}

			function onLightboxClose () {
				elements.removeClass(elements.find('.animate-out')[0], 'animate-out');
				elements.removeClass(header, 'is-gallery');

				window.setTimeout(function(){
					elements.removeClass(header, 'delay--5');
					setTranslate3DTransform(elements.find('.pswp__container')[0],0,0,0);
				}, 400);
			}

		function setTranslate3DTransform(element, xPos, yPos, zPos){
			yPos = yPos || 0;
			zPos = zPos || 0;

			var value = "translate3d(" + xPos + ", " + yPos + ", " + zPos + ")";
			element.style[transformProperty] = value;
		}

		function getSupportedPropertyName(properties) {
			for (var i = 0; i < properties.length; i++) {
				if (typeof document.body.style[properties[i]] != "undefined") {
					return properties[i];
				}
			}
			return null;
		}

		return {
			init: init
		};
	};

	return Lightbox;
});
