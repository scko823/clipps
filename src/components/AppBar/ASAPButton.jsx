import React from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Popover from 'material-ui/Popover'

import { withStateHandlers } from 'recompose'

const ASAPButton = ({ open, togglePopover }) => [
  <Button raised color="accent" id="ASAP-btn" onClick={togglePopover}>
		ASAP
  </Button>,
  <Popover
    open={open}
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
  >
    <Typography>The content of the Popover.</Typography>
  </Popover>,
]

ASAPButton.propTypes = {
	open: PropTypes.bool.isRequired,
	togglePopover: PropTypes.func.isRequired,
	handleClipNameChange: PropTypes.func.isRequired,
	handleClipContentChange: PropTypes.func.isRequired,
	clipName: PropTypes.string.isRequired,
	clipContent: PropTypes.string.isRequired,
}

const recomposeEnhancer = withStateHandlers(
	({ initOpenPopover = false }) => ({
		open: initOpenPopover,
		clipName: '',
		clipContent: '',
	}),
	{
		togglePopover: ({ open }) => () => ({ open: !open }),
		handleClipNameChange: () => ev => ({ clipName: ev.target.value }),
		handleClipContentChange: () => ev => ({ clipContent: ev.target.value }),
	},
)

export default recomposeEnhancer(ASAPButton)
