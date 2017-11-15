import React from 'react';
import PropTypes from 'prop-types';

// recompose
import { compose, withStateHandlers, lifecycle } from 'recompose';

// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import clipsQuery from '../../../graphql/queries/clips';
import clipsSubscription from '../../../graphql/subscriptions/clips';

import Snippet from '../Clips/Snippet';
import FAB from './FAB';
import AddClipDialog from './AddClipDialog';

const ClipboardView = ({
	match: { params: { clipboardName } },
	clips,
	loading,
	toggleAddClipDialog,
	showAddClipDialog,
	clipboardId,
}) => {
	if (loading) {
		return <h4>loading!!!</h4>;
	}
	return (
  <div>
    <FAB onClick={toggleAddClipDialog} />
    <AddClipDialog
      clipboardId={clipboardId}
      clipboardName={clipboardName}
      toggleShowDialog={toggleAddClipDialog}
      showDialog={showAddClipDialog}
    />
    {clips.map(clip => <Snippet key={clip.id} clip={clip} />)}
  </div>
	);
};

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
	clipboardId: PropTypes.string,
};

ClipboardView.defaultProps = {
	loading: true,
	showAddClipDialog: false,
	clipboardId: '',
};

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
			clipboardId: (clips.Clipboard && clips.Clipboard.id) || '',
			subscribeToMore: params =>
				clips.subscribeToMore({
					document: gql`${clipsSubscription}`,
					variables: { clipboardId: params.clipboardId },
					updateQuery: (
						{ allClips },
						{ subscriptionData: { Clip: { mutation, node } } },
					) => {
						if (mutation === 'CREATED') {
							return {
								allClips: [node, ...allClips],
							};
						}
						return {
							allClips,
						};
					},
				}),
			error: clips.error,
			refetch: clips.refetch,
		}),
	},
);

const recomposeEnhancer = compose(
	withStateHandlers(({ showAddClipDialog = false }) => ({ showAddClipDialog }), {
		toggleAddClipDialog: ({ showAddClipDialog }) => () => ({
			showAddClipDialog: !showAddClipDialog,
		}),
	}),
	lifecycle({
		componentDidUpdate(prevProps) {
			if (
				!prevProps.clipboardId &&
				this.props.clipboardId &&
				prevProps.clipboardId !== this.props.clipboardId
			) {
				this.props.subscribeToMore({ clipboardId: this.props.clipboardId });
			}
		},
	}),
);

const enhancer = compose(withclipsQuery, recomposeEnhancer);

export default enhancer(ClipboardView);