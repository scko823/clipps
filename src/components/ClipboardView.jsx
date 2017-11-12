import React from 'react';
import PropTypes from 'prop-types';

const ClipboardView = ({ match }) => <pre>{JSON.stringify(match, null, 4)}</pre>;

ClipboardView.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string,
		url: PropTypes.string,
		isExact: PropTypes.bool,
		params: PropTypes.object,
	}).isRequired,
};

export default ClipboardView;
