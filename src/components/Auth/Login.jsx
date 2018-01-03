import React from 'react';
import PropTypes from 'prop-types';

// import { withRouter } from 'react-router';

import validator from 'validator';
import Grid from 'material-ui/Grid';

import Button from 'material-ui/Button';
import FormGroup from 'material-ui/Form/FormGroup';
// import IconButton from 'material-ui/IconButton';
// import AccountCircle from 'material-ui-icons/AccountCircle';
import { red } from 'material-ui/colors';
import TextField from 'material-ui/TextField';
// import Typography from 'material-ui/Typography';
// import { CircularProgress } from 'material-ui/Progress';
// import Popover from 'material-ui/Popover';
import { withStyles } from 'material-ui/styles';
// import SendIcon from 'material-ui-icons/Send';
import { compose, withStateHandlers, withProps } from 'recompose';

const styles = theme => ({
    root: {
        margin: `${theme.spacing.unit * 2}px 0`
    },
    inputError: {
        color: red['100']
    }
});

const Login = ({
    classes,
    emailError,
    onEmailChange,
    onEmailBlur,
    submit,
    onEmailFocus,
    showEmailError,
    disabled
}) => (
  <Grid className={classes.root} container>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item>
          <FormGroup>
            <TextField
              autoFocus
              onFocus={onEmailFocus}
              error={showEmailError && emailError}
              helperText={emailError ? <span>Must be a valid email</span> : null}
              label="Email"
              onChange={onEmailChange}
              onBlur={onEmailBlur}
            />
            <br />
            <Button
              raised
              label="Create Clipboard"
              color="primary"
              onClick={submit}
              disabled={disabled}
            >
                            Login
            </Button>
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    emailError: PropTypes.bool.isRequired,
    showEmailError: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onEmailFocus: PropTypes.func.isRequired,
    onEmailBlur: PropTypes.func.isRequired
};

const recomposeEnhancer = compose(
    withStateHandlers(
        ({ email = '' }) => ({
            email,
            password: 'test',
            emailError: false
        }),
        {
            onEmailChange: () => ({ target }) => ({
                email: target.value,
                showEmailError: false,
                emailError: !validator.isEmail(target.value)
            }),
            onEmailBlur: () => () => ({
                showEmailError: true
            }),
            onEmailFocus: () => () => ({
                showEmailError: false
            })
        }
    ),
    withProps(({ email, password, emailError }) => ({
        disabled: !email || !password || emailError
    }))
);

export default compose(withStyles(styles), recomposeEnhancer)(Login);
