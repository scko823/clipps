import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

// material-ui components
import Divider from 'material-ui/Divider'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import DataUsageIcon from 'material-ui-icons/DataUsage'
import CachedIcon from 'material-ui-icons/Cached'
import AddIcon from 'material-ui-icons/Add'

// recompose
import { compose, withProps } from 'recompose'

// GraphQL
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import updateClipboardMutation from '../../../graphql/mutations/updateClipboard'

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
	icon: {
		margin: '0 auto',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
	},
})

/**
 *
 * @param {boolean} loading loading clipboard state, ie fetching with apollo, passed by parent ClipboardAppBar
 * @param {Object[]} clipboards clipboard data
 * @param {string} clipboards[].name clipboard name
 * @param {string} clipboards[].id clipboard id
 * @param {function} refetch refetch callback
 * @param {Object} classes classes to be used by JSS/materialUI
 */

const DrawerList = ({
	loading,
	clipboards,
	refetch,
	classes,
	toggleDrawer,
	pushRoute,
	nowBoardId,
}) => {
	let listItems = <DataUsageIcon />
	const subheader = (
  <ListSubheader className={classes.subheader}>
    <List>
      <ListItem>
        <Typography type="headline">Clipboards</Typography>
        <ListItemIcon
          className={classes.icon}
          onClick={() => {
							toggleDrawer()
							pushRoute('/add')
						}}
        >
          <AddIcon />
        </ListItemIcon>
        <ListItemIcon
          className={classes.icon}
          onClick={() => refetch()}
        >
          {loading ? <CircularProgress /> : <CachedIcon />}
        </ListItemIcon>
      </ListItem>
    </List>
  </ListSubheader>
	)
	if (!loading && clipboards) {
		const NowBoard = clipboards.find(
			clipboard => clipboard.name === 'NOW',
		) || { id: nowBoardId, name: 'NOW' }
		const restOfTheBoards = clipboards.filter(
			clipboard => clipboard.name !== 'NOW',
		)
		listItems = [NowBoard, ...restOfTheBoards].map(clipboard => (
  <Link
    onClick={toggleDrawer}
    key={clipboard.id}
    to={`/boards/${clipboard.name}`}
  >
    <ListItem key={clipboard.id} button>
      <ListItemText primary={clipboard.name} />
    </ListItem>
  </Link>
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
	loading: PropTypes.bool.isRequired,
	refetch: PropTypes.func.isRequired,
	toggleDrawer: PropTypes.func.isRequired,
	pushRoute: PropTypes.func.isRequired,
	nowBoardId: PropTypes.string.isRequired,
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

const withupdateClipboardMutation = graphql(gql`${updateClipboardMutation}`)

const recomposeEnhancer = compose(
	withProps(({ history }) => ({ pushRoute: history.push })),
)

const enchancer = compose(
	withStyles(styles),
	withupdateClipboardMutation,
	withRouter,
	recomposeEnhancer,
)

export default enchancer(DrawerList)
