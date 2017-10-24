import React from 'react';
import { Dialog, FlatButton, TextField, SelectField, MenuItem } from 'material-ui';

class PaperDialog extends React.Component {
	state = {
		form: {
			title: null,
			content: null,
			code: 1
		}
	};

	onChange = (event, field) => {
		const val = event.currentTarget.value;
		this.setState({
			form: {
				...this.state.form,
				[field]: val
			}
		});
	};

	handleChange = (event, index, value) => this.setState({ code: value });
	renderForm = () => {
		const { type } = this.props;
		return (
			<div className="dialogForm">
				<TextField
					style={{ width: '100%' }}
					hintText="Add Title"
					onChange={e => this.onChange(e, 'title')}
				/>
				<br />
				<br />
				<TextField
					hintText="Message Field"
					floatingLabelText="Message Field"
					multiLine={true}
					rows={5}
					style={{ width: '100%' }}
					onChange={e => this.onChange(e, 'content')}
				/>
				<br />
			</div>
		);
	};
	render() {
		const actions = [
			<FlatButton label="Cancel" primary={true} onClick={this.props.handleClose} />,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onClick={this.props.handleClose}
			/>
		];

		const { type, open, handleClose } = this.props;

		return (
			<Dialog
				title="Add New Clip"
				actions={actions}
				modal={true}
				open={open}
				onRequestClose={handleClose}
			>
				{this.renderForm()}
			</Dialog>
		);
	}
}

export default PaperDialog;
