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
import { compose, withStateHandlers, setDisplayName } from 'recompose';

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
	email,
	validationRequired,
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
            {attempedLogin &&
							validationRequired && (
								<span>
									You must <Link to={`/validate-email/${email}`}>validate</Link>{' '}
									your email before login{' '}
								</span>
							)}
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
	validationRequired: PropTypes.bool.isRequired,
	email: PropTypes.string.isRequired,
	login: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired
};

LoginForm.displayName = 'LoginForm(Base)';

const withLoginMutation = graphql(
	gql`
		${loginMutation}
	`,
	{
		props: ({ ownProps, mutate }) => ({
			...ownProps,
			login: () => {
				const {
					email,
					password,
					history,
					onAttemptLogin,
					onLoginFail,
					onValidationRequired
				} = ownProps;
				onAttemptLogin();
				mutate({ variables: { email, password } })
					.then(({ data: { authenticateUser: { token } } }) => {
						localStorage.setItem('token', token);
						history.push('/boards/NOW');
					})
					.catch(err => {
						onLoginFail();
						const { graphQLErrors = [] } = err;
						if (!graphQLErrors.length) {
							return;
						}
						const error = graphQLErrors[0];
						if (
							error.functionError &&
							error.functionError === 'Email must be validated prior to login'
						) {
							onValidationRequired();
							setTimeout(() => {
								history.push(`/validate-email/${email}`);
							}, 2500);
						}
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
			loginError = false,
			validationRequired = false
		}) => ({
			emailError,
			email,
			password,
			disabled,
			attempedLogin,
			loginError,
			validationRequired
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
			}),
			onValidationRequired: () => () => ({
				validationRequired: true
			})
		}
	)
);

const enhancer = compose(
	setDisplayName('LoginEnhancer'),
	withStyles(styles),
	withRouter,
	setDisplayName('withRecomposeEnhacer'),
	recomposeEnhancer,
	setDisplayName('withLogin'),
	withLoginMutation
);

export default enhancer(LoginForm);
