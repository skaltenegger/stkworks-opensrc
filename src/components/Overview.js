import React from 'react';  

import Hero from './Hero'; 
import About from './About'; 
import ProjectsOverview from './ProjectsOverview'; 
import Footer from './Footer';  
import Imprint from './Imprint'; 

import { TweenMax } from 'gsap'; 
import { addClass, removeClass } from '../helpers'; 

const components = {
	'hero': Hero,
	'about': About,
	'work-overview': ProjectsOverview
};  


class Overview extends React.Component {

	constructor() {
		super();
	}


	componentDidMount() {
		// console.log("Overview did mount");
		// console.log(this.props);
		// console.log(this.props.params.data);

		// //if it has a hash, go to that position
		// const hash = this.props.location.hash;
		// if(hash !== "" && !this.isEmpty(this.props.params.data)) {
		// 	console.log("scroll to " + hash);
		// 	TweenMax.to(window, 0, {scrollTo: hash});
		// } 
		// else {
		// 	console.log("scroll-to main");
		// 	TweenMax.to(window, 0, {scrollTo: '#main'});
		// }
	}

	componentDidUpdate(nextProps) {
		// console.log("Overview did update");
		// console.log(this.props.location);
		// console.log(this.props.params.data);
	}

	componentWillUnmount() {
		// console.log("unmount Overview");
		// console.log(this.props);

		// window.scrollTo(0, 0);
	} 


	isEmpty(obj) {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key))
	            return false;
	    }
	    return true;
	}
	
	render() {
		// console.log("render Overview");
		// console.log(this.props.location);
		const _this = this; 

		const data = this.props.params.data;
		const introAnimDone = this.props.params.introAnimDone;

		let post = null;
		let pageContent = {};
		let footerData = null;
		let colorClass = '';
		let isDetailPage = ' is-home-page';
		let hasFooterData = false; 

		if(data.posts !== undefined) {
			post = data.posts[this.props.location.pathname];
			if(post !== undefined) { 

				if(post['color-class'] !== undefined) { // project detail
					colorClass = ' c-'+post['color-class'];
					isDetailPage = ' is-detail-page'
				}

				pageContent = post.page_content;
				footerData = data.footer;
				hasFooterData = true; 
			}
			else { //404
				post = data.posts['/'];
				colorClass = '';
				pageContent = post.page_content;
				footerData = data.footer;
				hasFooterData = true; 
			}
		}
		

		return (  
			<div className={`transition-item${colorClass}`}>
			    { Object
		    		.keys(pageContent) 
		    		.map(function(key, index) {
		    		 	
		    		 	const module = components[pageContent[key].acf_fc_layout];
		    		 	return React.createElement(module, {
		    		 		key: key, 
		    		 		index: key, 
		    		 		post: post, 
		    		 		data: data,
		    		 		introAnimDone: introAnimDone,
		    		 		getAppState: _this.props.params.getAppState,
		    		 		setAppState: _this.props.params.setAppState
		    		 	}); 
		    		})
				}

				{ hasFooterData ? (
				<Footer data={footerData} post={post} /> )
				: '' }	

				<Imprint />		

		    </div>
		)
	}
}

export default Overview; 