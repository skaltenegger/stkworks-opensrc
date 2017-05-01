/**
	SVG ANIMATIONS
 */


define(['elements', 'events'], function(el, evt) {
	'use strict';

	var SVGAnimations = function(options) {
		var totalFrames = 60;
		var svgs = []
		var animationQueue = [];
		// var handle = 0;
		var requestAnimationFrame = window.requestAnimationFrame ||
																window.mozRequestAnimationFrame ||
																window.webkitRequestAnimationFrame ||
																window.oRequestAnimationFrame ||
																window.msRequestAnimationFrame;

		var cancelAnimFrame = window.cancelAnimationFrame ||
														window.webkitCancelAnimationFrame ||
														window.mozCancelAnimationFrame ||
														window.oCancelAnimationFrame ||
														window.msCancelAnimationFrame;


		function init() {
			// svgs = prepareSVGs(Array.prototype.slice.call(document.querySelectorAll('.js-animate')));
			svgs = prepareSVGs(el.find('.js-animate'));

			// console.log(svgs);
		}


		function prepareSVGs(svgElements) {
			var svgsTemp = [];
			for(var i = 0; i < svgElements.length;i++) {
				var paths = [];
				var lengths = [];
				[].slice.call( svgElements[i].querySelectorAll( 'path' ) ).forEach( function( elem, j ) {
					paths[j] = elem;
					var l = paths[j].getTotalLength();
					lengths[j] = l;
					paths[j].style.strokeDasharray = l + ' ' + l;
					paths[j].style.strokeDashoffset = l;
				});

				svgsTemp.push({
					id: svgElements[i].id,
					paths: paths,
					lengths: lengths,
					currentFrame: 0,
					element: svgElements[i]
				});
			}
			return svgsTemp;
		}


		function isElementInViewport (el) {
			var rect = el.getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
				rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
			);
		}


		function drawSVG(selector, callback, frames, fillAt) {
			var svgElement = el.find(selector)[0];
			var paths = [];
			var lengths = [];

			frames = frames || totalFrames;
			fillAt = fillAt || 0.5;

			[].slice.call( svgElement.querySelectorAll( 'path' ) ).forEach( function( elem, j ) {
				paths[j] = elem;
				var l = paths[j].getTotalLength();
				lengths[j] = l;
				paths[j].style.strokeDasharray = l + ' ' + l;
				paths[j].style.strokeDashoffset = l;
			});

			svgElement.style.opacity = 1; //For real browsers;
			svgElement.style.filter = "alpha(opacity=100)"; //For IE;

			animateSVG({
				id: svgElement.id,
				paths: paths,
				lengths: lengths,
				currentFrame: 0,
				element: svgElement
			}, callback, frames, fillAt);
		}


		function animateSVG(svg, callback, frames, fillAt) {
			var progress = svg.currentFrame/frames;

			if(progress > fillAt && !el.hasClass(svg.element, 'is-filled')){
				el.addClass(svg.element, 'is-filled');
			}

			if (progress > 1) {
				cancelAnimationFrame(animationQueue[svg.id]);
				if(callback !== undefined){
					callback.call(this);
				}
			} else {
				svg.currentFrame++;
				for(var j = 0; j < svg.paths.length; j++) {
					svg.paths[j].style.strokeDashoffset = Math.floor(svg.lengths[j] * (1 - progress));
				}

				animationQueue[svg.id] = requestAnimationFrame(function(){
					animateSVG(svg, callback, frames, fillAt);
				});
			}
		}


		function draw(index) {
			if(svgs[index] === undefined){
				return false;
			}

			var progress = svgs[index].currentFrame/totalFrames;
			if(progress > 0.5
				&& !el.hasClass(svgs[index].element, 'is-filled')
				&& svgs[index].element.classList !== undefined) {
					el.addClass(svgs[index].element, 'is-filled');
			}

			if (progress > 1) {
				cancelAnimationFrame(animationQueue[svgs[index].id]);
			} else {
				svgs[index].currentFrame++;
				for(var j = 0; j < svgs[index].paths.length; j++) {
					svgs[index].paths[j].style.strokeDashoffset = Math.floor(svgs[index].lengths[j] * (1 - progress));
				}

				animationQueue[svgs[index].id] = requestAnimationFrame(function(){
					draw(index);
				});
			}
		}


		function getIndexById (id) {
			for(var i=0; i<svgElements.length;i++) {
				if(id == svgElements[i].id){
					return i;
				}
			}
			return -1;
		}

		init();

		return {
			draw: draw,
			drawSVG: drawSVG,
			prepareSVGs: prepareSVGs
		}
	}
	return SVGAnimations;
});