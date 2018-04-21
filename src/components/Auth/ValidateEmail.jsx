/* eslint react/no-array-index-key: 0 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import FormGroup from 'material-ui/Form/FormGroup';
import { red } from 'material-ui/colors';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import { compose, withStateHandlers /* withProps */ } from 'recompose';

// import fetch from 'unfetch';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import validateEmail from '../../../graphql/mutations/validateEmail';

const uuidSecretAttrs = [
	{
		length: 8
	},
	{
		length: 4
	},
	{
		length: 4
	},
	{
		length: 4
	},
	{
		length: 12
	}
];

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
		'&>h6': {
			margin: `${theme.spacing.unit}px 0`,
			textAlign: 'center'
		}
	}
});

class ValidateEmail extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		validationSecret: PropTypes.arrayOf(PropTypes.string).isRequired,
		validationError: PropTypes.arrayOf(PropTypes.bool).isRequired,
		uuidAttrs: PropTypes.arrayOf(PropTypes.object),
		submit: PropTypes.func.isRequired,
		disabled: PropTypes.bool.isRequired,
		attemptedValidation: PropTypes.bool.isRequired,
		onFieldChange: PropTypes.func.isRequired,
		onFocusChange: PropTypes.func.isRequired,
		focus: PropTypes.number.isRequired
	};
	static defaultProps = {
		uuidAttrs: uuidSecretAttrs
	};
	constructor(...args) {
		super(...args);
		this._inputs = {};
	}
	componentDidUpdate(prevProps) {
		const { focus: prevFocus } = prevProps;
		const { focus: newFocus, onFocusChange } = this.props;
		if (prevFocus !== newFocus) {
			try {
				this._inputs[newFocus].focus();
				onFocusChange(newFocus);
			} catch (err) {
				// nothing
			}
		}
	}
	render() {
		const {
			classes,
			validationSecret,
			submit,
			disabled,
			attemptedValidation,
			onFieldChange,
			validationError,
			uuidAttrs
		} = this.props;
		return (
  <Grid className={classes.root} container>
    <Grid container item xs={12} justify="center">
      <h3>Enter your validation key we send to your email</h3>
      <FormGroup className={classes.form}>
        <FormGroup className={classes.sercet}>
          {uuidAttrs.map((attr, index) => (
            <Fragment>
              <TextField
                key={index}
                autoFocus={index === 0}
                value={validationSecret[index]}
                error={validationError[index]}
                inputProps={{
						'data-section': index,
						'data-length': attr.length
					}}
                onChange={onFieldChange}
                inputRef={node => {
						this._inputs = this._inputs || {};
						this._inputs[index] = node;
					}}
              />
              {index !== 4 && '-'}
            </Fragment>
							))}
        </FormGroup>
        <Button
          variant="raised"
          label="Create Clipboard"
          color="primary"
          onClick={submit}
          disabled={disabled}
          ref={node => {
			  this._inputs[5] = node;
			}}
        >
							validate my email
        </Button>
        { attemptedValidation && <h6>Check entry</h6>}
      </FormGroup>
    </Grid>
  </Grid>
		);
	}
}

const onFieldChange = ({ validationSecret, validationError }) => event => {
	const prevSecret = validationSecret;
	const { dataset: data = {}, value = '' } = event.target;
	const section = parseInt(data.section, 10);
	let newFocus = section;
	// handle user input something
	const newSecret = [...prevSecret];
	newSecret[section] = value;
	// handle error (not number or lowercase)
	const length = parseInt(data.length, 10);
	const alphaNumOnly = /^[0-9a-z]*$/.test(value);
	const newValidationError = [...validationError];
	newValidationError[section] = value === '' ? false : length < value.length || !alphaNumOnly;
	// try to jump focus
	const prevSectionValue = prevSecret[section];
	const newSectionValue = newSecret[section];
	if (prevSectionValue !== '' && newSectionValue === '' && section !== 0) {
		newFocus = section - 1;
	} else if (newSectionValue.length === length && !newValidationError[section]) {
		newFocus = section + 1;
	}
	// see if user is ready
	const noError = newValidationError.every(acc => acc === false);
	const sercetFilled = newSecret.every(
		(secret, i) => secret.length === uuidSecretAttrs[i].length
	);
	const disabled = !noError || !sercetFilled;
	return {
		validationSecret: newSecret,
		validationError: newValidationError,
		focus: newFocus,
		disabled
	};
};

const onFocusChange = () => newFocus => ({ focus: newFocus });

const onValidationError = () => () => ({ attemptedValidation: true });

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
					validationSecret = [],
					match: { params: { email = '' } } = {}
				} = ownProps;
				mutate({ variables: { email, validationSecret: validationSecret.join('-') } })
					.then(() => {
						history.push('/login');
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
		({
			validationSecret = new Array(5).fill(''),
			validationError = new Array(5).fill('').map(() => false),
			disabled = true,
			focus = -1,
			attemptedValidation = false
		}) => ({
			validationSecret,
			validationError,
			disabled,
			focus,
			attemptedValidation
		}),
		{
			onFieldChange,
			onFocusChange,
			onValidationError
		}
	)
);

export default compose(withStyles(styles), withRouter, recomposeEnhancer, withValidateEmail)(
	ValidateEmail
);
