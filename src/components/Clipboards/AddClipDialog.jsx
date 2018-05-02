import React from 'react';
import PropTypes from 'prop-types';
// material-ui
import { lightGreen } from 'material-ui/colors';

import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

// recompse
import { compose, withStateHandlers } from 'recompose';

// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import createClipMutation from '../../../graphql/mutations/createClip';

const styles = {
	progressWrapper: {
		position: 'relative'
	},
	progress: {
		color: lightGreen['500'],
		position: 'absolute',
		left: '25%',
		marginTop: '-3px',
		zIndex: 1
	}
};

const AddClipDialog = ({
	submit,
	classes,
	loading,
	showLoadingSpinner,
	toggleShowDialog,
	showDialog,
	clipboardName,
	onContentFieldChange,
	onNameFieldChange,
	formState: { name, content }
}) => {
	const submitHandle = () => {
		showLoadingSpinner();
		submit();
	};
	return (
  <Dialog onRequestClose={toggleShowDialog} open={showDialog} fullWidth>
    <DialogTitle>New Clip</DialogTitle>
    <DialogContent>
      <DialogContentText>Add a new clip to {clipboardName}</DialogContentText>
      <form noValidate autoComplete="off">
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="clip name"
          onChange={onNameFieldChange}
          fullWidth
        />
        <TextField
          multiline
          fullWidth
          margin="dense"
          id="content"
          label="clip content"
          inputProps={{ type: 'textarea' }}
          onChange={onContentFieldChange}
          rows="4"
        />
        <DialogActions>
          <Button onClick={toggleShowDialog} color="accent">
							Cancel
          </Button>
          <div className={classes.progressWrapper}>
            <Button
              disabled={!name || !content || loading}
              onClick={submitHandle}
              color="primary"
            >
              {loading ? 'Loading' : 'Create'}
            </Button>
            {loading && <CircularProgress className={classes.progress} />}
          </div>
        </DialogActions>
      </form>
    </DialogContent>
  </Dialog>
	);
};

AddClipDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	submit: PropTypes.func.isRequired,
	toggleShowDialog: PropTypes.func.isRequired,
	onNameFieldChange: PropTypes.func.isRequired,
	onContentFieldChange: PropTypes.func.isRequired,
	showDialog: PropTypes.bool.isRequired,
	showLoadingSpinner: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	clipboardName: PropTypes.string.isRequired,
	formState: PropTypes.shape({
		name: PropTypes.string,
		content: PropTypes.string
	}).isRequired
};

const recomposeEnhancer = compose(
	withStateHandlers(
		({ loading = false, formState = { name: '', content: '' } }) => ({
			formState,
			loading
		}),
		{
			onNameFieldChange: ({ formState }) => ({ target: { value } }) => ({
				formState: {
					...formState,
					name: value
				}
			}),
			onContentFieldChange: ({ formState }) => ({ target: { value } }) => ({
				formState: {
					...formState,
					content: value
				}
			}),
			showLoadingSpinner: () => () => ({ loading: true }),
			hideLoadingSpinner: () => () => ({ loading: false })
		}
	)
);

const withCreateClip = graphql(
	gql`
		${createClipMutation}
	`,
	{
		props: ({ ownProps, mutate }) => {
			const {
				toggleShowDialog,
				hideLoadingSpinner,
				clipboardId,
				formState: { content, name }
			} = ownProps;
			return {
				submit: () =>
					mutate({
						variables: {
							content,
							name,
							clipboardId,
							user_id: localStorage.getItem('id')
						}
					})
						.then(hideLoadingSpinner)
						.then(toggleShowDialog)
						.catch(() => {
							// TODO: add something to indicate it fail to create
							hideLoadingSpinner();
						})
			};
		}
	}
);

const enhancer = compose(withStyles(styles), recomposeEnhancer, withCreateClip);

export default enhancer(AddClipDialog);
