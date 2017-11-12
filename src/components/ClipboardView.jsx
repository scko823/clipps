import React from 'react';
import PropTypes from 'prop-types';

// recompose
// import { compose } from 'recompose';

// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import clipsQuery from '../../graphql/queries/clips';

const ClipboardView = ({ clips }) => <pre>{JSON.stringify(clips, null, 4)}</pre>;

ClipboardView.propTypes = {
	// match: PropTypes.shape({
	// 	path: PropTypes.string,
	// 	url: PropTypes.string,
	// 	isExact: PropTypes.bool,
	// 	params: PropTypes.object,
	// }).isRequired,
	clips: PropTypes.object.isRequired,
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
			error: clips.error,
			refetch: clips.refetch,
		}),
	},
);

export default withclipsQuery(ClipboardView);
