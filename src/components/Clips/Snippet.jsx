import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Paper from 'material-ui/Paper'
import ContentCopy from 'material-ui-icons/ContentCopy'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

// react hightlight
import HighLight from 'react-highlight'

import { compose, mapProps } from 'recompose'

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
})

const Snippet = ({ clip: { name, content }, classes, copyContent }) => (
  <Paper className={classes.root} zdepth={3}>
    <div className={classes.subheader}>
      <Typography type="headline" component="h2">
        {name}
      </Typography>
      <ContentCopy
        onClick={copyContent}
        tooltip="Copy"
        className={classes.icon}
      />
    </div>
    <HighLight className="code">{content}</HighLight>
  </Paper>
)

Snippet.propTypes = {
	clip: PropTypes.shape({
		content: PropTypes.string.isRequired,
	}).isRequired,
	classes: PropTypes.object.isRequired,
	copyContent: PropTypes.func.isRequired,
}

const recomposeEnhancer = compose(
	mapProps(props => ({
		...props,
		copyContent: e => {
			e.preventDefault()
			const { content } = props.clip
			const text = document.createElement('textarea')
			text.innerText = content
			document.body.appendChild(text)
			text.select()
			document.execCommand('Copy')
			text.remove()
		},
	})),
)
export default compose(withStyles(style), recomposeEnhancer)(Snippet)