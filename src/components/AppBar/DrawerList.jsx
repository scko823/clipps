import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		minWidth: 200,
		background: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
	},
})

const DrawerList = ({ loading, clipboards, refetch, classes }) => (
  <List
    className={classes.root}
    subheader={<ListSubheader>Clipboards</ListSubheader>}
  >
    <Divider />
    {loading ? <h6>loading</h6> : JSON.stringify(clipboards)}
  </List>
)

DrawerList.propTypes = {
	clipboards: PropTypes.arrayOf(PropTypes.object),
	classes: PropTypes.object,
}

DrawerList.defaultProps = {
	clipboards: [],
	classes: {
		root: {
			width: '100%',
			maxWidth: 360,
			minWidth: 200,
			background: 'white',
		},
	},
}

export default withStyles(styles)(DrawerList)
