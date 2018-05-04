// @flow
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';

// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import clipByBoardAndClipNameQuery from '../../../graphql/queries/clipByBoardAndClipName';

import { withCopyEnhancer, Snippet, styles as snippetStyles } from './Snippet';

const clipViewStyles = theme => ({
	...snippetStyles(theme),
	root: {
		...snippetStyles(theme).root,
		width: '95%'
	}
});

const withClipQuery = graphql(
	gql`
		${clipByBoardAndClipNameQuery}
	`,
	{
		options: ({
			match: {
				params: { clipboardName, clipName }
			}
		}) => ({
			variables: { clipboardName, clipName }
		}),
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

export default compose(withStyles(clipViewStyles), withCopyEnhancer, withClipQuery)(Snippet);
