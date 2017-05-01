import React from 'react';  
import { render } from 'react-dom';
import App from './components/App'; 
import ScrollToTop from './components/ScrollToTop';
import Modernizr from 'modernizr';
import './css/main.css'; 


import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import createBrowserHistory from 'history/createBrowserHistory';

import {
  BrowserRouter as Router,
  Match,
  Route, 
  Switch,
  Link
} from 'react-router-dom';


const router = (
	<Router history={history}>
		<ScrollToTop>
			<Route component={App} /> 
		</ScrollToTop>
	</Router> 
);  


render(router, document.querySelector('#main'));