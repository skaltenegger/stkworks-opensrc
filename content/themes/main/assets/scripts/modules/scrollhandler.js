/**
 * ScrollHandler
 */
define([
	'elements',
	'events',
	'basejs/modules/books',
	'basejs/vendor/smooth-scroll',
	'basejs/modules/svganimations'], function(el, evt, Books, smoothScroll, SVGAnimations) {
		"use strict";

	var ScrollHandler = function(options) {
		// setup defaults
		var options = defaults(options);
		var requestAnimationFrame = window.requestAnimationFrame ||
														window.mozRequestAnimationFrame ||
														window.webkitRequestAnimationFrame ||
														window.msRequestAnimationFrame;
		var isScrolling = false;
		var currentScrollPosition = 0;
		var header = {
			el: undefined,
			state: 1 // states: 1 == shown, 0 == hidden
		};
		var subHeader;
		var pageSections = [];
		var currentSection = -1;
		var sectionLinks;
		var books;
		var isBooks = false;
		var isAbout = false;
		var isServices = false;
		var isFrontPage = false;
		var svgAnimations;
		var hasSVGAnimations = false;
		var scrollThreshold = 0;
		var siteMenu;

		function defaults(opts) {
			var options = opts || {};

			var defaults = {
				openClass: 'is-hidden',
				headerSelector: '.site-head',
				subHeaderSelector: '.sub-head'
			};

			for (var prop in defaults) {
				if (!options[prop]){
					options[prop] = defaults[prop];
				}
			}
			return options;
		}


		function init () {
			header.el = el.find(options.headerSelector)[0];
			hasSVGAnimations = el.exists('.has-svg-animations');
			siteMenu = el.find('.site-menu')[0];

			if(hasSVGAnimations){
				svgAnimations = new SVGAnimations();

				if(el.exists('#harald-eisenberger')){
					svgAnimations.drawSVG('#harald-eisenberger', function(){
						el.addClass(el.find('.js-site')[0], 'lets-go');
					}, 60, 0.8);
				}

				if(el.exists('#enter-site')){
					setTimeout(function() {
						svgAnimations.drawSVG('#enter-site', function(){}, 30);
					}, 1000);
				}

				var icons = el.find('.icon-link__svg.animate');
				svgAnimations.prepareSVGs(icons);
			}

			if(el.exists('.js-is-about')){
				subHeader = el.find(options.subHeaderSelector)[0];
				sectionLinks = el.find('.js-scroll-to');
				pageSections = calculateSections('.js-section');
				isAbout = true;
				fixOffsetForSubHeadLinks();
			}

			if(el.exists('.js-book-overlay')){
				books = new Books({
					scrollHandler: {
						initBookSections:initBookSections,
						scrollTo: scrollTo,
						getScrollPosition: getScrollPosition,
						setScrollPosition: setScrollPosition
					}
				});
				isBooks = true;
			}

			isServices = el.exists('.is-services');
			isFrontPage = el.exists('.is-frontpage');

			if(isServices || isFrontPage) {
				var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
				pageSections = calculateSections((isServices) ? '.js-service' : '.js-section', document, false, -(viewportHeight/2), false);
			}
			evt.addListener(window, 'scroll', setScrolling);
			animationLoop(); // get the party started

			smoothScroll.init({
				offset: isAbout	? 100 : 0,
				easing: 'easeOutCubic',
				speed: 700
			});
		}

		function initBookSections(){
			var bookSections = [];
			var i = 0;
			var bookSlides = el.find('.js-book-slide');
			var posFromTop = 0;
			for (i; i < bookSlides.length; i++) {
				var sections = calculateSections('.js-section', bookSlides[i], false, -posFromTop, false);
				posFromTop += sections[sections.length-1].bottom + 1;
				bookSections.push(sections);
			}
			return bookSections;
		}

		/**
		 * Scrollthreshold because of iPad / iPhone rubber band effect
		 */
		function animationLoop() {
			var sp;
			var isScrollingDown;

			if (isScrolling) {
				sp = getScrollPosition();
				isScrollingDown = currentScrollPosition < sp;

				scrollThreshold += currentScrollPosition - sp;
				if(Math.abs(scrollThreshold) > 250){
					if(isScrollingDown && header.state == 1){
						hideHeader();
					}else if(!isScrollingDown && header.state == 0){
						showHeader();
					}
				}

				if(sp == 0){
					onTop();
				}

				if(isBooks  && books.isOpen()){
					var section = isInSection(sp, books.getSections());
					if(section >= 0 && section !== books.getCurrentSection()){
						books.setSection(section);
					}
				}

				if(isAbout || isServices || isFrontPage){
					var section = isInSection(sp, pageSections);
					if(section >= 0 && section !== currentSection){

						if(isAbout){
							updateSectionLinks(section);
						}
						currentSection = section;

						if(isServices || isFrontPage){
							svgAnimations.draw(currentSection);
							el.addClass(pageSections[currentSection].element, 'is-animated');

							// if(isFrontPage && currentSection == 2){
								// drawIcons();
							// }
						}
					}
				}

				currentScrollPosition = sp;
				isScrolling = false;
			}

			requestAnimationFrame(animationLoop);
		}


		function hideHeader () {
			header.state = 0;
			el.addClass(header.el, 'is-hidden');

			if(subHeader){
				el.addClass(subHeader, 'is-expanded');
			}
		}


		function showHeader () {
			header.state = 1;
			el.removeClass(header.el, 'is-hidden');
		}


		function onTop () {
			if(subHeader){
				el.removeClass(subHeader, 'is-expanded');
			}
		}


		function scrollTo(id) {
			smoothScroll.animateScroll(null, '#' + id);
		}


		function setScrolling() {
			isScrolling = true;
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


		function setScrollPosition(position) {
			document.documentElement.scrollTop = position;
			document.body.scrollTop = position;
		}


		function calculateSections(selector, container, byId, offset, fromTop) {
			offset = offset || 0;

			if(byId == undefined){
				byId = true;
			}

			if(fromTop == undefined){
				fromTop = true;
			}
			var sectionElements = el.find(selector, container || document);
			var sections = [];
			var pos = 0;
			// var isFirst = true;
			var i = 0;

			for (i; i < sectionElements.length; i++) {
				if(sectionElements[i].id != '' || !byId) {
					if(!fromTop){
						pos = findPos(sectionElements[i])[0] + offset;
					} else {
						fromTop = false;
					}

					sections.push({
						top: pos,
						bottom: pos + sectionElements[i].offsetHeight -1,
						element: sectionElements[i],
						id: sectionElements[i].id
					});
				}
			}
			return sections;
		}


		function findPos(obj) {
			var curleft = 0;
			var curtop = 0;

			if (obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;

				} while (obj = obj.offsetParent);

				return [curtop, curleft];
			}
		}


		function isInSection(scrollPos, sections){
			if(sections === undefined){
				return -1;
			}

			var numOfSections = sections.length -1;
			for (var i = numOfSections; i >= 0; i--) {
				if(scrollPos>= sections[i].top && i == numOfSections){
					return i;
				}

				if(sections[i+1] && scrollPos >= sections[i].top && scrollPos <= sections[i+1].top){
					return i;
				}
			}
		}


		function updateSectionLinks(sectionId) {
			el.removeClass(el.find('.is-current-section')[0], 'is-current-section');
			el.addClass(sectionLinks[sectionId], 'is-current-section');
		}


		function fixOffsetForSubHeadLinks() {
			var imgSections = el.find('.js-section--about-img');
			for (var i = imgSections.length - 1; i >= 0; i--) {
				sectionLinks[i].setAttribute('data-options', '{ "offset": ' + (imgSections[i].offsetHeight + 50) + ' }');
				pageSections[i].top -= imgSections[i].offsetHeight + 50;
			};
		}

		init();

		return {
			initBookSections: initBookSections,
			scrollTo: scrollTo,
			getScrollPosition: function(){
				return currentScrollPosition;
			}
		};
	};

	return ScrollHandler;
});
