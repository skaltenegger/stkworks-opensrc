import React from 'react';  
import { Link, browserHistory } from 'react-router-dom';
import { TweenMax } from 'gsap';
import { addClass, removeClass } from '../helpers'; 


class CallToAction extends React.Component {

	render() {

		const post = this.props.post; 
		const page_content = post.page_content[this.props.index];
		
		const link = page_content.link;
		const label = page_content.label;
		const text = page_content.text;
		const classes = page_content.classes;
		
		return(
			<div className="centered-module module--cta">
				<div className={`block m0a u-6/12@gdesk u-9/12@tablet-w ${classes}`}>
				
					<a href={link} target="_blank" className="has-arrow js-show-more-info">
						<span className="link-inner">
							<span className="arrow arrow--before layout"> 
								<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
							</span>
							<span className="link-text layout caps label">{label}</span>
							<span className="arrow arrow--after layout"> 
								<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
							</span>
							<span className="block label--next-project-name mb-">{text}</span>
						</span>
					</a> 

				</div>
			</div>
		)
	} 


}

export default CallToAction;