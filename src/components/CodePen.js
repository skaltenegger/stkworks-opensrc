import React from 'react';  
import Codepen from 'react-codepen';

class CodePen extends React.Component {

	render() {

		const post = this.props.post; 
		const page_content = post.page_content[this.props.index];
		const hash = page_content.hash;
		const classes = page_content.classes;
		
		return(
			<section className={`js-section module hide-on-mobile centered-module ${classes}`}>	
				<Codepen user="kaltee" hash={hash} height="500"></Codepen>
			</section>
		)
	} 
}

export default CodePen;