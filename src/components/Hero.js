import React from 'react';  
import { Link } from 'react-router-dom';


import { TweenMax, TimelineLite, CSSPlugin } from 'gsap'; 
require('gsap/ScrollToPlugin'); 
import SplitText from '../scripts/vendor/SplitText';
import CSSRulePlugin from 'gsap/CSSRulePlugin';

require('waypoints/lib/noframework.waypoints');
require('waypoints/lib/shortcuts/inview');
const Waypoint = window.Waypoint;
import { addClass, removeClass, hasClass } from '../helpers'; 


class Hero extends React.Component {

	constructor() {
		super();

		this.state = {
			timeline : {}
		}
	}

	componentDidMount() {

		const parent = this; 
		this.scrollNoticeWaypoint(); 

		console.log(document.querySelectorAll('.alpha')[0]);

		if(this.props.getAppState('introAnimDone') === false) {

			var tl = new TimelineLite({delay:0.2, repeat:1, repeatDelay:0, onComplete: function() {  
				 parent.doMyGlitches();  
			}  });

			var img = document.querySelectorAll('.js-hero-image')[0];
			var ph = document.querySelectorAll('.js-placeholder')[0];
			
			// console.log(document);

			if(hasClass(document.documentElement, 'no-touchevents')) {

				new SplitText(document.querySelectorAll('.alpha')[0], { type : 'lines', linesClass: 'hero-text-line'}); 
				new SplitText(document.querySelectorAll('.alpha')[1], { type : 'lines', linesClass: 'hero-text-line'}); 
				
				tl.set('.menu_link', {x: '-150px'})

				  .set('.placeholder--gray', {background: '#fff'})
				  .set('.hero-image--static', { opacity: 0, x: '-20%' })
				  .set('.hero-text-line, .hero-link .link-inner', { color: 'transparent' })
				  .set('.hero-link .link-inner .arrow--after', { css:{opacity: 0, className:'+=no-transition'}} )
				  .set('.js-about', { opacity: 0, y: '+40px' })
				  .set('.hero-text-line .strike', {css:{className:'-=is-visible' }} )
				  .set('.js-fill', {css:{className:'-=lets-go'}} )

				  .append( TweenMax.set(ph, {delay: 0.5, css:{className:'+=wipeInFromRight'}}) )
				  .set(ph, {delay: 0.5, background: '#f5f5f5'})
				  .to(img, 0.3, {delay: 0.5, opacity: 1, x: '-15%'})

				  .add( TweenMax.staggerTo('.hero-text-line', 0, {delay: 0.1, css:{className:'+=wipeIn'}}, 0.1), '-=0.8')
				  .add( TweenMax.staggerTo('.hero-text-line', 0, {delay: 0.1, color: '#444442'}, 0.1), '-=0.2')   
				  .add( TweenMax.staggerTo('.hero-text-line .strike', 0, {delay: 0.2, css:{className:'+=xis-visible'}}, 0.1), '-=0.4')
				  
				  .add( TweenMax.staggerTo('.hero-link', 0, {delay: 0.1, css:{className:'+=wipeInFast'}}, 0.2), '+=0')
				  .add( TweenMax.staggerTo('.hero-link .link-inner', 0, {delay: 0.2, color: '#fc6a65'}, 0.1), '-=0')
				  .add( TweenMax.staggerTo('.hero-link .link-inner .arrow--after', 0, { delay: 0.1, opacity: 1 }, 0.1), '-=0')
				  
				  .add( TweenMax.staggerTo('.menu_link', 0.3, { delay: 0.1, x: 0 }, 0.1), '-=0.7')
				  .append( TweenMax.to('.js-fill', 0, { delay: 0.1, css:{className:'+=lets-go'}}) )
				  .add( TweenMax.to('.js-about', 0.3, { opacity: 1, y: '+0px' }) )
				  .set('.link-inner .arrow--after', { css:{className:'-=no-transition'}} )
				; 
			}

			this.props.setAppState('introAnimDone', true);
		}

		else {
			//show no intro animation but do the glitches
			parent.doMyGlitches();
		}
	}

	scrollTo(e, target) {
		e.preventDefault(); 
	 	TweenMax.to(window, 0.3, {scrollTo:"#"+target});
	}

	scrollNoticeWaypoint() {

		const _this = this;

		// Hide Scrollnotice when scrolled further down on hero 
		var waypoint_el = document.querySelectorAll('.js-hero')[0];
     	var scroll_notice = document.querySelectorAll('.js-scroll-notice')[0];

        new Waypoint({
             element: waypoint_el,
             handler: function(direction) {
                 if (direction === 'down') {
                    addClass(scroll_notice, 'inactive');
                  
                    //pause glitch effect
                    if(!_this.isEmpty(_this.state.timeline))
                  	  _this.state.timeline.pause();

                 } else {
                    removeClass(scroll_notice, 'inactive');
                    
                    //play glitch effect
                    if(!_this.isEmpty(_this.state.timeline))
                       _this.state.timeline.play();
                 } 
             },
             offset: '-90%' 
        }); 
	} 

	isEmpty(obj) {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key))
	            return false;
	    }
	    return true;
	}

	componentWillUnmount() {
		// console.log("hero unmounted");
		Waypoint.destroyAll();
	}
			

	doMyGlitches() {

		const _this = this;

		var tl = new TimelineLite({delay:0, repeat:1, repeatDelay: 0, onComplete: function() {  
			     // console.log("glitch");
			     _this.doMyGlitches();
		}  });

		this.setState({ timeline: tl }); 

		var glitchElements = document.querySelectorAll('.js-glitch');
		var crossElements = document.querySelectorAll('.js-cross');

		var i = 0;
 		var delay = 0; 
 		var itemCount = glitchElements.length;
 		var loopCount = Math.round( Math.random()*(itemCount-3) + 3);
 		loopCount = itemCount;

 		var posX, posY, posX2, posY2, w, h, t, item, cross, tX, tY;

		for(var a = 0; a<loopCount; a++) {
 			item = glitchElements[a];
 			cross = crossElements[a];

	        // delay = Math.round(Math.random()*80);
	        // delay+=50; 
	        delay += Math.round(Math.random()*40);

	        posX = Math.round(Math.random() * 40);
			posY = Math.round(Math.random() * 100);

			h = Math.round(Math.random()*40+0);
			w = 9999; 
			tX = -15 + Math.random()*40-20; 
			tY = Math.random()*1-0.5;  
			// tY = 0; 
							
			posX2 = 100;
			posY2 = (posY+h > 100) ? 100 : posY + h; 

			// console.log(Math.random()/15);

	        tl.set(item, { 
						opacity: 1,
						clipPath: 'polygon('+posX+'% '+posY+'%, '+posX2+'% '+posY+'%, '+posX2+'% '+posY2+'%, '+posX+'% '+posY2+'%)',
						webkitClipPath: 'polygon('+posX+'% '+posY+'%, '+posX2+'% '+posY+'%, '+posX2+'% '+posY2+'%, '+posX+'% '+posY2+'%)',
						x: tX+'%',
						y: tY+'%',
						scale: 1+Math.random()/1.5,
						delay: Math.random()/25
					})
	           .set(cross, {
						left: posX+'%',
						top: posY+'%',
						width: Math.random()*70+'%',
						height: Math.random()*20+5+'%',
						opacity: Math.random()*0.1+0.9,
						delay: Math.random()/20
					})
	           .set(item, { 
					opacity: 0,
					delay: Math.random()/15
				})
	           .set(cross, { 
					opacity: 0,
					delay: Math.random()/15
				})
	           .set({}, {}, Math.random()*3);
			
		}

	}	

	componentWillUnmount() {
		const tl = this.state.timeline;
		tl.clear(); 
		tl.eventCallback("onComplete", null);
	}


	render() {

		// console.log("render hero");

		return(
			<div className="layout hero js-hero js-waypoint" id="hero">
				<div className="inner has-max-width m0a oh">

					{/*<Link to="/test">gogogo</Link><br />
					<Link to="/for/desk-of-van-schneider">schneider</Link>) */}

					<div className="hero-image-wrapper mobile-mb">
						<div className="placeholder placeholder--square placeholder--gray js-placeholder oh">
							<img src="/gfx/sk-profile.jpg" alt="Stefan Kaltenegger" className="hero-image hero-image--static js-hero-image" /> 
							<img src="/gfx/sk-profile.jpg" alt="Stefan Kaltenegger" className="hero-image hero-image--glitch js-glitch js-glitch--1" /> 
							<img src="/gfx/sk-profile.jpg" alt="Stefan Kaltenegger" className="hero-image hero-image--glitch js-glitch js-glitch--2" /> 
							<img src="/gfx/sk-profile.jpg" alt="Stefan Kaltenegger" className="hero-image hero-image--glitch js-glitch js-glitch--3" /> 
							<img src="/gfx/sk-profile.jpg" alt="Stefan Kaltenegger" className="hero-image hero-image--glitch js-glitch js-glitch--4" /> 
							<img src="/gfx/sk-profile.jpg" alt="Stefan Kaltenegger" className="hero-image hero-image--glitch js-glitch js-glitch--5" /> 
							<img src="/gfx/sk-profile.jpg" alt="Stefan Kaltenegger" className="hero-image hero-image--glitch js-glitch js-glitch--6" /> 
							<img src="/gfx/sk-profile.jpg" alt="Stefan Kaltenegger" className="hero-image hero-image--glitch js-glitch js-glitch--7" /> 
							<img src="/gfx/sk-profile.jpg" alt="Stefan Kaltenegger" className="hero-image hero-image--glitch js-glitch js-glitch--8" /> 
							<img src="/gfx/sk-profile.jpg" alt="Stefan Kaltenegger" className="hero-image hero-image--glitch js-glitch js-glitch--9" /> 
							<img src="/gfx/sk-profile.jpg" alt="Stefan Kaltenegger" className="hero-image hero-image--glitch js-glitch js-glitch--10" /> 

							<div className="cross js-cross"></div>
							<div className="cross js-cross"></div>
							<div className="cross js-cross"></div>
							<div className="cross js-cross"></div>
							<div className="cross js-cross"></div>
							<div className="cross js-cross"></div>
							<div className="cross js-cross"></div>
							<div className="cross js-cross"></div>
							<div className="cross js-cross"></div>
							<div className="cross js-cross"></div>

							{ /* <div className="loader-line"></div> */ }
							{ /* <canvas className="hero-canvas js-hero-canvas multiply" width="877" height="816"></canvas> */ }
						</div> 
					</div>
							
					<div className="hero-text-wrapper block">
						<div className="placeholder placeholder--square">
							<div className="layout hero-text">
								<h1 className="alpha">Stefan Kaltenegger is a creative technologist connecting web design and development – where every detail matters.</h1>
								<p className="alpha">He's worked with international brands like Audi or Siemens and studied in <span className="strike strike--bklyn">Brooklyn,</span>&nbsp;<span className="strike">New York </span> and Graz, Austria.</p>
								<p className="m0">

									<a className="hero-link has-arrow relative mr" href="#about" onClick={(e) => this.scrollTo(e, 'about')}>
										<span className="link-inner">
											<span className="arrow arrow--before layout"> 
												<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
											</span>
											<span className="link-text layout">More about Stefan</span>
											<span className="arrow arrow--after layout"> 
												<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
											</span>
										</span>
									</a> 

									<a className="hero-link has-arrow relative delay3" href="https://twitter.com/skaltenegger" target="_blank">
										<span className="link-inner delay3">
											<span className="arrow arrow--before layout"> 
												<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
											</span>
											<span className="link-text layout">Follow @skaltenegger</span>
											<span className="arrow arrow--after layout"> 
												<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
											</span>
										</span>
									</a> 

								</p>
							</div>
						</div>
				    </div>
				    <div className="scroll-notice js-scroll-notice"><div className="fill js-fill lets-go"></div></div>

				</div>
			</div>
		)
	} 
}

export default Hero;