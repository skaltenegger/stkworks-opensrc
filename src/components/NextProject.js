import React from 'react';  
import { Link, browserHistory } from 'react-router-dom';
import { TweenMax } from 'gsap';
import { addClass, removeClass } from '../helpers'; 


class NextProject extends React.Component {

	
	// getMeTo(e, url) {
	// 	e.preventDefault();
	
	// 	const page = document.querySelectorAll('.is-detail-page')[0];
	// 	if(page !== undefined) {
	// 		removeClass(page, 'is-visible');
			
	// 		setTimeout(function() {
	// 		      browserHistory.push(url);  
	// 		}, 400);
	// 	}
	// }


	render() {

		const post = this.props.post; 
		const postName = post.slug;

		const projectList = this.props.data.posts['/'].page_content[2].works;

		const projectCount = projectList.length;

		let index = 0;

		for(let i = 0; i<projectCount; i++) {
			let projectName = projectList[i].work.post_name;
			
			if(projectName === postName) {
				index = i;
				if(index<projectCount-1) {
					index++;
				}
				else {
					index = 0;
				}
			}
		}
		
		const nextProject = projectList[index].work;
		const url = '/for/'+nextProject.post_name; 
		
		return(
			<div className="layout module--next-project mobile-pv gdesk-pv++">

				<div className="centered-module pv+">
					<div className="block m0a u-6/12@large u-6/12@lap u-9/12@tablet-w">
					
						<Link to={url}  className="has-arrow c-brand js-show-more-info">
							<span className="link-inner">
								<span className="arrow arrow--before layout"> 
									<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
								</span>
								<span className="link-text layout caps label label--next-project">Next Project</span>
								<span className="arrow arrow--after layout"> 
									<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
								</span>
								<span className="block label--next-project-name mb-">{nextProject.post_title}</span>
							</span>
						</Link> 

					</div>
				</div>
				
			</div>
		)
	} 
}


NextProject.contextTypes = {
	router : React.PropTypes.object
}


export default NextProject;