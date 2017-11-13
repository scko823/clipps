/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import Dialog, { DialogTitle } from 'material-ui/Dialog'

class AddClipDialog extends React.Component {
	render() {
		const { toggleShowDialog, showDialog } = this.props
		return (
			<Dialog onRequestClose={toggleShowDialog} open={showDialog}>
				<DialogTitle>Add New Clip</DialogTitle>
			</Dialog>
		)
	}
}

AddClipDialog.propTypes = {
	toggleShowDialog: PropTypes.func.isRequired,
	showDialog: PropTypes.bool.isRequired,
}

export default AddClipDialog
