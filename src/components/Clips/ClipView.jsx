// import React from 'react'
import { withStyles } from 'material-ui/styles'
// import { compose } from 'recompose'
import { withCopySnippet, snippetStyles } from './Snippet'

const clipViewStyles = () => ({
	...snippetStyles,
	root: {
		...snippetStyles.root,
		width: '100%',
		margin: '0',
	},
})

export default withStyles(clipViewStyles)(withCopySnippet)
