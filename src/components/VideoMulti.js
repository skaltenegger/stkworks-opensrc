import React from 'react';  
import VideoElement from './VideoElement';  


class VideoMulti extends React.Component {

	render() {

		const post = this.props.post; 
		const page_content = post.page_content[this.props.index];
	
		const videoSources = page_content.video_sources; 
		const count = videoSources.length; 

		let cssClass = ''; 
		let fraction = 12; 

		if(count === 1) {
			cssClass = "video--solo";
		}
		else if(count === 2) {
			cssClass = "video--double";
			fraction = 6;
		}
		else if(count === 3) {
			cssClass = "video--triple"; 
			fraction = 4; 
		}

		const videos = Object.keys(videoSources).map((key) => {

		var src = videoSources[key].source;
		
		let poster = "";
		if(videoSources[key].video_poster) {
			poster = videoSources[key].video_poster.url;
		}

		return (
			<div key={key} className={`layout u-${fraction}/12@gmobilep`}>
				<div className="wrapper relative">
					<svg className="phone-frame" viewBox="0 0 76.27 158.18">
						<path className="a" d="M64.79.92H11.48A10.46,10.46,0,0,0,1,11.38V146.8a10.46,10.46,0,0,0,10.46,10.46H64.79A10.46,10.46,0,0,0,75.26,146.8V11.38A10.46,10.46,0,0,0,64.79.92Zm8,137.78a.61.61,0,0,1-.61.61H4a.61.61,0,0,1-.61-.61V17.64A.61.61,0,0,1,4,17H72.18a.61.61,0,0,1,.61.61Z"/><circle className="home-button" cx="37.95" cy="148.4" r="5.46"/><rect className="c" x="1.01" y="0.92" width="74.25" height="156.34" rx="10.46" ry="10.46"/>
					</svg>
					
					<VideoElement key={post.id+'-'+this.props.index+key} index={post.id+'-'+this.props.index+key} url={src.url} type={src.mime_type} poster={poster} /> 
				</div>
			</div>); 
		});

		return(
			<div className={`centered-module video video--multi ${cssClass} mb+`}>
				{ videos }
			</div>
		)
	} 
}

export default VideoMulti;