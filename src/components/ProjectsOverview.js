import React from 'react';  

import { Link } from 'react-router-dom';


import SideMenu from './SideMenu';  
import VideoElement from './VideoElement';  

import { TweenMax, TimelineLite } from 'gsap'; 
import { Power1 } from 'gsap/EasePack.js';

import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

import { addClass, removeClass } from '../helpers'; 


class ProjectsOverview extends React.Component {

	constructor() {
		super();

		var controller = new ScrollMagic.Controller();
		this.state = {
			controller: controller
		}

	}


	getProperty(url, key) {
		const posts = this.props.data.posts; 
		const property = posts[url][key];
		return(property); 
	}


	// componentDidMount() {
        
 //        var controller = this.state.controller;

 //  		TweenMax.set('.js-site-body', { backgroundColor : 'rgb(255,255,255)' });

 //  		var tween = TweenMax.to('.js-site-body', 100, {
 //  			backgroundColor : 'rgb(255, 255, 255)'  //rgb(235, 235, 235)
 //  		});

 //  		var duration = document.querySelectorAll('.js-projects-overview')[0].clientHeight; 

 //  		// create a scene
 //  		var scene = new ScrollMagic.Scene({
 //  			triggerElement: '.projects-overview',
 //  			// triggerHook: 50,
	//         duration: duration,  // the scene should last for a scroll distance of 100px
	//         offset: 0      // start this scene after scrolling for 50px
	//     })
	//     .setTween(tween)
	//     .addTo(controller); // assign the scene to the controller
	// }


	enterProjectLink(e, slug) {
		const projectLink = document.querySelectorAll('#'+slug+' .project-overlay-link')[0];
		addClass(projectLink, 'is-visible'); 
	}

	leaveProjectLink(e, slug) {
		const projectLink = document.querySelectorAll('#'+slug+' .project-overlay-link')[0];
		removeClass(projectLink, 'is-visible'); 
	}


	
	componentWillUnmount() {
		// console.log("unmount work overview");
		this.state.controller.destroy(true);
	}


	// getMeTo(e, slug) {
	// 	e.preventDefault();
	// 	const circle = this.refs['circle-'+slug];
	// 	const label = this.refs['label-'+slug];
	// 	// const whiteCircle = this.refs['circle-white-'+slug];

	// 	// console.log('#'+slug+' .project-overlay-link');

	// 	var tl = new TimelineLite({delay:0, repeat:1, repeatDelay:0, onComplete: function() {  
	// 		    // browserHistory.push('/for/'+slug)
	// 	}  });

	// 	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	// 	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	// 	var d = Math.sqrt(w*w + h*h)*2;
	// 	d = d/55; 

	// 	tl.set( '#'+slug+' .browser-window', {css:{zIndex: 100}} )
	// 	  .set( '#'+slug+' .project-overlay-link', {css:{className:'+=is-visible'}} )
	// 	  .set( label, {css: {transition: 'none' }})
	// 	  .set( circle, {css: {transition: 'none' }})
	// 	  .to( circle, 0.30, { scale: d, ease: Power1.easeIn } )
	// 	  .set( label, { opacity: 0 }, '-=0.3')
	// 	  ; 
	// }


	render() { 

		// console.log("render project overview");

		const post = this.props.post; 
		const page_content = post.page_content[this.props.index];
		const works = page_content.works;

		// console.log(works);

		const projectsList = Object.keys(works).map((key) => { 

			const work = works[key].work;
			const slug = work.post_name; 
			const url = '/for/'+slug;
			const colorClass = 'c-'+this.getProperty(url, 'color-class');

			const projectName = work.post_title; 
			
			const videoUrl = this.getProperty(url, 'video_thumb').url;
			const videoPoster = this.getProperty(url, 'video_poster');
			const videoMime = this.getProperty(url, 'video_thumb').mime_type;

			return ( 
				<div key={key} className={`layout full-min-height ${colorClass} js-waypoint`} id={slug}>

					<div className="layout pv mobile-mv-">
						<div className="layout browser-window relative block m0a">
							<div className="browser-bar">
								<div className="dot"></div>
								<div className="dot"></div>
								<div className="dot"></div>
							</div>
							<div className="browser-content">
								{/* onClick={(e) => this.getMeTo(e, slug)} */}
								<Link to={url}  className="project-overlay-link absolute">
									{/*<div className="circle-overlay circle-overlay--white" ref={`circle-white-${slug}`}></div> */}
									<div className="circle-overlay" ref={`circle-${slug}`}>
										<span className="project-overlay-text" ref={`label-${slug}`}>View<br />Project</span>
									</div>
								</Link>
								
								<VideoElement key={post.id+'-'+key} index={post.id+'-'+key} url={ videoUrl } type={ videoMime } poster={videoPoster} />
								
							</div>
						</div>	

						<div className="layout project-info--overview block m0a mobile-mt mt+">
							<div className="layout u-3/12@desk u-4/12@tablet u-6/12">
								<span className="label block caps">Pr0ject</span><span className="info">{ projectName }</span>
							</div><div className="layout u-3/12@desk u-4/12@tablet hide-on-mobile">
								<span className="label block caps">Type</span><span className="info">{ this.getProperty(url, 'type') }</span>
							</div><div className="layout u-3/12@desk hide-on-mobile hide-on-tablet-port">
								<span className="label block caps">R0le</span><span className="info">{ this.getProperty(url, 'role') }</span>
							</div><div className="layout u-3/12@desk u-4/12@tablet u-6/12">
								<span className="label block caps">&nbsp;</span>
								
								{/*onClick={(e) => this.getMeTo(e, slug)}*/}
								<Link to={url} className="has-arrow float--right" 
									onMouseEnter={(e) => this.enterProjectLink(e, slug)} 
									onMouseLeave={(e) => this.leaveProjectLink(e, slug)}>
									<span className="link-inner">
										<span className="arrow arrow--before layout"> 
											<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
										</span>
										<span className="link-text layout">View Project</span>
										<span className="arrow arrow--after layout"> 
											<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
										</span>
									</span>
								</Link> 

							</div> 
						</div>
					</div> 


				</div>
			);
		});
			
		return(
			<div className="layout projects-overview js-projects-overview block m0a mobile-pb+ desk-pt++ desk-pb++" id="overview">
				<SideMenu post={post} index={this.props.index} /> 
				{ projectsList }
			</div>
		)

	} 

}

export default ProjectsOverview;