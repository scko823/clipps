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
	sercet: {
		'flex-grow': 0.8,
		'flex-direction': 'row',
		justifyContent: 'center',
		margin: `${theme.spacing.unit * 2}px 0`,
		'&>div': {
			margin: `0 ${theme.spacing.unit}px`
		}
	}
});

class ValidateEmail extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		validationSecret: PropTypes.arrayOf(PropTypes.string).isRequired,
		validationError: PropTypes.arrayOf(PropTypes.bool).isRequired,
		submit: PropTypes.func.isRequired,
		disabled: PropTypes.bool.isRequired,
		onFieldChange: PropTypes.func.isRequired,
		onFocusChange: PropTypes.func.isRequired,
		focus: PropTypes.number.isRequired
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
			onFieldChange,
			validationError
		} = this.props;
		return (
  <Grid className={classes.root} container>
    <Grid container item xs={12} justify="center">
      <FormGroup className={classes.form}>
        <FormGroup className={classes.sercet}>
          <TextField
            autoFocus
            value={validationSecret[0]}
            error={validationError[0]}
            inputProps={{ 'data-section': 0, 'data-length': 8 }}
            onChange={onFieldChange}
            inputRef={node => {
									this._inputs = this._inputs || {};
									this._inputs[0] = node;
								}}
          />
          {'-'}
          <TextField
            value={validationSecret[1]}
            error={validationError[1]}
            inputProps={{ 'data-section': 1, 'data-length': 4 }}
            onChange={onFieldChange}
            inputRef={node => {
									this._inputs = this._inputs || {};
									this._inputs[1] = node;
								}}
          />
          {'-'}
          <TextField
            value={validationSecret[2]}
            error={validationError[2]}
            inputProps={{ 'data-section': 2, 'data-length': 4 }}
            onChange={onFieldChange}
            inputRef={node => {
									this._inputs = this._inputs || {};
									this._inputs[2] = node;
								}}
          />
          {'-'}
          <TextField
            value={validationSecret[3]}
            error={validationError[3]}
            inputProps={{ 'data-section': 3, 'data-length': 4 }}
            onChange={onFieldChange}
            inputRef={node => {
									this._inputs = this._inputs || {};
									this._inputs[3] = node;
								}}
          />
          {'-'}
          <TextField
            value={validationSecret[4]}
            error={validationError[4]}
            inputProps={{ 'data-section': 4, 'data-length': 12 }}
            onChange={onFieldChange}
            inputRef={node => {
									this._inputs = this._inputs || {};
									this._inputs[4] = node;
								}}
          />
        </FormGroup>
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
	const alphaNumOnly = /^[0-9a-z]$/g.test(value);
	const newValidationError = [...validationError];
	newValidationError[section] = value === '' ? false : length < value.length || !alphaNumOnly;
	// try to jump focus
	const prevSectionValue = prevSecret[section];
	const newSectionValue = newSecret[section];
	if (prevSectionValue !== '' && newSectionValue === '' && section !== 0) {
		newFocus = section - 1;
	} else if (newSectionValue.length === length && !newValidationError[section] && section !== 4) {
		newFocus = section + 1;
	}
	return { validationSecret: newSecret, validationError: newValidationError, focus: newFocus };
};

const onFocusChange = () => newFocus => ({ focus: newFocus });
const recomposeEnhancer = compose(
	withStateHandlers(
		({
			validationSecret = new Array(5).fill(''),
			validationError = new Array(5).fill('').map(() => false),
			disabled = true,
			focus = -1
		}) => ({
			validationSecret,
			validationError,
			disabled,
			focus
		}),
		{
			onFieldChange,
			onFocusChange
		}
	)
);

export default compose(withStyles(styles), withRouter, recomposeEnhancer)(ValidateEmail);
