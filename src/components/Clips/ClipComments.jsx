import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// recompose
import { withStateHandlers, compose } from 'recompose';

// material-ui
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { grey } from 'material-ui/colors';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

import ReactMarkdown from 'react-markdown';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import createCommentMutation from '../../../graphql/mutations/createComment';

import { styles as progressStyles } from '../Clipboards/AddClipDialog';

const styles = theme => ({
	...progressStyles(theme),
	comment: {
		width: '70%',
		margin: `${theme.spacing.unit * 2}px auto`,
		border: `1px solid ${grey[500]}`,
		borderRadius: '3px'
	},
	'comment-markdown': {
		'&:first-child': {
			marginTop: '1rem'
		}
	},
	'comments-metadata': {
		backgroundColor: grey[200],
		margin: '0',
		width: '100%'
	}
});

const ClipComments = ({
	onCommentChange,
	allComments = [],
	clip,
	comment,
	submitCommnet,
	classes,
	submitting
}) => (
  <Fragment>
    <Grid container direction="column" wrap="wrap" justify="center">
      {allComments.map(c => (
        <Grid container direction="column" wrap="wrap" className={classes.comment}>
          {' '}
          <ReactMarkdown className={classes['comment-markdown']} source={c.content} />
          <Grid
            container
            direction="row"
            wrap="wrap"
            justify="center"
            spacing={16}
            className={classes['comments-metadata']}
          >
            <Grid item>
              {' '}
              {`${c.author.firstName} ${c.author.lastName} commented
              ${distanceInWordsToNow(c.createdAt, {
					addSuffix: true
				})}`}{' '}
              {c.createdAt !== c.updatedAt && (
              <span style={{ color: grey[500] }}>(edited)</span>
							)}
            </Grid>
          </Grid>
        </Grid>
			))}
    </Grid>

    {!clip || !clip.id ? null : (
      <Grid container direction="row" wrap="wrap" justify="center">
        <Grid item xs={9}>
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
              <CircularProgress
                className={classes.progress}
                style={{ left: '50%' }}
              />
							)}
            </div>
          </form>
        </Grid>
      </Grid>
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

const withCreateCommentMutation = graphql(
	gql`
		${createCommentMutation}
	`,
	{
		props: ({ ownProps, mutate }) => ({
			...ownProps,
			submitCommnet: () => {
				const authorId = localStorage.getItem('id');
				const { clip: { id: clipId } = {}, comment } = ownProps;
				mutate({ variables: { authorId, clipId, content: comment } });
			}
		})
	}
);
export default compose(withStyles(styles), recomposeEnhancer, withCreateCommentMutation)(
	ClipComments
);
