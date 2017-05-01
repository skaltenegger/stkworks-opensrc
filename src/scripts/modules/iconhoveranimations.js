/**
 * IconHoverAnimations
 */
define([
	'elements',
	'events',
	'TweenLite',
	'CSSPlugin',
	'basejs/vendor/drawsvgplugin',
	'basejs/vendor/morphsvgplugin'], function(el, evt, TweenLite, CSSPlugin, DrawSVGPlugin, MorphSVGPlugin) {

	"use strict";

	var IconHoverAnimations = function() {

		var flash = document.getElementById("js-flash");
		var aperture = document.getElementById("js-aperture");

		var normalTicks = document.getElementById("js-normal-ticks");
		var hoverTicks = document.getElementById("js-hover-ticks");
		var tick1 = document.getElementById("js-tick-1");
		var tick2 = document.getElementById("js-tick-2");
		var tick3 = document.getElementById("js-tick-3");
		var tick4 = document.getElementById("js-tick-4");

		var normalLines = document.getElementById("js-normal-lines");
		var hoverLines = document.getElementById("js-hover-lines");
		var line1 = document.getElementById("js-line-1");
		var line2 = document.getElementById("js-line-2");
		var line3 = document.getElementById("js-line-3");

		var openLetter = document.getElementById("js-open-letter");
		var closedLetter = document.getElementById("js-closed-letter");
		var closedLetterHover = document.getElementById("js-closed-letter-hover");




		function animateAbout() {
  			 TweenLite.to(flash, 0.25, { opacity: 1 }, "+=0");
  			 TweenLite.to(aperture, 0.5, { opacity: 1, rotation: 45, transformOrigin:"50% 50%" } );
		}

		function reverseAbout() {
  			 TweenLite.to(flash, 0.25, { opacity: 0 }, "+=0");
  			 TweenLite.to(aperture, 0.5, { opacity: 0, rotation: 0, transformOrigin:"50% 50%" } );
		}


		function animateServices() {
			el.addClass(normalTicks, "js-hide");

			TweenLite.to(tick1, 0.15, { opacity: 0 });
			TweenLite.to(tick2, 0.15, { opacity: 0 });
			TweenLite.to(tick3, 0.15, { opacity: 0 });
			TweenLite.to(tick4, 0.15, { opacity: 0 });

			TweenLite.to(tick1, 0, { drawSVG: "100% 100%", delay: 0.15 });
			TweenLite.to(tick2, 0, { drawSVG: "100% 100%", delay: 0.15 });
			TweenLite.to(tick3, 0, { drawSVG: "100% 100%", delay: 0.15 });
			TweenLite.to(tick4, 0, { drawSVG: "100% 100%", delay: 0.15 });
			TweenLite.to(tick1, 0, { opacity: 1, delay: 0.15 });
			TweenLite.to(tick2, 0, { opacity: 1, delay: 0.15 });
			TweenLite.to(tick3, 0, { opacity: 1, delay: 0.15 });
			TweenLite.to(tick4, 0, { opacity: 1, delay: 0.15 });

			el.removeClass(hoverTicks, "js-hide");

			TweenLite.to(tick1, 0.4, { drawSVG: "100% 0%", delay: 0.2 });
			TweenLite.to(tick2, 0.4, { drawSVG: "100% 0%", delay: 0.5 });
			// TweenLite.to(tick3, 0.4, { drawSVG: "100% 0%", delay: 0.8 });
			// TweenLite.to(tick4, 0.4, { drawSVG: "100% 0%", delay: 1.1 });
		}

		function reverseServices() {
			TweenLite.to(tick3, 0.4, { drawSVG: "100% 0%", delay: 0 });
			TweenLite.to(tick4, 0.4, { drawSVG: "100% 0%", delay: 0.3 });
		}

		function animateReferences() {
			el.addClass(normalLines, "js-hide");
			el.removeClass(hoverLines, "js-hide");

			TweenLite.to(line1, 0, { drawSVG: "100%" });
			TweenLite.to(line2, 0, { drawSVG: "100%" });
			TweenLite.to(line3, 0, { drawSVG: "100%" });

			TweenLite.to(line1, 0.4, { drawSVG: "100% 100%", delay: 0.2 });
			TweenLite.to(line2, 0.4, { drawSVG: "100% 100%", delay: 0.4 });
			TweenLite.to(line3, 0.4, { drawSVG: "100% 100%", delay: 0.6 });
		}

		function reverseReferences() {
			TweenLite.to(line1, 0, { drawSVG: "0 0", delay: 0 });
		  TweenLite.to(line2, 0, { drawSVG: "0 0", delay: 0 });
			TweenLite.to(line3, 0, { drawSVG: "0 0", delay: 0 });

			TweenLite.to(line1, 0.4, { drawSVG: "0% 100%", delay: 0.2 });
			TweenLite.to(line2, 0.4, { drawSVG: "0% 100%", delay: 0.4 });
			TweenLite.to(line3, 0.4, { drawSVG: "0% 100%", delay: 0.6 });
		}


		function animateContact() {
			el.addClass(closedLetter, "no-transition");
			el.addClass(closedLetter, "js-hide");
			el.removeClass(closedLetterHover, "js-hide");

			TweenLite.to(closedLetterHover, 0.75, { morphSVG: openLetter }, "+=0");
		}

		function reverseContact() {
			TweenLite.to(closedLetterHover, 0.75, { morphSVG: closedLetterHover }, "+=0");
		}

		return {
			animateAbout: animateAbout,
			reverseAbout: reverseAbout,
			animateServices: animateServices,
			reverseServices: reverseServices,
			animateReferences: animateReferences,
			reverseReferences: reverseReferences,
			animateContact: animateContact,
			reverseContact: reverseContact
		};

	}

	return IconHoverAnimations;

});
