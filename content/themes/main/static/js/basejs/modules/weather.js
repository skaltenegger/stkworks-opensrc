/**
 * Weather
 */
define([
	'elements',
	'events',
	'ajax'
], function(el, evt, Ajax) {
		"use strict";

	var Weather = function(options) {
		// setup defaults
		var options = defaults(options);
		var theWeather;
		var apiKey = 'd352c66ac370f3200e060c7c3a0d8628';
		var weatherPoints = {
			sunny: 6,
			partlyCloudy: 5,
			cloudy: 4,
			rainy: 3,
			snow: 2,
			thunder: 1

		}

		function init() {
			loadWeather();
		}


		function loadWeather () {
			Ajax.get('http://api.openweathermap.org/data/2.5/group?id=2761369,2778067&units=metric&appid=' + apiKey, function(data){
				theWeather = parseWeather(JSON.parse(data.response).list);
				options.studio.setWeather(theWeather);
				compareWeather(theWeather);
			});
		}

		function defaults(opts) {
			var options = opts || {};

			var defaults = {
				studio: ''
			};

			for (var prop in defaults) {
				if (!options[prop]){
					options[prop] = defaults[prop];
				}
			}
			return options;
		}

		function parseWeather (weather) {
			var weatherLocations = [];
			for (var i = weather.length - 1; i >= 0; i--) {
				weatherLocations.push({
					city: weather[i].name,
					weatherId: weather[i].weather[0].id,
					weatherDescription: weather[i].weather[0].description,
					temperature: Math.round(weather[i].main.temp),
					icon: getWeatherIcon(weather[i].weather[0].id)
				});
			};
			return weatherLocations;
		}

		function getWeatherIcon (id) {
			id = parseInt(id);
			if(id === 800){ return 'sunny'; }
			if(id >= 200 && id <= 299 || id >= 900 && id < 949) { return 'thunder'; }
			if(id >= 300 && id <= 399 || id >= 700 && id < 799) { return 'partlycloudy'; }
			if(id >= 500 && id <= 599) { return 'rainy'; }
			if(id >= 600 && id <= 699 ){ return 'snow'; }
			if(id > 800 && id <= 804) { return 'cloudy'; }

			return 'sunny';
		}

		function getWeatherPoints(id) {
			return weatherPoints[getWeatherIcon(id)];
		}

		function compareWeather(weather) {
			// var pointsStyria = getWeatherPoints(weather[0].id);
			// var pointsVienna = getWeatherPoints(weather[1].id);

			// return {
			// 	de: 'Better shoot in ' + weather[placeToShoot].city + ' today.',
			// 	en: 'Better shoot in ' + weather[placeToShoot].city + ' today.'
			// }
			return (weather[0].temperature >= weather[1].temperature) ? 0 : 1;
		}

		// get the party started
		init();

		return {
			getWeather: function(){
				return theWeather;
			},
			getBetterWeather: compareWeather
		};

	}
	return Weather;
});
