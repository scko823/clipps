import React from 'react'
import PropTypes from 'prop-types'

// recompose
import { compose, withStateHandlers } from 'recompose'

// GraphQL
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import clipsQuery from '../../../graphql/queries/clips'

import Snippet from '../Clips/Snippet'
import FAB from './FAB'
import AddClipDialog from './AddClipDialog'

const ClipboardView = ({
	match: { params: { clipboardName } },
	clips,
	loading,
	toggleAddClipDialog,
	showAddClipDialog,
}) => {
	if (loading) {
		return <h4>loading!!!</h4>
	}
	return (
  <div>
    <FAB onClick={toggleAddClipDialog} />
    <AddClipDialog
      clipboardName={clipboardName}
      toggleShowDialog={toggleAddClipDialog}
      showDialog={showAddClipDialog}
    />
    {clips.map(clip => <Snippet key={clip.id} clip={clip} />)}
  </div>
	)
}

ClipboardView.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string,
		url: PropTypes.string,
		isExact: PropTypes.bool,
		params: PropTypes.object,
	}).isRequired,
	toggleAddClipDialog: PropTypes.func.isRequired,
	clips: PropTypes.object.isRequired,
	loading: PropTypes.bool,
	showAddClipDialog: PropTypes.bool,
}

ClipboardView.defaultProps = {
	loading: true,
	showAddClipDialog: false,
}

const withclipsQuery = graphql(
	gql`
    ${clipsQuery}
`,
	{
		name: 'clips',
		options: ({ match: { params: { clipboardName } } }) => ({
			variables: { clipboardName },
		}),
		props: ({ ownProps, clips }) => ({
			...ownProps,
			loading: clips.loading,
			clips: clips.allClips || [],
			error: clips.error,
			refetch: clips.refetch,
		}),
	},
)

const recomposeEnhancer = compose(
	withStateHandlers(
		({ showAddClipDialog = false }) => ({ showAddClipDialog }),
		{
			toggleAddClipDialog: ({ showAddClipDialog }) => () => ({
				showAddClipDialog: !showAddClipDialog,
			}),
		},
	),
)

const enhancer = compose(withclipsQuery, recomposeEnhancer)

export default enhancer(ClipboardView)
