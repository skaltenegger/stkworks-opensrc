import React from 'react';  
import { Link, browserHistory } from 'react-router-dom';

import { TweenMax, TimelineLite } from 'gsap'; 
import { Power1 } from 'gsap/EasePack.js';

class ProjectHeader extends React.Component {

	// getMeTo(e, url) {
	// 	e.preventDefault();
		
	// 	var tl = new TimelineLite({delay:0, repeat:1, repeatDelay:0, onComplete: function() {  
	// 		   console.log(url);
	// 		   browserHistory.push(url);  
	// 	}  });

	// 	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	// 	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	// 	var d = Math.sqrt(w*w + h*h);
	// 	d = d/10; 
 
	// 	tl.set( '.js-back-circle', { opacity: 1 } )
	// 	  .to( '.js-back-circle', 0.3, { scale: 4 } )
	// 	  .to( '.js-back-circle', 0.2, { delay: 0, backgroundColor: '#ffffff' }, '-=0.1')
	// 	  ; 
	// }

	render() {

		const post = this.props.post; 
		const liveLink = post.live_link;
		let backLink = '/#'+post.slug;
		// backLink = '/';
		
		return(
			<div className="layout project-header c-blue relative">
				{/* onClick={(e) => this.getMeTo(e, backLink)}  */} 
				<Link to={backLink} className="circle-link circle-link--back tablet-mt+">
					<svg viewBox="0 0 40 40">
						<circle cx="20" cy="20" r="17.63" />
						<line x1="28.38" y1="20" x2="12.36" y2="20"/>
						<polyline points="16.36 24.72 12.36 20 16.36 15.28"/>
					</svg> 
					<div className="back-circle js-back-circle"></div>
				</Link> 

				<a href={liveLink} className="circle-link circle-link--live js-live-circle inactive" target="_blank">
					<svg viewBox="0 0 40 40">
						<circle cx="20" cy="20" r="17.63" />
					</svg>
					<span className="live_label caps">Live</span>
				</a>
				
				<div className="project-info project-info--full block m0a mobile-mt+ mobile-pt+ mt+">
					<div className="layout u-3/12@desk u-6/12">
						<span className="label block caps">Pr0ject</span><span className="info">{post.title}</span>
					</div>
					<div className="layout u-3/12@desk u-6/12 mobile-pl">
						<span className="label block caps">Type</span><span className="info">{post.type}</span>
					</div>
					<div className="layout u-3/12@desk u-6/12 tablet-p-mt mobile-mt">
						<div className="float-right-on-desk">
							<span className="label block caps">R0le</span>
							<span className="info">{post.role}</span>
						</div> 
					</div>
					<div className="layout u-3/12@desk u-6/12 tablet-p-mt mobile-mt mobile-pl">
						<div className="float-right-on-desk">
							<span className="label caps block">Year</span>
							<span className="info">{post.year}</span>
						</div>
					</div> 
				</div>

			</div>
		)
	} 
}

export default ProjectHeader;