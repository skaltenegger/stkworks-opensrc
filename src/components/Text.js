import React from 'react';  


class Text extends React.Component {

	render() {

		const post = this.props.post; 
		const page_content = post.page_content[this.props.index];
		const text = page_content.l_text;

		const opt = page_content.l_options; 
		let optClasses = '';

		if(opt != "") {
			optClasses = opt.join(' ');
		}

		return(
			<div className={`centered-module module module--text ${optClasses}`}>
				<div className="layout u-6/12@large u-6/12@lap u-9/12@tablet-w block m0a" dangerouslySetInnerHTML={{__html: text }} />
			</div>
		)
	} 
}

export default Text;