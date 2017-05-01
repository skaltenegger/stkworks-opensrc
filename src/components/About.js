import React from 'react';  
import { hasClass, addClass, removeClass } from '../helpers'; 


class About extends React.Component {

	constructor() {
		super();

		this.toggleMoreLink = this.toggleMoreLink.bind(this);
	}

	toggleMoreLink(event) {
		event.preventDefault(); 
		const moreInfo = document.querySelectorAll('.js-more-info')[0];    
	 	if(hasClass(moreInfo, 'hidden')) {
	 	  	removeClass(moreInfo, 'hidden');
	 	}
	 	else {
	 	  	addClass(moreInfo, 'hidden');
	 	}

	 	const moreLink = document.querySelectorAll('.js-show-more-info')[0];    
	 	if(hasClass(moreLink, 'is-active')) {
	 	  	removeClass(moreLink, 'is-active');
	 	}
	 	else {
	 	  	addClass(moreLink, 'is-active');
	 	}
	}
	
	render() {

		// console.log("render about");

		const post = this.props.post; 
		const page_content = post.page_content[this.props.index];

		return(
			<div className="centered-module module module--about js-about gdesk-pt+ tablet-p-pt+ pt" id="about">
				
				<div className="layout u-12/12@desk desk-mv gdesk-mv+ pb" dangerouslySetInnerHTML={{__html: page_content.l_text }} />

				<div className="layout u-8/12@desk desk-pr">
					{/*<h2>About</h2>*/}
					<p className="alpha">I am a freelance creative technologist with a Master of Arts in Interaction Design, studied at NYU and FH JOANNEUM where I had the honour to teach classes on digital design and web development.<br />
					</p>
				</div>{/*

			 */}<div className="layout u-4/12@desk desk-pl desk-pr+">
					{/*<h2>Let's talk</h2>*/}
					<p className="alpha">Email me at <a href="mailto:stefan@stk.works" className="is-underlined--bold">stefan@stk.works</a> or follow me <a href="https://twitter.com/skaltenegger" target="blank" className="is-underlined--bold">@skaltenegger</a></p>
				</div>

				<a className="has-arrow c-brand block" href="http://stk.works/files/Resume-Stefan-Kaltenegger.pdf" target="_blank">
					<span className="link-inner">
						<span className="arrow arrow--before layout"> 
							<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
						</span>
						<span className="link-text layout">View Resume</span>
						<span className="arrow arrow--after layout"> 
							<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
						</span>
					</span>
				</a> 

				<a className="has-arrow c-brand show-more-info js-show-more-info" href="#" onClick={(e) => this.toggleMoreLink(e)}>
					<span className="link-inner">
						<span className="arrow arrow--before layout"> 
							<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
						</span>
						<span className="link-text layout">Skillset, education and teaching</span>
						<span className="arrow arrow--after layout"> 
							<svg viewBox="0 0 25 12"><line x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
						</span>
					</span>
				</a> 
				
				<div className="layout more-info hidden oh js-more-info">

					<div className="layout pt">
						<div className="layout u-4/12@desk u-6/12@tablet-p tablet-p-pr desk-pt- desk-pr">
							<h2>Skillset</h2>

							<h3>Development</h3>
							<p>HTML, CSS (SASS), JavaScript/ES6, PHP, SQL (MySQL),
							React, Angular, jQuery, GSAP, paper.js,
							Node.js, WebPack, Gulp/Grunt, Git,
							WordPress, Amazon Web Services, Basic Unix DevOps skills</p>
							<h3>Design</h3>
							<p>Adobe Photoshop, InDesign, Illustrator <br />Sketch</p>

						</div>{/*
						 */}<div className="layout u-4/12@desk u-6/12@tablet-p tablet-p-pl desk-pt- desk-ph-">
							<h2>Education</h2>
							
							<h3>2016</h3>
							<p>Marshall Plan Scholarhip Semester, Integrated Digital Media grad program at NYU Tandon School of Engineering, Brooklyn, NY</p>

							<h3>2010 - 2016</h3>
							<p>Master of Arts in Arts and Design in Interaction Design, Bachelor of Arts in Arts and Design in Information Design at FH JOANNEUM, Graz/Austria</p>

						</div>{/*
						 */}<div className="layout u-4/12@desk desk-pt- desk-pl">
							<h2>Teaching</h2>

							<h3>Fall 2016</h3>
							<p>14-hour-course on the process of making websites at the Information Design undergrad program at FH JOANNEUM, Graz/Austria</p>

							<h3>May 2016</h3>
							<p>Talk on my freelance development work and process in the class of Jason Sigal at the IDM undergrad program at NYU Tandon</p>
						</div>
					</div>
				</div>

			</div>
		)
	} 
}

export default About;