// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import Paper from 'material-ui/Paper';
import ContentCopy from '@material-ui/icons/ContentCopy';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

// react hightlight
import HighLight from 'react-highlight';

// recompose
import { compose, mapProps } from 'recompose';

// date-fns
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

export const styles = (theme: Object) => ({
	root: {
		width: '100%',
		margin: `${theme.spacing.unit * 1.5}px ${theme.spacing.unit * 1.5}px`,
		padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
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
	},
	metaData: {
		margin: `${theme.spacing.unit * 1.5}px 0`
	}
});

export const Snippet = (props: SnippetPropType) => {
	const {
		clip: {
			name = '',
			content = '',
			createdAt = '',
			owner: { firstName = '', lastName = '' } = {}
		},
		classes,
		copyContent,
		clipboardName
	} = props;
	return (
  <Grid container justify="center">
    <Paper className={classes.root} zdepth={3}>
      <div className={classes.subheader}>
        <Typography type="headline" component="h2">
          <Link to={`/${clipboardName}/${name}`}>{name}</Link>
        </Typography>
        <ContentCopy onClick={copyContent} tooltip="Copy" className={classes.icon} />
      </div>
      <HighLight className="code">{content}</HighLight>
      <Grid container justify="space-between" className={classes.metaData}>
        <Grid item>
          <Typography align="left" component="h3">
            {firstName && lastName && <div>By: {`${firstName} ${lastName}`}</div>}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="right" component="h3">
            {createdAt && (
            <div>
									created{' '}
              {`${distanceInWordsToNow(createdAt, { addSuffix: true })}`}
            </div>
							)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
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

export default compose(withStyles(styles), recomposeEnhancer)(Snippet);
