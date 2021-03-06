import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import Grid from 'material-ui/Grid';
// recompose
import { compose, withStateHandlers, lifecycle, toClass } from 'recompose';

// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import clipsQuery from '../../../graphql/queries/clips';
import clipsSubscription from '../../../graphql/subscriptions/clips';

import SnippetCard from '../Clips/Snippet';
import FAB from './FAB';
import AddClipDialog from './AddClipDialog';

const ClipboardView = ({
	match: {
		params: { clipboardName }
	},
	clips,
	loading,
	toggleAddClipDialog,
	showAddClipDialog,
	clipboardId
}) => {
	if (loading) {
		return <h4>loading!!!</h4>;
	}
	return (
  <div>
    <AddClipDialog
      clipboardId={clipboardId}
      clipboardName={clipboardName}
      toggleShowDialog={toggleAddClipDialog}
      showDialog={showAddClipDialog}
    />
    <Grid container direction="row" wrap="wrap">
      {clips.map(clip => (
        <Grid item xs={4}>
          <SnippetCard clipboardName={clipboardName} key={clip.id} clip={clip} />
        </Grid>
				))}
    </Grid>
    <br />
    <FAB onClick={toggleAddClipDialog} />
  </div>
	);
};

ClipboardView.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string,
		url: PropTypes.string,
		isExact: PropTypes.bool,
		params: PropTypes.object
	}).isRequired,
	toggleAddClipDialog: PropTypes.func.isRequired,
	clips: PropTypes.object.isRequired,
	loading: PropTypes.bool,
	showAddClipDialog: PropTypes.bool,
	clipboardId: PropTypes.string
};

ClipboardView.defaultProps = {
	loading: true,
	showAddClipDialog: false,
	clipboardId: ''
};

const withClipQuery = graphql(
	gql`
		${clipsQuery}
	`,
	{
		name: 'clips',
		options: ({
			match: {
				params: { clipboardName }
			}
		}) => ({
			variables: { clipboardName }
		}),
		props: ({ ownProps, clips }) => ({
			...ownProps,
			loading: clips.loading,
			clips: clips.allClips || [],
			clipboardId: (clips.Clipboard && clips.Clipboard.id) || null,
			subscribeToMore: params =>
				clips.subscribeToMore({
					document: gql`
						${clipsSubscription}
					`,
					variables: { clipboardId: params.clipboardId },
					updateQuery: (
						{ allClips, Clipboard },
						{
							subscriptionData: {
								data: {
									Clip: { mutation, node }
								}
							}
						}
					) => {
						if (mutation === 'CREATED') {
							return {
								allClips: [node, ...allClips],
								Clipboard
							};
						}
						return {
							allClips,
							Clipboard
						};
					}
				}),
			error: clips.error,
			refetch: clips.refetch
		})
	}
);

const recomposeEnhancer = compose(
	withStateHandlers(({ showAddClipDialog = false }) => ({ showAddClipDialog }), {
		toggleAddClipDialog: ({ showAddClipDialog }) => () => ({
			showAddClipDialog: !showAddClipDialog
		})
	}),
	lifecycle({
		componentDidUpdate(prevProps) {
			if (this.props.clipboardId === null && !this.props.loading) {
				this.props.history.push('/boards/NOW');
			}
			if (prevProps.clipboardId !== this.props.clipboardId) {
				if (typeof this.unsubscribe === 'function') {
					this.unsubscribe();
				}
				this.unsubscribe = this.props.subscribeToMore({
					clipboardId: this.props.clipboardId
				});
			}
        },
        componentWillUnmount() {
            if (typeof this.unsubscribe === 'function') {
                this.unsubscribe();
            }
        }
	}),
	toClass
);

const enhancer = compose(withClipQuery, recomposeEnhancer);

export default enhancer(ClipboardView);
