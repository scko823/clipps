import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import Paper from 'material-ui/Paper';
import ContentCopy from 'material-ui-icons/ContentCopy';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

// react hightlight
import HighLight from 'react-highlight';

const style = () => ({
	root: {
		width: 400,
		margin: 20,
		textAlign: 'center',
		display: 'inline-block',
		verticalAlign: 'top',
	},
	subheader: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '9.5px 3px',
		textOverflow: 'ellipsis',
	},
	icon: {
		color: '#27bc9c',
		'&:hover': {
			cursor: 'pointer',
		},
	},
});

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
		const { clip, classes } = this.props;
		return (
  <Paper className={classes.root} zdepth={3}>
    <div className={classes.subheader}>
      <Typography type="headline" component="h2">
        {'some name'}
      </Typography>
      <ContentCopy onClick={this.onClick} tooltip="Copy" className={classes.icon} />
    </div>
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
	classes: PropTypes.object.isRequired,
};
export default withStyles(style)(Snippet);
