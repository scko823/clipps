import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import FormGroup from 'material-ui/Form/FormGroup';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import validator from 'validator';
import { compose, withStateHandlers } from 'recompose';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import loginMutation from '../../../graphql/mutations/login';

const styles = theme => ({
	root: {
		margin: `${theme.spacing.unit * 2}px 0`
	},
	h1: {
		margin: `${theme.spacing.unit * 2}px 0`
	},
	centeredText: {
		textAlign: 'center'
	},
	'cta-btn': {
		margin: `${theme.spacing.unit * 2}px 0`
	}
});

const LoginForm = ({
	classes,
	validateEmail,
	emailError,
	onFieldChange,
	login,
	disabled,
	loginError,
	attempedLogin
}) => (
  <Grid className={classes.root} container>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item className={classes.centeredText}>
          <h1 className={classes.h1}>Login</h1>
          <h6>
            {"Don't have an account?"} <Link to="/signup">Sign up here</Link>
          </h6>
          <FormGroup>
            <TextField
              autoFocus
              label="Email"
              type="email"
              error={emailError}
              onBlur={validateEmail}
              onChange={onFieldChange}
              helperText={emailError && <span>Must be a valid email</span>}
            />
            <TextField label="Password" type="password" onChange={onFieldChange} />
            <Button
              variant="raised"
              label="login"
              color="primary"
              onClick={login}
              disabled={disabled}
              className={classes['cta-btn']}
            >
							Login
            </Button>
            {attempedLogin && loginError && <span>Login Fail</span>}
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired,
	validateEmail: PropTypes.func.isRequired,
	onFieldChange: PropTypes.func.isRequired,
	emailError: PropTypes.bool.isRequired,
	loginError: PropTypes.bool.isRequired,
	attempedLogin: PropTypes.bool.isRequired,
	login: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired
};

const withLoginMutation = graphql(
	gql`
		${loginMutation}
	`,
	{
		props: ({ ownProps, mutate }) => ({
			...ownProps,
			login: () => {
				const { email, password, history, onAttemptLogin, onLoginFail } = ownProps;
				onAttemptLogin();
				mutate({ variables: { email, password } })
					.then(({ data: { authenticateUser: { token } } }) => {
						localStorage.setItem('token', token);
						history.push('/boards/NOW');
					})
					.catch(() => {
						onLoginFail();
					});
			}
		})
	}
);

const recomposeEnhancer = compose(
	withStateHandlers(
		({
			emailError = false,
			email = '',
			password = '',
			disabled = true,
			attempedLogin = false,
			loginError = false
		}) => ({
			emailError,
			email,
			password,
			disabled,
			attempedLogin,
			loginError
		}),
		{
			validateEmail: ({ email }) => () => ({
				emailError: !validator.isEmail(email)
			}),
			onFieldChange: ({ emailError, email, password }) => ev => {
				const { value, type } = ev.target;
				const isEmail = validator.isEmail(email);
				const disabled = !email || !isEmail || !password || !value;
				return {
					[type]: value,
					disabled,
					emailError: type === 'password' ? !isEmail : emailError
				};
			},
			onAttemptLogin: () => () => ({
				attempedLogin: true
			}),
			onLoginFail: () => () => ({
				attempedLogin: true,
				loginError: true,
				disabled: true
			})
		}
	)
);

const enhancer = compose(withStyles(styles), withRouter, recomposeEnhancer, withLoginMutation);

export default enhancer(LoginForm);
