import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import validator from 'validator';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import FormGroup from 'material-ui/Form/FormGroup';
import { red } from 'material-ui/colors';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import { compose, withStateHandlers, withProps } from 'recompose';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import signupUserMutation from '../../../graphql/mutations/signupUser';

const styles = theme => ({
	root: {
		margin: `${theme.spacing.unit * 2}px 0`
	},
	inputError: {
		color: red['100']
	},
	h1: {
		margin: `${theme.spacing.unit * 6}px 0`
	}
});

const SignUp = ({
	classes,
	emailError,
	onEmailChange,
	onEmailBlur,
	submit,
	onEmailFocus,
	showEmailError,
	onPasswordFocus,
	showPasswordError,
	passwordError,
	onPasswordBlur,
	onPasswordChange,
	disabled
}) => (
  <Grid className={classes.root} container>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item>
          <h1 className={classes.h1}>Sign Up</h1>
          <FormGroup>
            <TextField
              autoFocus
              onFocus={onEmailFocus}
              error={showEmailError && emailError}
              helperText={
								showEmailError && emailError && <span>Must be a valid email</span>
							}
              label="Email"
              onChange={onEmailChange}
              onBlur={onEmailBlur}
            />
            <TextField
              onFocus={onPasswordFocus}
              type="password"
              name="password1"
              error={showPasswordError && passwordError}
              onChange={onPasswordChange}
              helperText={
								showPasswordError &&
								passwordError && <span>Must be at least 6 characters</span>
							}
              label="password"
              onBlur={onPasswordBlur}
            />
            <TextField
              onFocus={onPasswordFocus}
              type="password"
              name="password2"
              error={showPasswordError && passwordError}
              onChange={onPasswordChange}
              helperText={
								showPasswordError &&
								passwordError && <span>Must be at least 6 characters</span>
							}
              label="verify password"
              onBlur={onPasswordBlur}
            />
            <br />
            <Button
              variant="raised"
              label="Sign Up"
              color="primary"
              onClick={submit}
              disabled={disabled}
            >
							Sign up
            </Button>
            <br />
						Already have an account? <Link to="/login">Login</Link>
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

SignUp.propTypes = {
	classes: PropTypes.object.isRequired,
	emailError: PropTypes.bool.isRequired,
	showEmailError: PropTypes.bool.isRequired,
	onEmailChange: PropTypes.func.isRequired,
	onEmailFocus: PropTypes.func.isRequired,
	onEmailBlur: PropTypes.func.isRequired,
	passwordError: PropTypes.bool.isRequired,
	showPasswordError: PropTypes.bool.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
	onPasswordFocus: PropTypes.func.isRequired,
	onPasswordBlur: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
	submit: PropTypes.func.isRequired
};

const withSignUpUserMutation = graphql(
	gql`
		${signupUserMutation}
	`
);

const recomposeEnhancer = compose(
	withStateHandlers(
		({
			email = '',
			password1 = '',
			password2 = '',
			emailError = false,
			passwordError = false
		}) => ({
			email,
			password1,
			password2,
			emailError,
			passwordError
		}),
		{
			onEmailChange: () => ({ target }) => ({
				email: target.value,
				showEmailError: false,
				emailError: !validator.isEmail(target.value) && !!target.value
			}),
			onEmailBlur: () => () => ({
				showEmailError: true
			}),
			onEmailFocus: () => () => ({
				showEmailError: false
			}),
			onPasswordChange: () => ({ target }) => ({
				[target.name]: target.value,
				showPasswordError: false,
				passwordError: target.value.length < 6 && target.value !== ''
			}),
			onPasswordBlur: () => () => ({
				showPasswordError: true
			}),
			onPasswordFocus: () => () => ({
				showPasswordError: false
			})
		}
	),
	withProps(({ email, password1, password2, passwordError, emailError, mutate, history }) => ({
		disabled:
			!email ||
			password1 !== password2 ||
			!password1 ||
			!password2 ||
			emailError ||
			passwordError,
		submit: () => {
			mutate({ variables: { email, password1 } })
				.then(() => {
					console.info('signup success');
					history.push(`/validate-email/${email}`);
				})
				.catch(err => {
					const { graphQLErrors } = err;
					console.error(err);
					if (
						graphQLErrors.some(
							e =>
								e.functionError ===
								'Email already registered, need email validation'
						)
					) {
						history.push(`/validate-email/${email}`);
					} else if (
						graphQLErrors.some(
							e => e.functionError === 'Email already in use and validated'
						)
					) {
						history.push(`/login?email=${email}`);
					}
				});
		}
	}))
);

export default compose(withStyles(styles), withRouter, withSignUpUserMutation, recomposeEnhancer)(
	SignUp
);
