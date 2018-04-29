import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import FormGroup from 'material-ui/Form/FormGroup';
import { withStyles } from 'material-ui/styles';
import { compose, withProps } from 'recompose';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import resetPasswordMutation from '../../../graphql/mutations/resetPassword';

import { UUIDInput, uuidInputEnhancer } from './UUIDInput';
import { passwordConfirmEnhancer, PasswordConfirm } from './PasswordConfirm';

const styles = theme => ({
	root: {
		margin: `${theme.spacing.unit * 2}px 0`
	},
	h1: {
		margin: `${theme.spacing.unit * 2}px 0`,
		textAlign: 'center'
	},
	formContainer: {
		margin: `0 ${theme.spacing.unit * 4}px`,
		flexFlow: 'column'
	},
	sercet: {
		display: 'flex',
		'flex-grow': 0.8,
		'flex-direction': 'row',
		justifyContent: 'center',
		margin: `${theme.spacing.unit * 2}px 0`,
		'&>div': {
			margin: `0 ${theme.spacing.unit}px`
		}
	},

	form: {
		'&>h3': {
			margin: `${theme.spacing.unit}px 0`,
			textAlign: 'center'
		}
	},
	pwReset: {
		padding: `0 26%`,
		width: '100%'
	},
	'cta-btn': {
		margin: `${theme.spacing.unit * 2}px 0`
	}
});

const ResetPassword = ({
	classes,
	onResetPW,
	disabled,
	focus,
	validationSecret,
	validationError,
	onFieldChange,
	onPasswordFocus,
	showPasswordError,
	passwordError,
	onPasswordBlur,
	onPasswordChange,
	onBlur
}) => (
  <Grid className={classes.root} container>
    <Grid item xs={12}>
      <Grid container className={classes.formContainer} justify="center">
        <h1 className={classes.h1}>Reset Password</h1>
        <FormGroup className={classes.form}>
          <UUIDInput
            onBlur={onBlur}
            focus={focus}
            className={classes.sercet}
            validationSecret={validationSecret}
            validationError={validationError}
            onFieldChange={onFieldChange}
          />
          <FormGroup className={classes.pwReset}>
            <PasswordConfirm
              onPasswordFocus={onPasswordFocus}
              showPasswordError={showPasswordError}
              passwordError={passwordError}
              onPasswordBlur={onPasswordBlur}
              onPasswordChange={onPasswordChange}
            />
            <Button
              variant="raised"
              label="login"
              color="primary"
              onClick={onResetPW}
              disabled={disabled}
              className={classes['cta-btn']}
            >
							Reset Password
            </Button>
          </FormGroup>
          {/* {attempedLogin &&
							validationRequired && (
								<span>
									You must <Link to={`/validate-email/${email}`}>validate</Link>{' '}
									your email before login{' '}
								</span>
							)}
            {attempedLogin && loginError && <span>Login Fail</span>} */}
        </FormGroup>
      </Grid>
    </Grid>
  </Grid>
);

ResetPassword.propTypes = {
	classes: PropTypes.object.isRequired,
	onResetPW: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
	focus: PropTypes.number.isRequired,
	validationSecret: PropTypes.arrayOf(PropTypes.number).isRequired,
	validationError: PropTypes.arrayOf(PropTypes.bool).isRequired,
	onFieldChange: PropTypes.func.isRequired,
	onPasswordFocus: PropTypes.func.isRequired,
	showPasswordError: PropTypes.bool.isRequired,
	passwordError: PropTypes.bool.isRequired,
	onPasswordBlur: PropTypes.func.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired
};

const resetPasswordEnhancer = compose(
	withProps(({ password1, password2, validationError }) => ({
		disabled:
			password1 !== password2 || validationError.some(err => err) || password1.length < 6
	}))
);

const withResetPasswordMutation = graphql(
	gql`
		${resetPasswordMutation}
	`,
	{
		props: ({ ownProps, mutate }) => ({
			...ownProps,
			onResetPW: () => {
				const { history, validationSecret, password1: password } = ownProps;
				return mutate({
					variables: { password, pwRestSecret: validationSecret.join('-') }
				}).then(() => {
					history.push('/login');
				});
			}
		})
	}
);

export default compose(
	withStyles(styles),
	withRouter,
	passwordConfirmEnhancer,
	uuidInputEnhancer,
	resetPasswordEnhancer,
	withResetPasswordMutation
)(ResetPassword);

// export default () => <h1>Reset Password</h1>;
