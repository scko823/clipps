// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';

// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import clipByBoardAndClipNameQuery from '../../../graphql/queries/clipByBoardAndClipName';

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

const snippetPropsSelector = ({ clip, classes, copyContent, clipboardName }) => ({
	clip,
	classes,
	copyContent,
	clipboardName
});

const ClipView = props => {
	const snippetProps = snippetPropsSelector(props);
	const {
		clip,
		match: {
			params: { clipboardName, clipName }
		}
	} = props;
	return (
  <div className={props.classes.root}>
    <Snippet key="snippet" {...snippetProps} />
    <ClipComments
      key="clip-comments"
      clip={clip}
      clipboardName={clipboardName}
      clipName={clipName}
    />
  </div>
	);
};

ClipView.propTypes = {
	classes: PropTypes.object.isRequired,
	clip: PropTypes.object.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			clipboardName: PropTypes.string.isRequired,
			clipName: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
};

export default compose(withStyles(clipViewStyles), withCopyEnhancer, withClipQuery)(ClipView);
