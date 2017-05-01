/**
 * Descrition
 */
define(['ready', 'elements', 'events'], function(domReady, el, evt) {
	'use strict';


	var requestAnimationFrame = window.requestAnimationFrame ||
															window.mozRequestAnimationFrame ||
															window.webkitRequestAnimationFrame ||
															window.msRequestAnimationFrame;
	var scrolling = false;

	var options = {};
	var books = [];
	var currentBook = 0;
	var currentBookSection = 0;
	var numOfBooks = 0;


	function ScrollNav(elementsSelector, opts) {
		if (!(this instanceof ScrollNav)) {
			throw new TypeError('ScrollNav constructor cannot be called as a function.');
		}


		options = opts || {};

		var defaults = {
			anchorLink: '.js-scrollTo',
			onChange: function(){}
		};

		for (var prop in defaults) {
			if (!options[prop]){
				options[prop] = defaults[prop];
			}
		}

		var allSections = el.find('.js-slide');

		for (var i = 0; i < allSections.length; ++i) {
			books.push(calculateSections(allSections[i]));
		}

		numOfBooks = books.length;
		evt.addListener(window, 'scroll', setScrolling);

		animationLoop();

	}

	function setScrolling(){
		scrolling = true;
	}

	function calculateSections(sectionElements, container) {

		var sectionElements = el.find('.js-book-item', sectionElements);
		var sections = [];
		var offset = 0;

		for (var i = 0; i < sectionElements.length; i++) {
			var sectionElBox = sectionElements[i].getBoundingClientRect();
			var pos = findPos(sectionElements[i]);

			if(i == 0 && pos[0] > 0) {
				offset = pos[0];
			}

			sections[i] = {
				top: pos[0] - offset,
				bottom: pos[0] - offset + sectionElBox.height,
				element: sectionElements[i]
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
		return [curtop, curleft];

		// var _x = 0;
  //   var _y = 0;
  //   while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
  //       _x += el.offsetLeft - el.scrollLeft;
  //       _y += el.offsetTop - el.scrollTop;
  //       el = el.offsetParent;
  //   }
  //   return { top: _y, left: _x };
	}

	function getScrollPosition() {
		if (document.documentElement.scrollTop == 0) {
			return document.body.scrollTop;
		} else {
			return document.documentElement.scrollTop;
		}
	}

	function isInSection(scrollPos, sections){
		for (var i = sections.length - 1; i >= 0; i--) {
			if(scrollPos >= sections[i].top && scrollPos < sections[i].bottom && currentBookSection != i) {
				setBookSection(i);
			}
		}
	}

	function setBookSection(sectionId){
		currentBookSection = sectionId;
	}

	function animationLoop(){
		if (scrolling) {
			var sp = getScrollPosition();
			isInSection(sp, books[currentBook]);
			scrolling = false;
		}

		requestAnimationFrame(animationLoop);
	}

	/**
	* Constructor
	*/
	ScrollNav.prototype.constructor = ScrollNav;

	ScrollNav.prototype.setCurrentBook = function(index){
		currentBook = index;
		currentBookSection = 0;
		window.scrollTo(0, 0);
	}

	ScrollNav.prototype.setNextBook = function() {
		if(currentBook < numOfBooks) {
			this.setCurrentBook(currentBook +1);
		}
	}

	ScrollNav.prototype.setPrevBook = function() {
		if(currentBook >=0) {
			this.setCurrentBook(currentBook -1);
		}
	}

	// ScrollNav.prototype = Object.create(ScrollNav.prototype);

	return ScrollNav;
});
