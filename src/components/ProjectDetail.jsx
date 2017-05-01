import React from 'react';  
import { Link, Redirect } from 'react-router-dom';

import Footer from './Footer';  
import ProjectHeader from './ProjectHeader'; 
import ProjectDescription from './ProjectDescription'; 
import Text from './Text'; 
import VideoSingle from './VideoSingle'; 
import VideoMulti from './VideoMulti'; 
import NextProject from './NextProject'; 
import SingleImage from './SingleImage'; 
import Medium2 from './Medium2'; 
import Imprint from './Imprint'; 
import CodePen from './CodePen'; 
import CallToAction from './CallToAction'; 

import { TweenMax } from 'gsap'; 
import { addClass, removeClass } from '../helpers'; 

const components = {
	'project-header': ProjectHeader,
	'project-description': ProjectDescription,
	'text': Text,
	'video-single': VideoSingle,
	'video-multi': VideoMulti,
	'next-project-link': NextProject,
	'single-image': SingleImage,
	'medium2': Medium2,
	'codepen': CodePen,
	'call-to-action': CallToAction,
};  

class ProjectDetail extends React.Component {

	constructor() {
		super();

		this.state = {
			data : null,
			post : null,
			pageContent : {},
			footerData : null,
			colorClass : '',
			isDetailPage : ' is-home-page',
			hasFooterData : false,
		}
	}

	componentWillMount() {

		// user clicks on link on overview page to get to the details page

		// console.log("detail will mount");
		
		const data = this.props.params.data;

		if(!this.isEmpty(data)) {

			let post = null;
			let pageContent = {};
			let colorClass = '';
			let isDetailPage = '';
			let footerData = null;
			let hasFooterData = false;
			
			if(data !== undefined) {
				post = data.posts[this.props.location.pathname];

				if(post !== undefined) {

					if(post['color-class'] !== undefined) { 
						colorClass = ' c-'+post['color-class'];
						isDetailPage = ' is-detail-page';
					}

					pageContent = post.page_content;
					footerData = data.footer;
					hasFooterData = true;
				}
			}

			// console.log("set detail state in will mount");
			this.setState({
				data, post, pageContent, footerData, colorClass, isDetailPage, hasFooterData
			});
		}		
	} 

	componentWillReceiveProps(nextProps) {
		
		// user gets directly on the detail page and hits enter
		// console.log("detail will receive props");

		const data = nextProps.params.data;
		nextProps.params.setAppState('introAnimDone', true);

		let post = null;
		let colorClass = '';
		let isDetailPage = '';
		let pageContent = {};
		let footerData = null;
		let hasFooterData = false;
	
		if(data !== undefined) {
			post = data.posts[this.props.location.pathname];

			if(post !== undefined) {

				if(post['color-class'] !== undefined) { 
					colorClass = ' c-'+post['color-class'];
					isDetailPage = ' is-detail-page';
				}

				pageContent = post.page_content;
				footerData = data.footer;
				hasFooterData = true;
			}
		}

		this.setState({
			data, post, pageContent, footerData, colorClass, isDetailPage, hasFooterData
		});

	}

	isEmpty(obj) {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key))
	            return false;
	    } 
	    return true;
	}


	
	render() {
		// console.log("render detail");
		// console.log(this.state);

		const _this = this;
		const pageContent = this.state.pageContent;
		
		if(this.isEmpty(pageContent) && this.state.data !== null) { //project not found, wrong slug!
			// console.log("make Redirect");
			return (
				<Redirect to="/" push={true} />
			);
		}
		else {

			return (  
				<div className={`transition-item${this.state.colorClass}`}>
				    { Object
			    		.keys(pageContent) 
			    		.map(function(key, index) {
			    		 	
			    		 	const module = components[pageContent[key].acf_fc_layout];
			    		 	return React.createElement(module, {
			    		 		key: key, 
			    		 		index: key, 
			    		 		post: _this.state.post, 
			    		 		data: _this.state.data,
			    		 		getAppState: _this.props.params.getAppState,
			    		 		setAppState: _this.props.params.setAppState
			    		 	}); 
			    		})
					}

					{ this.state.hasFooterData ? (
					<Footer data={this.state.footerData} post={this.state.post} /> )
					: '' }	

					<Imprint />		

			    </div>
			)
		
		}


	}


}

ProjectDetail.contextTypes = {
  router: React.PropTypes.object
};

export default ProjectDetail; 