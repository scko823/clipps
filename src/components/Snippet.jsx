import React from 'react';
import PropTypes from 'prop-types';
import HighLight from 'react-highlight';
import Paper from 'material-ui/Paper';
import ContentCopy from 'material-ui-icons/ContentCopy';

import Typography from 'material-ui/Typography';

const style = {
	width: 400,
	margin: 20,
	textAlign: 'center',
	display: 'inline-block',
	verticalAlign: 'top',
	icon: {
		color: '#27bc9c',
	},
};

class Snippet extends React.Component {
	onClick = e => {
		e.preventDefault();
		const { content } = this.props.clip;

		const text = document.createElement('textarea');
		text.innerText = content;
		document.body.appendChild(text);
		text.select();

		document.execCommand('Copy');
		text.remove();
	};

	render() {
		const { clip } = this.props;
		return (
  <Paper style={style} zdepth={3}>
    <div style={{ display: 'flex' }}>
      <Typography type="headline" component="h3">
        {'some name'}
      </Typography>
      <ContentCopy onClick={this.onClick} tooltip="Copy" />
    </div>
    <br />
    <br />
    <HighLight
      ref={c => {
						this._textNode = c;
					}}
      className="code"
    >
      {clip.content}
    </HighLight>
  </Paper>
		);
	}
}

Snippet.propTypes = {
	clip: PropTypes.shape({
		content: PropTypes.string.isRequired,
	}).isRequired,
};
export default Snippet;
