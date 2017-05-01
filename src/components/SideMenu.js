import React from 'react';  

import { TweenMax } from 'gsap'; 
require('gsap/ScrollToPlugin'); 
import { addClass, removeClass } from '../helpers'; 

require('waypoints/lib/noframework.waypoints');
require('waypoints/lib/shortcuts/inview');
const Waypoint = window.Waypoint;

class SideMenu extends React.Component {

	componentDidMount() {
		// console.log("sidemenu did mount");

		var waypoints = document.getElementsByClassName('js-waypoint');
		var mainDivs = []; 
		var link; 

		for (var i = 0; i < waypoints.length; i++) {
		    new Waypoint({
		        element: waypoints[i],
		        handler: function(direction) {

		           var id = this.element.getAttribute("id");  
		           removeClass(document.querySelectorAll('.projects-sticky-nav a.active')[0], 'active');

		           mainDivs.push(id);

		           if (direction === 'down') {
		               //link mit der richtigen ID in url highlighten 
		               link = document.querySelectorAll('.menu_link[href$="' + id + '"]')[0];
		               addClass(link, 'active'); 
		           }
		           else {
		              //das vorhergehende "js-waypoint" item vor dem derzeitigen waypoint abfragen und die ID highlighten im menü
		              var index = mainDivs.indexOf(id)-1;
		              id = mainDivs[index];
		              link = document.querySelectorAll('.menu_link[href$="' + id + '"]')[0];
		              addClass(link, 'active'); 
		          }
		        },  
		        offset: '50%'
		    });
		}

		// For the footer cause it triggers when it should come in the viewport right away
     	 var waypoint_el = document.querySelectorAll('.js-waypoint-footer')[0];
         new Waypoint({
             element: waypoint_el,
             handler: function(direction) {

             	 removeClass(document.querySelectorAll('.projects-sticky-nav a.active')[0], 'active');
             	 var link = document.querySelectorAll('.menu_link');

                 if (direction === 'down') {
                    addClass(link[link.length-1], 'active');
                 } else {
                    addClass(link[link.length-2], 'active');
                 }
             },  
             offset: '99.5%'
         }); 

	}

	// componentDidUpdate() {
	// 	console.log("did update");
	// }

	componentWillUnmount() {
		Waypoint.destroyAll();
	}


	clickSideMenuItem(e, target) {
		e.preventDefault(); 
	 	TweenMax.to(window, 0.5, {scrollTo:"#"+target});
	}

	render() {  

		const post = this.props.post; 
		const page_content = post.page_content[this.props.index];
		const works = page_content.works;

		const sideMenuItems = Object
						.keys(works)
						.map((key) => {
							return (
								<li key={key}><a className="menu_link" onClick={(e) => this.clickSideMenuItem(e, works[key].work.post_name)} href={`#${works[key].work.post_name}`}>0{parseInt(key,10)+1}</a></li>
							);
						}); 

		return(
			<nav className="projects-sticky-nav">
				<ul className="projects-nav-list">
					<li className=""><a className="menu_link icon active" onClick={(e) => this.clickSideMenuItem(e, 'hero')} href="#hero"><svg viewBox="0 0 40 40"><path className="a" d="M23.64,16.39c-.13,0-.21,0-.34,0A2.41,2.41,0,0,1,20.48,15a3.49,3.49,0,0,1-2.84,1.45,3,3,0,0,1-1.46-.35m7.49.73c0,2.5-1.69,4.52-3.77,4.52s-3.77-2-3.77-4.52,1.69-4.52,3.77-4.52S23.67,14.3,23.67,16.8Zm-5.56,4v2l-3.78,1.35a2.26,2.26,0,0,0-1.5,2.13v1.42H27.16V26.3a2.26,2.26,0,0,0-1.5-2.13l-3.77-1.35V20.64"/></svg></a></li>
					{ sideMenuItems } 						
					<li className=""><a className="menu_link icon" onClick={(e) => this.clickSideMenuItem(e, 'contact')} href="#contact"><svg viewBox="0 0 40 40"><path className="a" d="M20.68,18.64a.34.34,0,1,1-.34-.34A.34.34,0,0,1,20.68,18.64Zm2.72,0a.34.34,0,1,1-.34-.34A.34.34,0,0,1,23.4,18.64Zm-5.44,0a.34.34,0,1,1-.34-.34A.34.34,0,0,1,18,18.64Zm-5.78,4.42a.68.68,0,0,0,.68.68h1.36v2.72l2.72-2.72h10.2a.68.68,0,0,0,.68-.68V14.22a.68.68,0,0,0-.68-.68H12.86a.68.68,0,0,0-.68.68Z"/></svg></a></li>
				</ul>
			</nav>
		); 
	} 
}

export default SideMenu;