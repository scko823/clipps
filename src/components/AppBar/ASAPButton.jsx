import React from 'react'
import PropTypes from 'prop-types'

import MD5 from 'md5.js'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Popover from 'material-ui/Popover'
import { withStyles } from 'material-ui/styles'

import { random as randomStarWars } from 'startwars-name'
import { withStateHandlers } from 'recompose'

const randomClipName = () =>
	`${randomStarWars()
		.split(/\s+/)
		.join('-')}__${new MD5()
		.update(`${Math.random()}-${new Date().toISOString()}`)
		.digest('hex')
		.substring(0, 6)}`

const styles = {
	popover: { padding: '1% 2%' },
}

const ASAPButton = ({
	open,
	togglePopover,
	handleClipNameChange,
	handleClipContentChange,
	clipName,
	clipContent,
	classes,
	nowBoardId,
}) => [
  <Button
    key="asap-btn"
    raised
    color="accent"
    id="ASAP-btn"
    disabled={nowBoardId === '1'}
    onClick={togglePopover}
  >
		ASAP
  </Button>,
  <Popover
    open={open}
    key="asap-popover"
    anchorEl={document.getElementById('ASAP-btn')}
    anchorReference="anchorEl"
    anchorPosition={{ top: 200, left: 400 }}
    onRequestClose={togglePopover}
    anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'left',
		}}
    transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
    classes={{ paper: classes.popover }}
  >
    <Typography color="primary" type="title">
			Post a clip to NOW board
    </Typography>
    <form noValidate autoComplete="off">
      <TextField
        margin="dense"
        id="name"
        label="clip name"
        onChange={handleClipNameChange}
        fullWidth
        value={clipName}
      />
      <TextField
        multiline
        autoFocus
        fullWidth
        margin="dense"
        id="content"
        label="clip content"
        value={clipContent}
        inputProps={{ type: 'textarea' }}
        onChange={handleClipContentChange}
        rows="4"
      />
    </form>
  </Popover>,
]

ASAPButton.propTypes = {
	open: PropTypes.bool.isRequired,
	togglePopover: PropTypes.func.isRequired,
	handleClipNameChange: PropTypes.func.isRequired,
	handleClipContentChange: PropTypes.func.isRequired,
	clipName: PropTypes.string.isRequired,
	clipContent: PropTypes.string.isRequired,
	nowBoardId: PropTypes.string.isRequired,
}

const recomposeEnhancer = withStateHandlers(
	({ initOpenPopover = false }) => ({
		open: initOpenPopover,
		clipName: randomClipName(),
		clipContent: '',
	}),
	{
		togglePopover: ({ open }) => () => ({ open: !open }),
		handleClipNameChange: () => ev => ({ clipName: ev.target.value }),
		handleClipContentChange: () => ev => ({ clipContent: ev.target.value }),
	},
)

export default withStyles(styles)(recomposeEnhancer(ASAPButton))
