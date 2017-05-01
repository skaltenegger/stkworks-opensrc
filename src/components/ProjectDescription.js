import React from 'react';  
import { isHidden, addClass, removeClass } from '../helpers'; 
require('waypoints/lib/noframework.waypoints');
require('waypoints/lib/shortcuts/inview');
const Waypoint = window.Waypoint;

class ProjectDescription extends React.Component {

	constructor() {
		super();

		this.state = {
			waypoint: {}
		}
	}

	componentDidMount() {
		// console.log("desc did mount");
		const _this = this;

		setTimeout(function() {
			_this.initLiveWaypoint();
		}, 1000); 
	}

	componentDidUpdate() {
		// console.log("Project Description component did update");
		Waypoint.refreshAll();
	}


	initLiveWaypoint() {
			
		const liveCircle = document.querySelectorAll('.js-live-circle')[0];
		let element = document.querySelectorAll('.js-content-live-link')[0];

		// console.log(element);
		// console.log(liveCircle);
         
        if(isHidden(element)) {
         	element = document.querySelectorAll('.js-content-live-link')[1];
        }

        const waypoint = new Waypoint.Inview({
            element: element,
            exited: function(direction) {
             	removeClass(liveCircle, 'inactive');
             	// console.log("exited");
            },
            entered: function(direction) {
             	addClass(liveCircle, 'inactive');
             	// console.log("entered");
            } 
        });

        this.setState({ waypoint });	 
	}

	componentWillUnmount() {
		const wp = this.state.waypoint;
		// console.log("destroy");
		// console.log(wp);
		wp.destroy(); 
	}


	render() {

		const post = this.props.post; 
		
		return(
			<div className="centered-module project-description mt+ mb+ desk-mt++ desk-mb+">

				<div className="layout hide-on-tablet-port u-3/12@desk u-4/12@tablet u-6/12">
					<a className="has-arrow has-margin js-content-live-link" href={post.live_link} target="_blank">
						<span className="link-inner">
							<span className="arrow arrow--before layout"> 
								<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
							</span>
							<span className="link-text layout">View Live</span>
							<span className="arrow arrow--after layout"> 
								<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
							</span>
						</span>
					</a> 
				</div>

				<div className="layout u-6/12@large u-9/12@lap u-9/12@desk lap-pr+" dangerouslySetInnerHTML={{__html: post.content}}/>
				
				<a className="has-arrow hide-on-desk js-content-live-link mt" href={post.live_link} target="_blank">
					<span className="link-inner">
						<span className="arrow arrow--before layout"> 
							<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
						</span>
						<span className="link-text layout">View Live</span>
						<span className="arrow arrow--after layout"> 
							<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
						</span>
					</span>
				</a> 

			</div>
		)
	} 
}

export default ProjectDescription;