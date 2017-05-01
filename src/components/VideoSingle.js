import React from 'react';  
import VideoElement from './VideoElement';  

class VideoSingle extends React.Component {

	render() {

		const post = this.props.post; 
		const page_content = post.page_content[this.props.index];

		const browserFrame = page_content.browser_frame; 
		const videoSource = page_content.video_sources[0].source; 
	
		let poster = "";
		if(page_content.video_poster) {
			poster = page_content.video_poster.url;
		}

		return(
			<div className="centered-module video video--single mb+">

				{browserFrame ? (
				<div className="layout browser-window browser-window--full">
					<div className="browser-bar">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="browser-content">
						<VideoElement key={post.id+'-'+this.props.index} index={post.id+'-'+this.props.index} url={videoSource.url} type={videoSource.mime_type} poster={poster} /> 
					</div>
				</div>	
				) :  

				<VideoElement key={post.id+'-'+this.props.index} index={post.id+'-'+this.props.index} url={videoSource.url} type={videoSource.mime_type} poster={poster} /> 
			}

			</div>
		)
	} 

	
}

export default VideoSingle;