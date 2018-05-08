import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// material-ui
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

// recompose
import { withStateHandlers, compose } from 'recompose';

import { styles as progressStyles } from '../Clipboards/AddClipDialog';

const styles = theme => ({
	...progressStyles(theme)
});

const ClipComments = ({
	onCommentChange,
	allComments,
	clip,
	comment,
	submitCommnet,
	classes,
	submitting
}) => (
  <Fragment>
    <pre>{JSON.stringify(allComments, null, 4)}</pre>
    <pre>{JSON.stringify(clip, null, 4)}</pre>
    {!clip || !clip.id ? null : (
      <form noValidate autoComplete="off">
        <TextField
          multiline
          fullWidth
          margin="dense"
          id="comment-content"
          label="comments"
          inputProps={{ type: 'textarea' }}
          onChange={onCommentChange}
          rows="3"
        />
        <div className={classes.progressWrapper}>
          <Button
            variant="raised"
            disabled={!comment}
            onClick={submitCommnet}
            color="primary"
          >
						Submit Comment
          </Button>
          {submitting && (
          <CircularProgress className={classes.progress} style={{ left: '50%' }} />
					)}
        </div>
      </form>
		)}
  </Fragment>
);

ClipComments.propTypes = {
	clip: PropTypes.object.isRequired,
	allComments: PropTypes.arrayOf(PropTypes.object).isRequired,
	onCommentChange: PropTypes.func.isRequired,
	comment: PropTypes.string.isRequired,
	submitCommnet: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired
};

const recomposeEnhancer = compose(
	withStateHandlers(({ comment = '', submitting = false }) => ({ comment, submitting }), {
		onCommentChange: () => ({ target }) => ({
			comment: target.value
		})
	})
);
export default compose(recomposeEnhancer, withStyles(styles))(ClipComments);
