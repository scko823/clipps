/* eslint-disable */
import React from 'react'
import {
	Dialog,
	FlatButton,
	TextField,
	SelectField,
	MenuItem,
} from 'material-ui'

class PaperDialog extends React.Component {
	state = {
		form: {
			name: null,
			content: null,
		},
		error: {
			name: true,
			content: true,
		},
		showErrors: false,
	}

	onChange = (event, field) => {
		const val = event.currentTarget.value
		this.setState(({ form, error }) => ({
			form: {
				...form,
				[field]: val,
			},
			error: {
				...error,
				[field]: val === '' ? true : false,
			},
			showErrors: val === '' ? true : false,
		}))
	}

	onSubmit = () => {
		var arr = Object.values(this.state.error).reduce((a, b) => {
			return a && b
		})

		if (arr) {
			this.setState(() => ({
				showErrors: true,
			}))
		} else {
			// const formData = new FormData();
			// formData.append('data', new Blob([JSON.stringify(this.state)], { type: 'application/json' }));
			// formData.append('file', file);

			this.props.handleCreateBoard(this.state.form)
		}
	}
	renderForm = () => {
		const { handleCreateBoard } = this.props
		const { showErrors, error } = this.state
		return (
			<div className="dialogForm">
				<TextField
					style={{ width: '100%' }}
					hintText="Add Title"
					onChange={e => this.onChange(e, 'name')}
					errorText={showErrors && error.name ? 'Add a name to the clip' : ''}
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
					errorText={showErrors && error.content ? 'Please add content' : ''}
				/>
				<br />
			</div>
		)
	}
	render() {
		const { open, handleClose, handleCreateBoard } = this.props

		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.props.handleClose}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onClick={this.onSubmit}
			/>,
		]

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
		)
	}
}

export default PaperDialog
