// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';

// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import clipByBoardAndClipNameQuery from '../../../graphql/queries/clipByBoardAndClipName';
import getCommentsByBoardAndClipNameQuery from '../../../graphql/queries/getCommentsByBoardAndClipName';

import { withCopyEnhancer, Snippet, styles as snippetStyles } from './Snippet';
import ClipComments from './ClipComments';

const clipViewStyles = theme => ({
	...snippetStyles(theme),
	root: {
		...snippetStyles(theme).root,
		width: '95%'
	}
});

const extractVariablesFromRoutes = ({
	match: {
		params: { clipboardName, clipName }
	}
}) => ({
	variables: { clipboardName, clipName }
});

const withClipQuery = graphql(
	gql`
		${clipByBoardAndClipNameQuery}
	`,
	{
		options: extractVariablesFromRoutes,
		props: ({
			ownProps,
			data: { loading, allClips = [{ name: '', content: '' }], refetch }
		}) => ({
			...ownProps,
			clipboardName: ownProps.match.params.clipboardName,
			clip: allClips[0],
			loading,
			refetch
		})
	}
);

const withCommentsQuery = graphql(
	gql`
		${getCommentsByBoardAndClipNameQuery}
	`,
	{
		options: ({
			match: {
				params: { clipboardName, clipName }
			}
		}) => ({
			variables: { clipboardName, clipName, pageSize: 10, skip: 0 }
		}),
		props: ({ ownProps, data: { loading, allComments, fetchMore } }) => ({
			...ownProps,
			commentLoading: loading,
			allComments,
			fetchMoreComments: fetchMore
			// subscribeToMore
		})
	}
);

const snippetPropsSelector = ({ clip, classes, copyContent, clipboardName }) => ({
	clip,
	classes,
	copyContent,
	clipboardName
});

const clipCommentsPropsSelector = ({ allComments, clip }) => ({ allComments, clip });

const ClipView = props => {
	const snippetProps = snippetPropsSelector(props);
	const ClipCommentsProps = clipCommentsPropsSelector(props);
	return (
  <div className={props.classes.root}>
    <Snippet {...snippetProps} />
    <ClipComments {...ClipCommentsProps} />
  </div>
	);
};

ClipView.propTypes = {
	classes: PropTypes.object.isRequired
};

export default compose(
	withStyles(clipViewStyles),
	withCopyEnhancer,
	withClipQuery,
	withCommentsQuery
)(ClipView);
