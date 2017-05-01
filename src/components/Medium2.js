import React from 'react';  


class Medium2 extends React.Component {

	render() {

		const post = this.props.post; 
		const src1 = post.page_content[this.props.index].r_image[0].l_image.url;
		const src2 = post.page_content[this.props.index].r_image[1].l_image.url;
		
		return(
			<section className="js-section module centered-module mb+">									
				<div className="layout u-6/12@tablet mobile-mt- tablet-pr-">
					<img src={src1} alt="" />
				</div>
				<div className="layout u-6/12@tablet mobile-mt tablet-pl-">
					<img src={src2} alt="" />
				</div>
			</section>
		)
	} 
}

export default Medium2;