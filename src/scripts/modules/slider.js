/**
 * Slider
 */
define(['elements', 'events', 'jquery', 'basejs/modules/scrollNav', 'slick'], function(el, evt, $, ScrollNav) {
		"use strict";

	var Slider = function(options) {

		var options = defaults(options);
		var $slickSlider = $('.js-slides');
		var scrollNav = new ScrollNav();
		var infoBox = {
			titleEl: el.find('.js-book-title')[0],
			publisherEl: el.find('.js-book-publisher')[0],
			isbnEl: el.find('.js-book-isbn')[0]
		}

		function init() {

			$slickSlider.slick({
				dots: false,
				arrows: false,
				fade: false,
				infinite: true,
				speed: 300,
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true,
				initialSlide: options.initialSlide
			});


			$('.js-next-book').click(function(e){
				e.preventDefault();
				$slickSlider.slick('slickNext');
				scrollNav.setNextBook();
				// window.scrollTo(0, 0);
			});

			$('.js-prev-book').click(function(e){
				e.preventDefault();
				$slickSlider.slick('slickPrev');
				scrollNav.setPrevBook();
				// window.scrollTo(0, 0);
			});


			$slickSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
			  updateInfoBox(options.books[currentSlide]);
			  options.setCurrentBook(currentSlide);
			});

			// lazy load images on demand
			$slickSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			  options.loadBookImages(options.bookElements[nextSlide]);
			});
		}

		function defaults(opts) {
			var options = opts || {};

			var defaults = {
				initialSlide: 0,
				container: window,
				cursor: '',
				books: {},
				bookElements: []
			};

			for (var prop in defaults) {
				if (!options[prop]){
					options[prop] = defaults[prop];
				}
			}
			return options;
		}

		function scrollTo(element, to, duration) {
			if (duration < 0) return;
			var difference = to - element.scrollTop;
			var perTick = difference / duration * 10;

			setTimeout(function() {
				element.scrollTop = element.scrollTop + perTick;
				if (element.scrollTop === to) return;
				scrollTo(element, to, duration - 10);
			}, 10);
		}

		function scrollNext(){
			console.log("scrollnext");
		}

		function scrollPrev(){
			console.log("scrollprev");
		}

		function updateInfoBox(book){
			infoBox.titleEl.innerHTML = book.title;
			infoBox.publisherEl.innerHTML = book.publisher;
			infoBox.isbnEl.innerHTML = book.isbn;
		}

		function slideTo (slideIndex, shouldAnimate) {
			console.log(slideIndex);
			// should animate true == no animation ... okay!
			$slickSlider.slick('slickGoTo', slideIndex, !shouldAnimate);
		}



		init();

		return {
			scrollNext: scrollNext,
			slideTo: slideTo,
			updateInfoBox: updateInfoBox
		};
	}
	return Slider;

});