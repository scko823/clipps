import React from 'react'
import PropTypes from 'prop-types'
// material-ui
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

// recompse
import { compose, withStateHandlers } from 'recompose'

class AddClipDialog extends React.Component {
	render() {
		const {
			toggleShowDialog,
			showDialog,
			clipboardName,
			onContentFieldChange,
			onNameFieldChange,
			formState: { name, content },
		} = this.props
		return (
  <Dialog onRequestClose={toggleShowDialog} open={showDialog} fullWidth>
    <DialogTitle>New Clip</DialogTitle>
    <DialogContent>
      <DialogContentText>
						Add a new clip to {clipboardName}
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="clip name"
        onChange={onNameFieldChange}
        fullWidth
      />
      <TextField
        margin="dense"
        id="content"
        label="clip content"
        inputProps={{ type: 'textarea' }}
        onChange={onContentFieldChange}
        multiline
        fullWidth
      />
      <DialogActions>
        <Button onClick={toggleShowDialog} color="secondary">
							Cancel
        </Button>
        <Button
          disabled={!name || !content}
          onClick={this.handleRequestClose}
          color="primary"
        >
							Create
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
		)
	}
}

AddClipDialog.propTypes = {
	toggleShowDialog: PropTypes.func.isRequired,
	onNameFieldChange: PropTypes.func.isRequired,
	onContentFieldChange: PropTypes.func.isRequired,
	showDialog: PropTypes.bool.isRequired,
	clipboardName: PropTypes.string.isRequired,
	formState: PropTypes.shape({
		name: PropTypes.string,
		content: PropTypes.string,
	}).isRequired,
}

const recomposeEnhancer = compose(
	withStateHandlers(
		({ formState = { name: '', content: '' } }) => ({
			formState,
		}),
		{
			onNameFieldChange: ({ formState }) => ({ target: { value } }) => ({
				formState: {
					...formState,
					name: value,
				},
			}),
			onContentFieldChange: ({ formState }) => ({ target: { value } }) => ({
				formState: {
					...formState,
					content: value,
				},
			}),
		},
	),
)

export default recomposeEnhancer(AddClipDialog)
