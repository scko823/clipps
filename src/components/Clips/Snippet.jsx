// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import Paper from 'material-ui/Paper';
import ContentCopy from 'material-ui-icons/ContentCopy';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

// react hightlight
import HighLight from 'react-highlight';

import { compose, mapProps } from 'recompose';

export const snippetStyles = {
	root: {
		width: 400,
		margin: 20,
		textAlign: 'center',
		display: 'inline-block',
		verticalAlign: 'top',
		'@media (max-width: 600px) and (min-width: 300px)': {
			width: '95%',
			marginLeft: '2.5%',
			marginRight: '2.5%'
		},
		'& .code': {
			textAlign: 'left'
		}
	},
	subheader: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '9.5px 3px',
		textOverflow: 'ellipsis'
	},
	icon: {
		color: '#27bc9c',
		'&:hover': {
			cursor: 'pointer'
		}
	}
};

const stlyes = () => snippetStyles;

export const Snippet = (props: SnippetPropType) => {
	const {
		clip: { name, content, owner: { firstName = '', lastName = '' } = {} },
		classes,
		copyContent,
		clipboardName
	} = props;
	return (
  <Paper className={classes.root} zdepth={3}>
    <div className={classes.subheader}>
      <Typography type="headline" component="h2">
        <Link to={`/${clipboardName}/${name}`}>{name}</Link>
      </Typography>
      <ContentCopy onClick={copyContent} tooltip="Copy" className={classes.icon} />
    </div>
    <HighLight className="code">{content}</HighLight>
    <Typography align="left" component="h3">
      <div>By: {`${firstName} ${lastName}`}</div>
    </Typography>
  </Paper>
	);
};

Snippet.propTypes = {
	clip: PropTypes.shape({
		content: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		owner: PropTypes.shape({
			firstName: PropTypes.string.isRequired,
			lastName: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	classes: PropTypes.object.isRequired,
	copyContent: PropTypes.func.isRequired,
	clipboardName: PropTypes.string.isRequired
};

const recomposeEnhancer = compose(
	mapProps(props => ({
		...props,
		copyContent: (e: SyntheticMouseEvent<*>) => {
			e.preventDefault();
			const { content } = props.clip;
			const text: HTMLTextAreaElement = document.createElement('textarea');
			text.innerText = content;
			// $FlowFixMe
			document.body.appendChild(text);
			text.select();
			document.execCommand('Copy');
			text.remove();
		}
	}))
);

export const withCopyEnhancer = recomposeEnhancer;

export default compose(withStyles(stlyes), recomposeEnhancer)(Snippet);
