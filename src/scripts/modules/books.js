/**
 * Books
 */
define([
	'elements',
	'events',
	'basejs/modules/cursor',
	'basejs/modules/slider'
], function(el, evt, Cursor, Slider) {
		"use strict";

	var Books = function(options) {
		// setup defaults
		var options = defaults(options);
		var wrapper = el.find(options.wrapperSelector)[0];
		var descriptionBox = el.find('.js-book-description-box')[0];
		var slider;
		var books = [];
		var cursor;
		var windowScrollPosition;
		var currentSection = 0;
		var currentBook = 0;
		var isOpen = false;
		var sections = [];
		var bookElements;
		var nextSectionLink;
		var prevSectionLink;

		function init() {
			// cache book elements
			bookElements = el.find('.js-book-slide');
			for (var i = 0; i < bookElements.length; ++i) {
				books[i] = {
					id: parseInt(bookElements[i].getAttribute('data-book-id')),
					title: bookElements[i].getAttribute('data-book-title'),
					publisher: bookElements[i].getAttribute('data-book-publisher'),
					isbn: bookElements[i].getAttribute('data-book-isbn')
				}
				// // load the first image of every book
				// setSource(bookElements[i].children[0].children[0]);
			}

			nextSectionLink = el.find('.js-next-book-section')[0];
			prevSectionLink = el.find('.js-prev-book-section')[0];

			evt.addListener(options.openLinkSelector, 'click', function(event){
				event.preventDefault();
				open(parseInt(event.currentTarget.getAttribute('data-book-id')));
			});

			evt.addListener(options.closeLinkSelector, 'click', function(event){
				event.preventDefault();
				close();
			});

			evt.addListener(nextSectionLink, 'click', function(event){
				event.preventDefault();
				scrollToNextSection();
			});

			evt.addListener(prevSectionLink, 'click', function(event){
				event.preventDefault();
				scrollToPreviousSection();
			});
		}

		function defaults(opts) {
			var options = opts || {};

			var defaults = {
				openLinkSelector: '.js-open-book',
				closeLinkSelector: '.js-close-book',
				wrapperSelector: '.js-site-body'
			};

			for (var prop in defaults) {
				if (!options[prop]){
					options[prop] = defaults[prop];
				}
			}
			return options;
		}

		function open(id) {
			windowScrollPosition = options.scrollHandler.getScrollPosition();
			el.addClass(wrapper, 'is-book-open');
			currentBook = getBookIndexById(id);
			loadBookImages(bookElements[currentBook]);

			if (slider !== undefined) {
				slider.slideTo(currentBook, false);
			} else {
				 //init sections before slider (b/c of cloned slides)
				if(sections.length == 0){
					sections = options.scrollHandler.initBookSections();
				}

				slider = new Slider({
					initialSlide: currentBook,
					books: books,
					setCurrentBook: setCurrentBook,
					bookElements: bookElements,
					loadBookImages: loadBookImages
				});
			}

			window.scrollTo(0, 0);
			slider.updateInfoBox(books[currentBook]);
			isOpen = true;
		}

		function close(){
			options.scrollHandler.setScrollPosition(windowScrollPosition);
			el.removeClass(wrapper, 'is-book-open');
			isOpen = false;
		}

		function scrollToNextSection() {
			var scrollTo = (sections[currentBook][currentSection+1] !== undefined) ? currentSection + 1 : currentSection - 1;
			if(scrollTo >= 0 && scrollTo < sections[currentBook].length){
				console.log(sections[currentBook][scrollTo].id);
				options.scrollHandler.scrollTo(sections[currentBook][scrollTo].id);
			}
		}


		function scrollToPreviousSection() {
			var scrollTo = (sections[currentBook][currentSection-1] !== undefined) ? currentSection - 1 : currentSection + 1;
			if(scrollTo >= 0 && scrollTo < sections[currentBook].length){
				options.scrollHandler.scrollTo(sections[currentBook][scrollTo].id);
			}
		}

		// function loadFirstBookImages() {
		// 	// load the first image of every book
		// 	for (var i = 0; i < bookElements.length; ++i) {
		// 		setSource(bookElements[i].children[0].children[0]);
		// 	}
		// }

		// function loadFirstBookImage(bookElement) {
		// 	console.log('loading: ', bookElement);
		// }


		function loadBookImages(bookElement) {
			var imgs = el.find('.js-ll-book-imgs', bookElement);
			for (var i = 0; i < imgs.length; ++i) {
				setSource(imgs[i]);
			}
		}

		function setSource(img) {
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

		function getBookIndexById (id) {
			return books.map(function(book) { return book.id; }).indexOf(id);
		}


		function setCurrentBook(bookId) {
			currentBook = bookId;
		}

		// get the party started
		init();

		return {
			open: open,
			getSections: function(){
				return sections[currentBook];
			},
			isOpen: function(){
				return isOpen;
			},
			getCurrentSection: function(){
				return currentSection;
			},
			setSection: function(section){
				currentSection = section

				// prev: first section add inverted
				if(section == 0 && !el.hasClass(prevSectionLink, 'is-inverted')) {
					el.addClass(prevSectionLink, 'is-inverted');
				}

				// prev: not the first section remove inverted
				if(section > 0 && el.hasClass(prevSectionLink, 'is-inverted')){
					el.removeClass(prevSectionLink, 'is-inverted');
				}

				// next: last section add inverted
				if (section == sections[currentBook].length -1 && !el.hasClass(nextSectionLink, 'is-inverted')){
					el.addClass(nextSectionLink, 'is-inverted');
				}

				// next: not the last section remove inverted
				if(section < sections[currentBook].length -1 && el.hasClass(nextSectionLink, 'is-inverted')){
					el.removeClass(nextSectionLink, 'is-inverted');
				}

			},
			setCurrentBook: setCurrentBook
		};

	}
	return Books;
});
