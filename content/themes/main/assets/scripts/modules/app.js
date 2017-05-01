// 'use strict';

 
/**
 * Use modernizr for feature detction.
 * For the build url see:
 * - assets/scripts/basejs/modules/modernizr.js
 */  
 require('imports?this=>window!modernizr');

 // var glitch = require('GlitchCanvas');



/**  
 * Waits for DOM to be ready
 */ 
 require(['ready', 
 	      'elements',  
 	      'events',  
 	      'waypoints', 
 	      'smoothscroll', 
 	      'SplitText', 
 	      'TweenMax', 
 	      'ScrollMagic',  
 	      'ScrollMagicAnimation',
 	      'ScrollMagicIndicators',
 	      // 'GlitchCanvas'
 	      ], 

 function(domReady, el, evt, waypoint, smoothScroll, SplitText, TweenMax, ScrollMagic, ScrollMagicAnimation, ScrollMagicIndicators) {

     domReady(function() {

     	var playVideos = true; 
     	var doGlitches = true; 

     	// doMyGlitches(); 
     	console.log("start");
        
     	if(el.exists('.is-front-page')) { 

     		// var image = new Image();
     		// image.src = '/content/themes/main/static/gfx/sk-prototype.jpg'; 

     		var glitchCycle = 4000;
     		var cycleCount = 0; 
     		var randTimeSpan = 0;

     		function doMyGlitches() {
	     		(function loop() {

	     			 if(cycleCount > 0)
	     		     	randTimeSpan = Math.round(Math.random() * glitchCycle)+80;

	     		     cycleCount = 1; 

	     		     // console.log("cycle is " + randTimeSpan);

	     		     setTimeout(function() {
	     		            glitchImages();
	     		            loop();  
	     		     }, randTimeSpan);
	     		}());
	     	}	


	     	function glitchImages() {

	     		// console.log("glich start");
	     		var posX, posY, posX2, posY2, w, h, t, style; 

	     		var glitchElements = el.find('.js-glitch');
	     		var crossElements = el.find('.js-cross');

	     		var i = 0;
	     		var delay = 0; 
	     		var itemCount = glitchElements.length;
	     		var loopCount = Math.round( Math.random()*(itemCount-3) + 3);
	     		loopCount = itemCount;
	     		// console.log(loopCount);

	     		// for(var item of glitchElements) {
	     		for(var a = 0; a<loopCount; a++) {
	     			item = glitchElements[a];
	     			cross = crossElements[a];

			        // delay = Math.round(Math.random()*80);
			        // delay+=50; 
			        delay += Math.round(Math.random()*40);

					(function(){ 
						var _item = item;
						var _delay = delay; 
						var _i = i; 
						var _cross = cross; 


						//start single glitches with different delays
				        setTimeout(function() { 
							// console.log("start " + _i + " in " + _delay);

							posX = Math.round(Math.random() * 40);
							posY = Math.round(Math.random() * 100);
							
							h = Math.round(Math.random()*40+0);
							w = 9999; 
							tX = -15 + Math.random()*6-3; 
							tY = Math.random()*1-0.5;  
							// tY = 0; 
															
							posX2 = 100;
							posY2 = (posY+h > 100) ? 100 : posY + h; 

							TweenMax.set(_item, { 
								opacity: 1,
								clipPath: 'polygon('+posX+'% '+posY+'%, '+posX2+'% '+posY+'%, '+posX2+'% '+posY2+'%, '+posX+'% '+posY2+'%)',
								webkitClipPath: 'polygon('+posX+'% '+posY+'%, '+posX2+'% '+posY+'%, '+posX2+'% '+posY2+'%, '+posX+'% '+posY2+'%)',
								x: tX+'%',
								y: tY+'%',
								scale: 1.05
							}); 

							TweenMax.set(_cross, {
								left: posX+'%',
								top: posY+'%',
								width: Math.random()*70+'%',
								height: Math.random()*15,
								opacity: Math.random()*0.1+0.9  
							});

							// console.log('polygon('+posX+'% '+posY+'%, '+posX2+'% '+posY+'%, '+posX2+'% '+posY2+'%, '+posX+'% '+posY2+'%)');
							// console.log(tX + " " + tY);

							//calculate when to remove single glitch again
							var delay2 = Math.round(Math.random()*50)+40;

							// test with longer delay 
							(function() {  
								
								var _delay2 = delay2;

								setTimeout(function() { 
									// console.log("end " + _i + " in " + _delay2);
									TweenMax.set(_item, { 
										opacity: 0
									});

									TweenMax.set(_cross, { 
										opacity: 0
									});

								}, _delay2);	

							})();

						}, _delay);	
					})();

					i++;
	     		}

	     	}


     		// var src = el.find('.js-hero-image')[0].getAttribute('src');
     		// var img = new Image();
     		// var canvas = el.find('.js-hero-canvas')[0];
     		
     		// img.src = src; 

     		// img.onload = function () {

     		//     var ctx = canvas.getContext("2d");
     		//     ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
     		//                        0, canvas.height*0.07, canvas.width*0.93, canvas.height*0.93); // destination rectangle

     		//     ctx.globalCompositeOperation = 'lighter';

     		//     var imgDataOriginal = ctx.getImageData(0, canvas.height*0.07, canvas.width*0.93, canvas.height*0.93);

     		//     var imgData = ctx.getImageData(0, canvas.height*0.07, canvas.width*0.93, canvas.height*0.93);
     		//         // invert colors
     		//         var i;
     		//         var limit = 250; 

     		//         for (i = 0; i < imgData.data.length; i += 4) {

     		//         	if(imgData.data[i] < limit && imgData.data[i+1] < limit && imgData.data[i+2] < limit) {   		
     		        
     		//         		imgData.data[i] = 252;
     		//         		imgData.data[i+1] = 106; 
     		//         		imgData.data[i+2] = 101;
     		//         		imgData.data[i+3] = 255;
     		//         	}

     		//         	else {

     		//         	}
     		     
     		//         } 

     		//         //ctx.putImageData(imgData, 0, canvas.height*0.07);
     		//         // ctx.putImageData(imgDataOriginal, 0, canvas.height*0.07);

	     	// }


 
	     	 /**  
	     	  * Waypoints
	     	  *
			  * For Scroll-Notice in Hero Container
	     	  */ 
	     	 var waypoint_el = el.find('.js-hero')[0];
	     	 var scroll_notice = el.find('.js-scroll-notice')[0];
	         new Waypoint({
	             element: waypoint_el,
	             handler: function(direction) {
	                 if (direction == 'down') {
	                    el.addClass(scroll_notice, 'inactive');
	                 } else {
	                    el.removeClass(scroll_notice, 'inactive');
	                 } 
	             },
	             offset: '-60%' 
	         }); 

	         // For Every js-waypoint element on the project overview page
	         var waypoints = document.getElementsByClassName('js-waypoint');
	         var mainDivs = new Array(); 
	         for (var i = 0; i < waypoints.length; i++) {
	             new Waypoint({
	                 element: waypoints[i],
	                 handler: function(direction) {

	                    var id = this.element.getAttribute("id");  
	                    el.removeClass(el.find('.projects-sticky-nav a.active')[0], 'active');

	                    mainDivs.push(id);
	                    // if($.inArray(id, mainDivs) < 0) {
	                    // } 
	 
	                    if (direction == 'down') {
	                        //link mit der richtigen ID in url highlighten 
	                        var link = el.find('.menu_link[href$="' + id + '"]')[0];
	                        el.addClass(link, 'active'); 
	                    }
	                    else {
	                       //das vorhergehende "js-waypoint" item vor dem derzeitigen waypoint abfragen und die ID highlighten im menü
	                       var index = mainDivs.indexOf(id)-1;
	                       id = mainDivs[index];
	                       var link = el.find('.menu_link[href$="' + id + '"]')[0];
	                       el.addClass(link, 'active'); 
	                   }

	                 },  
	                 offset: '50%'
	             });
	         } 

	         // For the footer cause it triggers when it should come in the viewport right away
	     	 var waypoint_el = el.find('.js-waypoint-footer')[0];
	         new Waypoint({
	             element: waypoint_el,
	             handler: function(direction) {

	             	 el.removeClass(el.find('.projects-sticky-nav a.active')[0], 'active');
	             	 var link = el.find('.menu_link');

	                 if (direction == 'down') {
	                    el.addClass(link[link.length-1], 'active');
	                 } else {
	                    el.addClass(link[link.length-2], 'active');
	                 }
	             },  
	             offset: '99.5%'
	        }); 

	         /**  
	          * SmoothScroll
	          */ 
	         smoothScroll.init({
	             selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
	             speed: 500, // Integer. How fast to complete the scroll in milliseconds
	             easing: 'easeInOutCubic', // Easing pattern to use
	             offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
	             scrollOnLoad: true, // Boolean. If true, animate to anchor on page load if URL has a hash
	             callback: function(toggle, anchor) {

	             } // Function to run after scrolling
	         }); 


	         /**  
	          * Project Nav Click event
	          */ 
	         var menu_links = el.find('.projects-sticky-nav a'); 
	         evt.addListener(menu_links, 'click', function(e) {
	         	  el.removeClass(el.find('.projects-sticky-nav a.active')[0], 'active');
	         	  el.addClass(this, 'active'); 
	         });

	         /**  
	          * Show/Hide More Info in about section 
	          */ 
	         var moreInfo = el.find('.js-more-info')[0];
	         evt.addListener(el.find('.js-show-more-info')[0], 'click', function(e) {
	         	  
	         	  if(el.hasClass(moreInfo, 'hidden')) {
	         	  	  el.removeClass(moreInfo, 'hidden');
	         	  }
	         	  else {
	         	  	  el.addClass(moreInfo, 'hidden');
	         	  }

	         	  stopDefault(e); 
	         	
	         }); 


	    }  //end front page 


	    //Play video element when it is visible in the viewport 
	    if(playVideos) {
		    var waypoints = document.querySelectorAll('video');
		    for (var i = 0; i < waypoints.length; i++) {
		        
		    	// Stop Video as soon as its out of viewport
		        new Waypoint.Inview({
		            element: waypoints[i],
		            exited: function(direction) {
		            	this.element.pause(); 
		            	this.element.currentTime = 0;
		            }  
		        });

		        //Play Video when its top reaches 50% of viewport when scrolling down
		        new Waypoint({
		        	element: waypoints[i],
		            handler: function(direction) {
		            	if(direction=="down")
		            		this.element.play();
		            },  
		            offset: '50%'
		        }); 

		        //play video when half of it is in viewport scrolling up
		        new Waypoint({
		        	element: waypoints[i],
		            handler: function(direction) {
		            	if(direction=="up") {
		            		this.element.play();
		            	}
		            },  
		            offset: function() {
		            	// console.log(this.element.clientHeight * (-0.5));
		            	return this.element.clientHeight * (-0.5);
		            }
		        }); 
		    } 
		} 
  
		//click on video to pause it 
		evt.addListener(el.find('video'), 'click', function(event) {
			// console.log("fire");
			if(this.paused) {
				this.play();
			} 
			else {
				this.pause(); 
			}
		}); 
 


     	/**  
     	 * 
     	 * Intro Animation
     	 *
     	 */    
     	 if(el.exists('.js-hero')) {  	
	     	 var st = new SplitText(el.find('.alpha')[0], { type : 'words, lines', linesClass: 'hero-text-line delay--++', wordsClass: 'hero-text-word'}); 
	     	 var st2 = new SplitText(el.find('.alpha')[1], { type : 'words, lines', linesClass: 'hero-text-line delay2--++', wordsClass: 'hero-text-word'}); 

	     	 setTimeout(function() {
	     	     el.addClass(el.find('.js-body')[0], 'lets-go');

	     	     setTimeout(function() {
	     	         el.addClass(el.find('.js-fill')[0], 'lets-go');
	     	         
	     	         if(doGlitches)
	     	        	 doMyGlitches(); 

	     	     }, 2500);

	     	 }, 200); 
	     }
 
 
  
	     /**  
	      * 
	      * background scroll home 
	      * 
	      */  
	      if(el.exists('.is-front-page')) {

	      		// init controller
	      		var controller = new ScrollMagic.Controller();

	      		TweenMax.set('.js-site-body', { backgroundColor : 'rgb(255,255,255)' });

	      		var tween = TweenMax.to('.js-site-body', 100, {
	      			backgroundColor : 'rgb(235, 235, 235)'
	      		});

	      		var duration = el.find('.js-projects-overview')[0].clientHeight; 

	      		// create a scene
	      		var scene = new ScrollMagic.Scene({
	      			triggerElement: '.projects-overview',
	      			// triggerHook: 50,
      		        duration: duration,  // the scene should last for a scroll distance of 100px
      		        offset: 0      // start this scene after scrolling for 50px
      		    })
      		    .setTween(tween)
      		    .addTo(controller); // assign the scene to the controller

      		    // scene.addIndicators();
	      }


       	 /**  
       	  * Waypoint
       	  *
  		  * For Live Link in Project Detail
       	  */ 
	      if(el.exists('.js-content-live-link')) {

 	         var liveCircle = el.find('.js-live-circle')[0];

 	         var element = el.find('.js-content-live-link')[0];
 	         
 	         if(isHidden(element)) {
 	         	element = el.find('.js-content-live-link')[1];
 	         }

  	         new Waypoint.Inview({
  	             element: element,
  	             exited: function(direction) {
  	             	 el.removeClass(liveCircle, 'inactive');
  	             },
  	             entered: function(direction) {
  	             	 el.addClass(liveCircle, 'inactive');
  	             } 
  	         });

	      }





	      function stopDefault(evt) {
	          if (evt && evt.preventDefault) {
	              evt.preventDefault();
	          } else if (window.event && window.event.returnValue) {
	              window.event.returnValue = false;
	          }
	      }

	      function isHidden(el) {
	          return (el.offsetParent === null)
	      }

     	 

     });
 }); 