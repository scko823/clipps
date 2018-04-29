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
	},
	'forget-pw': {
		backgroundColor: `rgb(225, 0, 80)`,
		color: '#fff',
		'&:hover': {
			backgroundColor: `rgb(157, 0, 56)`
		}
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
	attempedLogin,
	history
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
            <Button
              variant="raised"
              label="Forget Password"
              className={classes['forget-pw']}
              onClick={() => {
								history.push('/forget-password');
							}}
            >
							Forget Password
            </Button>
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
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
					onValidationRequired,
					onLoginSuccess
				} = ownProps;
				onAttemptLogin();
				mutate({ variables: { email, password } })
					.then(({ data: { authenticateUser: { token, id, firstName, lastName } } }) => {
						localStorage.setItem('token', token);
						localStorage.setItem('id', id);
						localStorage.setItem('firstName', firstName);
						localStorage.setItem('lastName', lastName);
						onLoginSuccess(); // notify AuthContext and AppBar login success
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
								history.push(`/validate-email?email=${email}`);
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
			validationRequired = false,
		}) => ({
			emailError,
			email,
			password,
			disabled,
			attempedLogin,
			loginError,
			validationRequired,
		}),
		{
			validateEmail: ({ email }) => () => ({
					emailError: !email ? false : !validator.isEmail(email)
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
