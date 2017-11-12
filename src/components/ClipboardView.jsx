import React from 'react';
import PropTypes from 'prop-types';

// recompose
// import { compose } from 'recompose';

// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import clipsQuery from '../../graphql/queries/clips';

import Snippet from './Snippet';

const ClipboardView = ({ clips, loading }) => {
	if (loading) {
		return <h4>loading!!!</h4>;
	}
	return clips.map(clip => <Snippet key={clip.id} clip={clip} />);
};

ClipboardView.propTypes = {
	// match: PropTypes.shape({
	// 	path: PropTypes.string,
	// 	url: PropTypes.string,
	// 	isExact: PropTypes.bool,
	// 	params: PropTypes.object,
	// }).isRequired,
	clips: PropTypes.object.isRequired,
	loading: PropTypes.bool,
};

ClipboardView.defaultProps = {
	loading: true,
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
