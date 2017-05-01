/**
 *Studios
 */
define([
	'elements',
	'events',
	'weather',
	'counter',
	'async!//maps.googleapis.com/maps/api/js?key=AIzaSyBy_wjSUFGH35c33whMoZAS9QqHzf4xDe0'], function(el, evt, Weather, Counter) {

	"use strict";

	var Studios = function(options) {

		var instance = this;
		var options = defaults(options);
		var wrapper;
		var map;
		var isOpen;
		var weather;
		var weatherLabelStyria;
		var weatherLabelVienna;
		var timeinterval;
		var weatherReport;
		var viewport = (Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
		var isMobile = viewport < 1024;

		var locations = {
			styria : {
				lat: 47.097671,
				lng: 15.547932
			},
			styriaCenter : {
				lat: 47.102264,
				lng: 15.535197
			},
			vienna: {
				lat: 48.189341,
				lng: 16.386721
			},
			viennaCenter: {
				lat: 48.189284,
				lng: 16.398308
			}
		};

		var mapOptions = {
			zoom: 14,
			center: locations.styriaCenter,
			disableDefaultUI: true,
			styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
		};

		function init() {
			weatherReport = new Weather({
				studio: instance
			});

			wrapper = el.find('.js-studios-wrapper')[0];
			weatherLabelStyria = el.find('.js-weather-icon--styria .js-temperature-label')[0];
			weatherLabelVienna = el.find('.js-weather-icon--vienna .js-temperature-label')[0];

			evt.addListener('.js-show-map', 'click', function(event){

				if(!isMobile) {
					event.preventDefault();
					var side = event.target.getAttribute('data-map');

					if(side === null){
						var target = el.findParentByClass(event.target, 'js-show-map');
						side = target.getAttribute('data-map');
					}
					open(side);
				} else {
					if(event.target && event.target.nodeName != "SPAN" && !el.hasClass(event.target, 'button')) {
						event.preventDefault();
					}
				}
			});



			if(!isMobile){
				initMap();
			}

			evt.addListener('.js-temp-counter', 'mouseenter', function(event){
				var location = (event.target.getAttribute('data-map') == 'left') ? 0 : 1;

				new Counter({
					to: weather[location].temperature,
					speed: 75,
					element: (location == 0) ? weatherLabelStyria : weatherLabelVienna
				}).start();

			});
		}

		function defaults(opts) {
			var options = opts || {};
			var defaults = {
			};

			for (var prop in defaults) {
				if (!options[prop]){
					options[prop] = defaults[prop];
				}
			}
			return options;
		}

		function open(direction) {
			if(!direction){ return false; }

			if(direction === isOpen){
				close();
				return false;
			}

			if(isOpen !== undefined){
				el.removeClass(wrapper, 'is-open--' + isOpen);
			}

			el.addClass(wrapper, 'is-open--' + direction);
			window.setTimeout(function(){
				el.addClass(wrapper, 'inverse-animation');
			}, 1000, true);
			setMapCenter(direction);
			isOpen = direction;
		}

		function close() {
			if(isOpen === undefined){ return false;}

			el.removeClass(wrapper, 'is-open--' + isOpen);
			window.setTimeout(function(){
				el.removeClass(wrapper, 'inverse-animation');
			}, 1000, true);
			isOpen = undefined;
		}

		function setMapCenter(direction) {
			if(direction == 'left'){
				map.panTo(locations.styriaCenter);
			}else {
				map.panTo(locations.viennaCenter);
			}
		}

		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), mapOptions);

			var markerStyria = new google.maps.Marker({
				position: locations.styria,
				map: map,
				icon: themePath + '/static/gfx/svg/gmaps-marker.svg',
				title: 'Atelier Styria'
			});

			var markerVienna = new google.maps.Marker({
				position: locations.vienna,
				map: map,
				icon: themePath + '/static/gfx/svg/gmaps-marker.svg',
				title: 'Vienna Styria',
			});
		}

		Studios.prototype.setWeather = function setWeather(w){
			weather = w;

			// show the weather icon
			el.addClass(el.find('.js-weather-icon--styria .js-weather--' + weather[0].icon)[0], 'is-current-weather');
			el.addClass(el.find('.js-weather-icon--vienna .js-weather--' + weather[1].icon)[0], 'is-current-weather');
			// updateWeatherInformation(weather);

			if(weatherReport.getBetterWeather(w) == 1){
				el.find('.js-better-location')[0].innerHTML = 'Vienna';
			}
		}

		init();

		return {};
	}
	return Studios;

});