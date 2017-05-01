import React from 'react';  
import { Link } from 'react-router-dom';
import { addClass, removeClass, disableScroll, isSafari } from '../helpers';

class Footer extends React.Component {


	openImprint(e) {
		e.preventDefault();
		const imprint = document.querySelectorAll('.js-module--imprint')[0];
		addClass(imprint, 'is-visible');

		setTimeout(function() {
		    disableScroll(isSafari());
		}, 400);
		 
	}


	render() {

		const data = this.props.data;
		const post = this.props.post;
		const year = new Date().getFullYear(); 
		
		let bgClass = '';
		if(post.slug === 'home') {
			bgClass = 'has-bg';
		}

		return(
			<footer className= {`site-footer js-waypoint-footer ${bgClass}`} id="contact">
				<div className="footer-contact bb">
					<div className="layout u-3/12@tablet">
						<p><Link to='/'>Stefan Kaltenegger</Link></p>
					</div>
					<div className="layout u-3/12@tablet u-4/12@gmobilep u-6/12@phone">
						<p><Link to='/#about'>About</Link></p>
						<p><Link to='#' onClick={(e) => this.openImprint(e)}>Imprint</Link></p>
					</div>
					<div className="layout u-3/12@tablet u-4/12@gmobilep u-6/12@phone">
						<div className="float-right-on-desk desk-pr">
							<p><a href="mailto:stefan@stk.works">stefan@stk.works</a></p>
							<p><a href="https://twitter.com/skaltenegger">Follow @skaltenegger</a></p>
						</div>
					</div>
					<div className="layout u-3/12@tablet u-4/12@gmobilep">
						<div className="float-right-greater-phone last-footer-item">
							<p className="u-6/12@phone">Graz, Austria</p>
							<p className="u-6/12@phone">&copy; {year} by SK</p>
						</div>
					</div>
				</div>	
			</footer>
		)
	} 
}

export default Footer;