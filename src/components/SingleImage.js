import React from 'react';  

class SingleImage extends React.Component {

	render() {

		const post = this.props.post; 
		const url = post.page_content[this.props.index].l_image.url;
		
		return(
			<section className="js-section module centered-module">	
				<div className="layout tablet-mb mb-">
					<img src={url} alt="" />
				</div>
			</section>
		)
	} 
}

export default SingleImage;