import React from 'react';  
require('waypoints/lib/noframework.waypoints');
require('waypoints/lib/shortcuts/inview');
const Waypoint = window.Waypoint;

let playVideos = true;
// if(location.hostname === "localhost") {
// 	playVideos = false;
// }



class VideoElement extends React.Component {

	constructor() {
		super(); 
		
		this.state = {
			isPlaying : false,
			waypoints : []
		}

	}
	

	componentDidMount() {
		// console.log("video " + this.props.index + " mounted");
		if(playVideos) {
			const _this = this;

			setTimeout(function() {

				_this.createVideoWaypoints();

			}, 1000); 

			
		}
	}

	componentDidUpdate() {
		// console.log("video " + this.props.index + " upated");
		Waypoint.refreshAll();
	}

	createVideoWaypoints() {

		// console.log("create waypoints");

		const index = this.props.index;
		const comp = this; 
		const videoEl = document.getElementById('video-'+index);

		this.togglePlayVideo(videoEl); 

    	//Play Video when its top reaches 50% of viewport when scrolling down
        const wp1 = new Waypoint({
        	element: videoEl,
            handler: function(direction) {
            	if(direction==="down") {
            		// console.log("play video down " + index);
            		// console.log(videoEl);
            		comp.playVideoSafely(videoEl);
            	}
            },  
            offset: '50%'
        }); 

        //play video when half of it is in viewport scrolling up
        const wp2 = new Waypoint({ 
        	element: videoEl,
            handler: function(direction) {
            	if(direction==="up") {
            		 // console.log("play video up" + index);   		
            		 comp.playVideoSafely(videoEl);   
            	}
            },  
            offset: function() {
            	// console.log(this.element.clientHeight * (-0.5));
            	return this.element.clientHeight * (-0.5);
            }
        }); 

    	// Stop Video as soon as its out of viewport
        const wp3 = new Waypoint.Inview({
            element: videoEl,
            exited: function(direction) {
            	var el = this.element;
            	el.pause(); 
            	el.currentTime = 0;
            	// console.log("pause video out of view " + index);   
            }  
        });

        this.state.waypoints = [wp1, wp2, wp3];
	}


	componentWillUnmount() {
		// console.log("video " + this.props.index + " UNmounted");
		if(playVideos) {
			this.state.waypoints[0].destroy();
			this.state.waypoints[1].destroy();
			this.state.waypoints[2].destroy();
		}
	}


	togglePlayVideo(vid) {
		vid.addEventListener('click', function(e) {
			if(vid.paused) {
				vid.play();
			} 
			else {
				vid.pause(); 
			}
		});
	}



	playVideoSafely(video) {
		var playPromise = video.play();
		const _this = this; 
		// In browsers that don’t yet support this functionality,
		// playPromise won’t be defined.
		if (playPromise !== undefined) {
		  playPromise.then(function() {
		    // Automatic playback started!
		  }).catch(function(error) {
		    // Automatic playback failed.
		    // Show a UI element to let the user manually start playback.
		    // console.log('playback failed for ' + _this.props.index);
		    // console.log(video);
		  });
		}
	}


	render() {

		// console.log("render video");

		let url = this.props.url;
		let poster = this.props.poster;

		if(location.hostname === "10.0.0.8") {
			url = url.replace(/stkworks.dev/g, '10.0.0.8');
			if(poster !== undefined)
			poster = poster.replace(/stkworks.dev/g, '10.0.0.8');
		}

		return(
			<video loop muted="true" preload playsInline id={`video-${this.props.index}`} poster={poster}>
				<source src={url} type={this.props.type} />
			</video>
		); 
	} 
}

export default VideoElement;