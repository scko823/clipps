import React from 'react';
import HighLight from 'react-highlight';
import { messages } from './mockData';
import { Paper, Subheader, IconButton } from 'material-ui';
import Snippet from './Snippet';

class PaperClips extends React.Component {
	renderPapers = () => {
		return messages
			.map((message, i) => {
				return Object.assign({}, message, { id: `a${i}` });
			})
			.map(message => {
				return <Snippet message={message} />;
			});
	};
	render() {
		return <div>{this.renderPapers()}</div>;
	}
}

export default PaperClips;
