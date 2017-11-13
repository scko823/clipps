// eslint-disable
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

// GraphQL
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import createClipMutation from '../../../graphql/mutations/createClip'

const AddClipDialog = ({
	submit,
	toggleShowDialog,
	showDialog,
	clipboardName,
	onContentFieldChange,
	onNameFieldChange,
	formState: { name, content },
}) => (
  <Dialog onRequestClose={toggleShowDialog} open={showDialog} fullWidth>
    <DialogTitle>New Clip</DialogTitle>
    <DialogContent>
      <DialogContentText>Add a new clip to {clipboardName}</DialogContentText>
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
        <Button disabled={!name || !content} onClick={submit} color="primary">
					Create
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
)

AddClipDialog.propTypes = {
	submit: PropTypes.func.isRequired,
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

const withCreateClip = graphql(gql`${createClipMutation}`, {
	props: ({ ownProps, mutate }) => {
		const { clipboardId, formState: { content, name } } = ownProps
		return {
			submit: () =>
				mutate({
					variables: {
						content,
						name,
						clipboardId,
					},
				}),
		}
	},
})

const enhancer = compose(recomposeEnhancer, withCreateClip)
export default enhancer(AddClipDialog)
