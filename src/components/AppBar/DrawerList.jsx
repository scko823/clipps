import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import DataUsageIcon from 'material-ui-icons/DataUsage'
import CachedIcon from 'material-ui-icons/Cached'

import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import updateClipsMutation from '../../../graphql/mutations/updateClip'

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		minWidth: 200,
		background: theme.palette.background.paper,
	},
	subheader: {
		padding: '0 0',
	},
	refetchIcon: {
		'&:hover': {
			cursor: 'pointer',
		},
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
	},
})

const DrawerList = ({ loading, clipboards, refetch, mutate, classes }) => {
	const subheader = (
  <ListSubheader className={classes.subheader}>
    <List>
      <ListItem>
        <ListItemText primary="Clipboards" />
        <ListItemIcon
          className={classes.refetchIcon}
          onClick={() => refetch()}
        >
          <CachedIcon />
        </ListItemIcon>
      </ListItem>
    </List>
  </ListSubheader>
	)
	let listItems
	if (loading) {
		listItems = <DataUsageIcon />
	} else if (clipboards) {
		listItems = clipboards.map(clipboard => (
  <ListItem
    key={clipboard.id}
    onClick={() =>
					mutate({
						variables: {
							id: clipboard.id,
							name: `${Math.random().toFixed(4)}`,
						},
					})
				}
    button
  >
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
	mutate: PropTypes.func.isRequired,
	classes: PropTypes.object,
	loading: PropTypes.bool.isRequired,
	refetch: PropTypes.func.isRequired,
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

const withUpdateClipsMutation = graphql(gql`${updateClipsMutation}`)

const enchancer = compose(withStyles(styles), withUpdateClipsMutation)

export default enchancer(DrawerList)
