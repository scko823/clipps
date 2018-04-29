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

import { passwordConfirmEnhancer, PasswordConfirm } from './PasswordConfirm';

const styles = theme => ({
	root: {
		margin: `${theme.spacing.unit * 2}px 0`
	},
	inputError: {
		color: red['100']
	},
	formGroup: {
		margin: `${theme.spacing.unit * 3.5}px 0`
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
	onFirstNameChange,
	onLastNameChange,
	firstName,
	lastName,
	disabled,
	touchedInput
}) => (
  <Grid className={classes.root} container>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item>
          <h1 className={classes.h1}>Sign Up</h1>
          <h6>All fields are required</h6>
          <FormGroup className={classes.formGroup}>
            <TextField
              autoFocus
              error={touchedInput.firstName && !firstName}
              helperText={
								touchedInput.firstName &&
								!firstName && <span>Must provide your first name</span>
							}
              label="First Name"
              onChange={onFirstNameChange}
              onBlur={() => {}}
            />
            <TextField
              onFocus={() => {}}
              error={touchedInput.lastName && !lastName}
              helperText={
								touchedInput.lastName &&
								!lastName && <span>Must provide your last name</span>
							}
              label="Last Name"
              onChange={onLastNameChange}
              onBlur={() => {}}
            />
            <TextField
              onFocus={onEmailFocus}
              error={showEmailError && emailError}
              helperText={
								showEmailError && emailError && <span>Must be a valid email</span>
							}
              label="Email"
              onChange={onEmailChange}
              onBlur={onEmailBlur}
            />
            <PasswordConfirm
              onPasswordFocus={onPasswordFocus}
              showPasswordError={showPasswordError}
              passwordError={passwordError}
              onPasswordBlur={onPasswordBlur}
              onPasswordChange={onPasswordChange}
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
	onFirstNameChange: PropTypes.func.isRequired,
	onLastNameChange: PropTypes.func.isRequired,
	onEmailChange: PropTypes.func.isRequired,
	onEmailFocus: PropTypes.func.isRequired,
	onEmailBlur: PropTypes.func.isRequired,
	passwordError: PropTypes.bool.isRequired,
	showPasswordError: PropTypes.bool.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
	onPasswordFocus: PropTypes.func.isRequired,
	onPasswordBlur: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
	submit: PropTypes.func.isRequired,
	touchedInput: PropTypes.object.isRequired,
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired
};

const withSignUpUserMutation = graphql(
	gql`
		${signupUserMutation}
	`
);

const recomposeEnhancer = compose(
	withStateHandlers(
		({ firstName = '', lastName = '', email = '', emailError = false, touchedInput = {} }) => ({
			firstName,
			lastName,
			email,
			emailError,
			touchedInput
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
			onFirstNameChange: ({ touchedInput }) => ({ target }) => ({
				firstName: target.value,
				touchedInput: { ...touchedInput, firstName: true }
			}),
			onLastNameChange: ({ touchedInput }) => ({ target }) => ({
				lastName: target.value,
				touchedInput: { ...touchedInput, lastName: true }
			})
		}
	),
	withProps(
		({
			email,
			firstName,
			lastName,
			password1,
			passwordDisabled,
			emailError,
			mutate,
			history
		}) => ({
			disabled: !email || !firstName || !lastName || emailError || passwordDisabled,
			submit: () => {
				mutate({ variables: { firstName, lastName, email, password: password1 } })
					.then(() => {
						history.push(`/validate-email?email=${email}`);
					})
					.catch(err => {
						const { graphQLErrors } = err;
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
							history.push(`/login`);
						}
					});
			}
		})
	)
);

export default compose(
	withStyles(styles),
	withRouter,
	withSignUpUserMutation,
	passwordConfirmEnhancer,
	recomposeEnhancer
)(SignUp);
