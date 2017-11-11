import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import DataUsageIcon from 'material-ui-icons/DataUsage'

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		minWidth: 200,
		background: theme.palette.background.paper,
	},
	subheader: {
		fontWeight: 'bold',
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
	},
})

const DrawerList = ({ loading, clipboards, refetch, classes }) => {
	const subheader = (
  <ListSubheader className="whatever">Clipboards</ListSubheader>
	)
	let listItems
	if (loading) {
		listItems = <DataUsageIcon />
	} else if (clipboards) {
		listItems = clipboards.map(clipboard => (
  <ListItem key={clipboard.id} button>
    <ListItemText primary={clipboard.name} />
  </ListItem>
		))
	}
	return (
  <List className={classes.root} subheader={subheader}>
    <Divider />
    {listItems}
  </List>
	)
}

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
