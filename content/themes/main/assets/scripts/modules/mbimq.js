define([
	'jquery',
	'vendor/matchmedia'
], function(
	$
) {
	'use strict';

	var module = {

		mq: [],
		mqBreakpoint: true,
		mqPrevious: 'none',
		mqTag: 'all',
		mqQuery: null,

		mqStates: [],

		/**
		 * Overwrite Defaults
		 * @param {Object} queries Media Queries to be used within mbi system
		 */
		setMediaQueries: function(data) {
			module.mq = data;
			return true;
		},

		/**
		 * Checks for Media Query changes
		 *
		 * @returns {null}
		 */
		checkMediaQuery: function() {
			$.each(module.mq, function(key, query) {

				if(matchMedia(query).matches) {
					module.mqTag = key;
					module.mqQuery = query;
				}

			});

			if(module.mqTag == module.mqPrevious) {

				module.mqBreakpoint = false;

			} else {

				module.mqBreakpoint = true;

				var args = {
					from: module.mqPrevious,
					to: module.mqTag,
					query: module.mqQuery
				};
				$(document).trigger('breakpoint', args);

			}

			module.mqPrevious = module.mqTag;

		},
		init: function(mq) {

			module.setMediaQueries(mq);

			module.checkMediaQuery();

			$(window).resize(function() {

				module.checkMediaQuery();

			});

			$(document).on('breakpoint', function(event, data) {
				console.log(data.from+' -> '+data.to+' ('+data.query+')', 'breakpoint');
			});

		}

	};

	// do not init here to enable php to set mq

	return module;

});