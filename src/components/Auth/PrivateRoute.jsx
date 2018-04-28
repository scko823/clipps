import React from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';
import AuthContext from '../contexts/AuthContext';

const hasToken = () => {
	try {
		return !!localStorage.getItem('token');
	} catch (err) {
		return false;
	}
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {isLogin => (
      <Route
        {...rest}
        render={props =>
					isLogin || hasToken() ? <Component {...props} /> : <Redirect to="/login" />
				}
      />
		)}
  </AuthContext.Consumer>
);

PrivateRoute.propTypes = {
	component: PropTypes.node.isRequired
};

export default PrivateRoute;
