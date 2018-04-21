import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import { withRouter } from 'react-router';
// import validator from 'validator';
// import Grid from 'material-ui/Grid';
// import Button from 'material-ui/Button';
// import FormGroup from 'material-ui/Form/FormGroup';
// import { red } from 'material-ui/colors';
// import TextField from 'material-ui/TextField';
// import { withStyles } from 'material-ui/styles';
// import { compose, withStateHandlers, withProps } from 'recompose';
// import { compose } from 'recompose';

const LoginForm = () => (
  <div>
    <h1>Login Page</h1>
    <h6>
			Go to <Link to="/signup"> sign up </Link> for an account
    </h6>
  </div>
);

// const enhancer = compose(withRouter);

export default LoginForm;
