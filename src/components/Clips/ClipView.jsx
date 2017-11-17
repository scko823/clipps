// import React from 'react'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'

// GraphQL
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import clipByBoardAndClipNameQuery from '../../../graphql/queries/clipByBoardAndClipName'

import { withCopyEnhancer, Snippet, snippetStyles } from './Snippet'

const clipViewStyles = () => ({
	...snippetStyles,
	root: {
		...snippetStyles.root,
		width: '100%',
		margin: '0',
	},
})

const withClipQuery = graphql(gql`${clipByBoardAndClipNameQuery}`, {
	options: ({ match: { params: { clipboardName, clipName } } }) => ({
		variables: { clipboardName, clipName },
	}),
	props: ({
		ownProps,
		data: { loading, allClips = [{ name: '', content: '' }], refetch },
	}) => ({
		...ownProps,
		clipboardName: ownProps.match.params.clipboardName,
		clip: allClips[0],
		loading,
		refetch,
	}),
})

export default compose(
	withStyles(clipViewStyles),
	withCopyEnhancer,
	withClipQuery,
)(Snippet)
