import 'react-mde/lib/styles/css/react-mde-all.css';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

// recompose
import { withStateHandlers, withProps, compose } from 'recompose';

// material-ui
// import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { grey } from 'material-ui/colors';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

// editor and markdown preview
import ReactMarkdown from 'react-markdown';
import ReactMde, { ReactMdeTypes } from 'react-mde';
import Showdown from 'showdown';
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
		textAlign: 'left',
		margin: `${theme.spacing.unit * 1}px`,
		'&:first-child': {
			marginTop: '1rem'
		}
    },
    'comment-editor': {
        textAlign: 'left',
        margin: `${theme.spacing.unit * 2}px auto`
    },
	'comment-markdown-preview': {
        minHeight: '200px',
        margin: `${theme.spacing.unit * 1}px`,
	},
	'comments-metadata': {
		backgroundColor: grey[200],
		margin: '0',
		width: '100%'
	},
});

const ClipComments = ({
	onTabClick,
	activeTab,
	allComments = [],
	clip,
	mdeState,
	onMdeChange,
	converter,
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
            <Paper>
              <Tabs
                value={activeTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={onTabClick}
              >
                <Tab label="Comment" value="comment" />
                <Tab label="Preview" value="preview" />
              </Tabs>
              {activeTab === 'comment' && (
              <ReactMde
                className={classes['comment-editor']}
                layout="noPreview"
                onChange={onMdeChange}
                editorState={mdeState}
                generateMarkdownPreview={markdown =>
										Promise.resolve(converter.makeHtml(markdown))
									}
              />
							)}
              {activeTab === 'preview' && (
              <ReactMarkdown
                className={cx([
										classes['comment-editor'],
										classes['comment-markdown-preview']
									])}
                source={mdeState.markdown}
              />
							)}
            </Paper>

            <div className={classes.progressWrapper}>
              <Button
                variant="raised"
                disabled={!mdeState.markdown}
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
    mdeState: ReactMdeTypes.MdeState.isRequired, // eslint-disable-line react/no-typos
	onMdeChange: PropTypes.func.isRequired,
	onTabClick: PropTypes.func.isRequired,
	activeTab: PropTypes.string.isRequired,
	submitCommnet: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	converter: PropTypes.objectOf({
		makeHtml: PropTypes.func.isRequired
	}).isRequired
};

const recomposeEnhancer = compose(
	withProps({
		converter: new Showdown.Converter({
			tables: true,
			simplifiedAutoLink: true,
			strikethrough: true,
			tasklists: true
		})
	}),
	withStateHandlers(
		({ mdeState = {markdown: ''}, submitting = false, activeTab = 'comment' }) => ({
			submitting,
			activeTab,
			mdeState
		}),
		{
			onTabClick: () => (_, value) => ({
				activeTab: value
			}),
			onMdeChange: () => mdeState => ({
				mdeState
			})
		}
	)
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
                const { clip: { id: clipId } = {}, mdeState: { markdown } } = ownProps;
                mutate({ variables: { authorId, clipId, content: markdown } });
			}
		})
	}
);
export default compose(withStyles(styles), recomposeEnhancer, withCreateCommentMutation)(
	ClipComments
);
