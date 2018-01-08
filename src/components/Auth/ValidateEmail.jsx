import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import FormGroup from 'material-ui/Form/FormGroup';
import { red } from 'material-ui/colors';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import { compose, withStateHandlers /* withProps */ } from 'recompose';

// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
// import validateEmail from '../../../graphql/mutations/validateEmail';

const styles = theme => ({
    root: {
        margin: `${theme.spacing.unit * 2}px 0`
    },
    inputError: {
        color: red['100']
    },
    form: {
        'flex-grow': 0.8
    }
});

const ValidateEmail = ({ classes, validationSecert, submit, disabled, onValueChange }) => (
  <Grid className={classes.root} container>
    <Grid container item xs={12} justify="center">
      <FormGroup className={classes.form}>
        <TextField
          autoFocus
          value={validationSecert}
          label="secert"
          onChange={onValueChange}
        />
        <br />
        <Button
          raised
          label="Create Clipboard"
          color="primary"
          onClick={submit}
          disabled={disabled}
        >
                    validate my email
        </Button>
      </FormGroup>
    </Grid>
  </Grid>
);

ValidateEmail.propTypes = {
    classes: PropTypes.object.isRequired,
    validationSecert: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onValueChange: PropTypes.func.isRequired
};

const recomposeEnhancer = compose(
    withStateHandlers(
        ({ validationSecert = '', disabled = true }) => ({
            validationSecert,
            disabled
        }),
        {
            onValueChange: () => ({ target }) => ({ validationSecert: target.value })
        }
    )
);

export default compose(withStyles(styles), withRouter, recomposeEnhancer)(ValidateEmail);
