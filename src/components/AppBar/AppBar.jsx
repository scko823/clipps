import React from 'react'
import PropTypes from 'prop-types'
import MUIAppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Drawer from 'material-ui/Drawer'
import Icon from 'material-ui/Icon'
import { withStyles } from 'material-ui/styles'
import { compose, withStateHandlers, lifecycle } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import allClipboardsQuery from '../../../graphql/queries/allClipboards'
import clipboardsSubscription from '../../../graphql/subscriptions/clipboards'

import DrawerList from './DrawerList'

const styles = () => ({
	addIcon: {
		'&:hover': {
			cursor: 'pointer',
		},
	},
})

const ClipboardAppBar = props => {
	const {
		loadingClipboards,
		clipboards,
		refetchClipboard,
		classes,
		children,
		showDrawer,
		toggleDrawer,
	} = props

	return (
  <div id="clipboard">
    <MUIAppBar position="static">
      <Toolbar>
        <IconButton onClick={toggleDrawer} color="contrast" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" style={{ flexGrow: 1 }}>
						ClipBoards
        </Typography>

        <Icon className={classes.addIcon} color="contrast">
						add_circle
        </Icon>
      </Toolbar>
    </MUIAppBar>
    <Drawer
      open={showDrawer}
      onRequestClose={toggleDrawer}
      className="drawer"
    >
      <DrawerList
        loading={loadingClipboards}
        clipboards={clipboards}
        refetch={refetchClipboard}
      />
    </Drawer>
    {children}
  </div>
	)
}

ClipboardAppBar.propTypes = {
	children: PropTypes.node.isRequired,
	classes: PropTypes.object,
	loadingClipboards: PropTypes.bool.isRequired,
	refetchClipboard: PropTypes.func.isRequired,
	clipboards: PropTypes.arrayOf(PropTypes.object).isRequired,
	showDrawer: PropTypes.bool,
	toggleDrawer: PropTypes.func.isRequired,
}

ClipboardAppBar.defaultProps = {
	classes: {},
	showDrawer: false,
}

const withAllClipboardsQuery = graphql(
	gql`
  ${allClipboardsQuery}
`,
	{
		props: ({
			ownProps,
			data: { loading, allClipboards, refetch, subscribeToMore },
		}) => ({
			...ownProps,
			loadingClipboards: loading,
			clipboards: allClipboards,
			refetchClipboard: refetch,
			subscribeToClipboardsEvents: () => {
				subscribeToMore({
					document: gql`${clipboardsSubscription}`,
					variables: {
						mutationTypes: ['CREATED', 'UPDATED', 'DELETED'],
					},
				})
			},
		}),
	},
)

const recomposeEnhancer = compose(
	withStateHandlers(
		({ initShowDrawer = false }) => ({
			showDrawer: initShowDrawer,
		}),
		{
			toggleDrawer: ({ showDrawer }) => () => ({ showDrawer: !showDrawer }),
		},
	),
	lifecycle({
		componentDidMount() {
			this.props.subscribeToClipboardsEvents()
		},
	}),
)

const enhancer = compose(
	compose(withStyles, styles)(),
	withAllClipboardsQuery,
	recomposeEnhancer,
)

export default enhancer(ClipboardAppBar)
