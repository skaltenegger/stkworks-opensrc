import React from 'react';
import { withRouter } from 'react-router-dom';
import { TweenMax, TimelineLite } from 'gsap';


class ScrollToTop extends React.Component {

  componentDidMount() {
  	// console.log("Scrolltop did mount");
  }

  componentDidUpdate(prevProps) {

  	// console.log("scrollhandler");
  	// console.log(this.props.location);
  	const hash = this.props.location.hash;

  	if(hash !== "") {
  		// console.log("scroll to hash");
  		setTimeout(function() { 
  			TweenMax.to(window, 0, {scrollTo: hash });
  		}, 400);
  	}
    else if (this.props.location !== prevProps.location) {
        // console.log("set top");
    	setTimeout(function() { 
    		window.scrollTo(0, 0);
    	}, 400);
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)