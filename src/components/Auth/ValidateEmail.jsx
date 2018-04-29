import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import FormGroup from 'material-ui/Form/FormGroup';
import { red } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import { compose, withStateHandlers } from 'recompose';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import validateEmail from '../../../graphql/mutations/validateEmail';
import { UUIDInput, uuidInputEnhancer } from './UUIDInput';

const styles = theme => ({
	root: {
		margin: `${theme.spacing.unit * 2}px 0`
	},
	inputError: {
		color: red['100']
	},
	sercet: {
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
	}
});

const ValidateEmail = ({
	classes,
	submit,
	uuidIncomplete,
	attemptedValidation,
	validationSuccess,
	validationSecret,
	onFieldChange,
	validationError,
	focus
}) => (
  <Grid className={classes.root} container>
    <Grid container item xs={12} justify="center">
      <FormGroup className={classes.form}>
        {attemptedValidation && validationSuccess ? (
          <h6>
						Email Verified. If you are not redirected to login page,{' '}
            <Link to="/login">click here</Link>
          </h6>
				) : (
  <h3>Enter your validation key we send to your email</h3>
				)}
        <UUIDInput
          focus={focus}
          className={classes.sercet}
          validationSecret={validationSecret}
          validationError={validationError}
          onFieldChange={onFieldChange}
        />
        <Button
          variant="raised"
          label="Create Clipboard"
          color="primary"
          onClick={submit}
          disabled={uuidIncomplete}
        >
					validate my email
        </Button>
        {attemptedValidation && !validationSuccess && <h6>Check entry</h6>}
      </FormGroup>
    </Grid>
  </Grid>
);

ValidateEmail.propTypes = {
	classes: PropTypes.object.isRequired,
	validationSecret: PropTypes.arrayOf(PropTypes.string).isRequired,
	validationError: PropTypes.arrayOf(PropTypes.bool).isRequired,
	onFieldChange: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
	uuidIncomplete: PropTypes.bool.isRequired,
	attemptedValidation: PropTypes.bool.isRequired,
	validationSuccess: PropTypes.bool.isRequired,
	focus: PropTypes.number.isRequired
};

const onValidationError = () => () => ({ attemptedValidation: true, validationSuccess: false });
const onValidationSuccess = () => () => ({ attemptedValidation: true, validationSuccess: true });

const withValidateEmail = graphql(
	gql`
		${validateEmail}
	`,
	{
		props: ({ mutate, ownProps }) => ({
			submit: e => {
				e.preventDefault();
				const {
					history,
					onValidationError: onValidationErrorCb,
					onValidationSuccess: onValidationSuccessCb,
					validationSecret = [],
					match: { params: { email = '' } } = {}
				} = ownProps;
				mutate({ variables: { email, validationSecret: validationSecret.join('-') } })
					.then(() => {
						onValidationSuccessCb();
						setTimeout(() => {
							history.push('/login');
						}, 2500);
					})
					.catch(err => {
						onValidationErrorCb(err);
					});
			}
		})
	}
);

const recomposeEnhancer = compose(
	withStateHandlers(
		({ attemptedValidation = false, validationSuccess = false }) => ({
			attemptedValidation,
			validationSuccess
		}),
		{
			onValidationError,
			onValidationSuccess
		}
	)
);

export default compose(
	withStyles(styles),
	withRouter,
	uuidInputEnhancer,
	recomposeEnhancer,
	withValidateEmail
)(ValidateEmail);
