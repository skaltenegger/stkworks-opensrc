/**
 *Studios
 */
define(['elements', 'events'], function(el, evt) {
		"use strict"

	var Counter = function(options) {

		var options = defaults(options);
		var timer;
		var currentValue;

		function init() {
		}

		function defaults(opts) {
			var options = opts || {};
			var defaults = {
				from: 0,
				to: 10,
				speed: 100,
				element: undefined
			};


			for (var prop in defaults) {
				if (options[prop] === undefined){
					options[prop] = defaults[prop];
				}
			}
			return options;
		}

		init();

		function start() {
			if(options.element === undefined || options.from == options.to){
				return false;
			}

			currentValue = options.from;
			timer = setInterval(function(){
				updateTimer()
			}, options.speed);
		}

		function updateTimer() {
			options.element.textContent = currentValue + 'C°';
			if(currentValue == options.to){
				clearInterval(timer);
			}

			(options.to > 0) ? currentValue++ : currentValue--;
		}

		return {
			start: start
		};
	}
	return Counter;

});