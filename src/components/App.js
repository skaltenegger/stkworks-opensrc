import React from 'react';  
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { OnUpdate } from 'rrc';

import { TweenMax, TimelineLite } from 'gsap';

import Overview from './Overview';
import ProjectDetail from './ProjectDetail';
import { Route, Switch } from 'react-router-dom';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-93338229-1');

let serverRequest = null;

class App extends React.Component {

	constructor(match) {

		super();

		this.state = {
			data : {},
			dataLoaded: false,
			post : {},
			colorClass : '',
			introAnimDone : false,
			hostName: location.hostname,
			scrollPos: window.scrollY
		}
	}

	getAppState(key) {
		// console.log("get App state");
		return this.state[key];
	}

	setAppState(key, value) {
		// console.log("set App state");
		this.state[key] = value;
	}

	logPageView() {
		ReactGA.set({ page: window.location.pathname });
		ReactGA.pageview(window.location.pathname);
	}


	componentDidMount() {
		
		var _this = this;
		serverRequest = 
		  axios.get('/data/stk-data.json')
		  .then(function (result) {
		      
		      _this.setState({
		      	  data: result.data, 
		      	  dataLoaded: true
		      });

		      // console.log("ajax data load complete");
		      // console.log(_this.state.data);
		  })
		  .catch(function (error) {
		    console.log(error);
		  }); 

		  window.onpopstate = this.onBackButtonEvent;
	}


	onBackButtonEvent(e) {
		// console.log("backbuttonevent fired!");
		// console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
		// console.log("stay at " + window.scrollY);
		const val = window.scrollY;
		TweenMax.to(window, 0.00001, {scrollTo: val });
	}

	componentWillUnmount() {
		// serverRequest.abort()
	}

	render() {
		
		const params = {
			data : this.state.data,
			setAppState : this.setAppState.bind(this),
			getAppState : this.getAppState.bind(this),
			introAnimDone : this.state.introAnimDone
		}

		const location = this.props.location;

		return (
			<div>

				<ReactCSSTransitionGroup transitionName="pg-trans"
	 	            transitionEnterTimeout={900}
	 	            transitionLeaveTimeout={400}>

				    <Switch key={location.pathname} location={location}>
				        <Route path="/for/:slug" render={(props) => (<ProjectDetail params={params}  {...props} />) } />
				        <Route path="/" render={(props) => (<Overview params={params}  {...props} />) } />
				    </Switch>

				</ReactCSSTransitionGroup>

				<OnUpdate immediate
				  call={(location) => {
				     this.logPageView();
				  }} />

			</div>
		)
		
	} 
}

export default App; 