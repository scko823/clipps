/* eslint react/no-array-index-key: 0 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import FormGroup from 'material-ui/Form/FormGroup';

import { compose, withStateHandlers } from 'recompose';

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

export class UUIDInput extends Component {
	static propTypes = {
		validationSecret: PropTypes.arrayOf(PropTypes.string).isRequired,
		validationError: PropTypes.arrayOf(PropTypes.bool).isRequired,
		uuidAttrs: PropTypes.arrayOf(PropTypes.object),
		onFieldChange: PropTypes.func.isRequired,
		onFocusChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
		focus: PropTypes.number.isRequired,
		className: PropTypes.string
	};
	static defaultProps = {
		uuidAttrs: uuidSecretAttrs,
		className: ''
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
			className,
			uuidAttrs,
			validationSecret,
			validationError,
			onFieldChange,
			onBlur
		} = this.props;
		return (
  <FormGroup className={className}>
    {uuidAttrs.map((attr, index) => (
      <Fragment>
        <TextField
          key={index}
          onBlur={onBlur}
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
	const uuidIncomplete = !noError || !sercetFilled;
	return {
		validationSecret: newSecret,
		validationError: newValidationError,
		focus: newFocus,
		uuidIncomplete
	};
};

const onFocusChange = () => newFocus => ({ focus: newFocus });
const onBlur = ({ validationError }) => ({ target }) => {
	const { dataset: data = {}, value } = target;
	const section = parseInt(data.section, 10);
	// handle error (not number or lowercase)
	const length = parseInt(data.length, 10);
	const alphaNumOnly = /^[0-9a-z]*$/.test(value);
	const newValidationError = [...validationError];
	newValidationError[section] = length !== value.length || !alphaNumOnly;
	return {
		validationError: newValidationError
	};
};

export const uuidInputEnhancer = compose(
	withStateHandlers(
		({
			uuidIncomplete = true,
			validationSecret = new Array(5).fill(''),
			validationError = new Array(5).fill('').map(() => false),
			focus = -1
		}) => ({
			uuidIncomplete,
			validationSecret,
			validationError,
			focus
		}),
		{
			onFieldChange,
			onFocusChange,
			onBlur
		}
	)
);
