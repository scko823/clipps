import React from 'react';
import PropTypes from 'prop-types';

// import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import FormGroup from 'material-ui/Form/FormGroup';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';

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

const ForgetPassword = ({
	classes,
	emailError,
	validateEmail,
	onFieldChange,
	onResetPassword,
	disabled,
	attempedReset,
	resetCompleted
}) => (
  <Grid className={classes.root} container>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item className={classes.centeredText}>
          <h1 className={classes.h1}>Reset Password</h1>
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
            <Button
              variant="raised"
              label="Reset Password"
              color="primary"
              onClick={onResetPassword}
              disabled={disabled}
              className={classes['cta-btn']}
            >
							Reset Password
            </Button>
            {attempedReset &&
							resetCompleted && (
								<span>
									Please check your email and follow the instruction in the{' '}
  <Link to="/reset-password">next page</Link>{' '}
								</span>
							)}
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

ForgetPassword.propTypes = {
	classes: PropTypes.object.isRequired,
	emailError: PropTypes.bool.isRequired,
	validateEmail: PropTypes.func.isRequired,
	onFieldChange: PropTypes.func.isRequired,
	onResetPassword: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
	attempedReset: PropTypes.func.isRequired,
	resetCompleted: PropTypes.bool.isRequired
};

export default compose(withStyles(styles))(ForgetPassword);
