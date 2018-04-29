import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import { compose, withStateHandlers, withProps } from 'recompose';

export const PasswordConfirm = ({
	onPasswordFocus,
	passwordError,
	onPasswordChange,
	showPasswordError,
	onPasswordBlur
}) => (
  <Fragment>
    <TextField
      onFocus={onPasswordFocus}
      type="password"
      name="password1"
      error={showPasswordError && passwordError}
      onChange={onPasswordChange}
      helperText={
				showPasswordError && passwordError && <span>Must be at least 6 characters</span>
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
				showPasswordError && passwordError && <span>Must be at least 6 characters</span>
			}
      label="verify password"
      onBlur={onPasswordBlur}
    />
  </Fragment>
);

PasswordConfirm.propTypes = {
	passwordError: PropTypes.bool.isRequired,
	showPasswordError: PropTypes.bool.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
	onPasswordFocus: PropTypes.func.isRequired,
	onPasswordBlur: PropTypes.func.isRequired
};

export const passwordConfirmEnhancer = compose(
	withStateHandlers(
		({ password1 = '', password2 = '', passwordError = false, showPasswordError = false }) => ({
			password1,
			password2,
			passwordError,
			showPasswordError
		}),
		{
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
	withProps(({ password1, password2, passwordError }) => ({
		passwordDisabled: password1 !== password2 || !password1 || !password2 || passwordError
	}))
);
