import React from 'react'
import PropTypes from 'prop-types'
// material-ui components
import MUIAppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Drawer from 'material-ui/Drawer'
import Icon from 'material-ui/Icon'
import { withStyles } from 'material-ui/styles'

// recompose
import { compose, withStateHandlers, lifecycle } from 'recompose'

// GraphQL
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import allClipboardsQuery from '../../../graphql/queries/allClipboards'
import clipboardsSubscription from '../../../graphql/subscriptions/clipboards'

// components
import DrawerList from './DrawerList'

const AppBarStyles = () => ({
	addIcon: {
		'&:hover': {
			cursor: 'pointer',
		},
	},
})

/**
 *
 * @param {*} param0
 */
const ClipboardAppBar = ({
	loadingClipboards,
	clipboards,
	refetchClipboard,
	classes,
	children,
	showDrawer,
	toggleDrawer,
}) => (
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
    <Drawer open={showDrawer} onRequestClose={toggleDrawer} className="drawer">
      <DrawerList
        loading={loadingClipboards}
        clipboards={clipboards}
        refetch={refetchClipboard}
      />
    </Drawer>
    {children}
  </div>
)

ClipboardAppBar.propTypes = {
	children: PropTypes.node.isRequired,
	classes: PropTypes.object,
	loadingClipboards: PropTypes.bool.isRequired,
	refetchClipboard: PropTypes.func.isRequired,
	clipboards: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.strings.isRequired,
		}),
	).isRequired,
	showDrawer: PropTypes.bool,
	toggleDrawer: PropTypes.func.isRequired,
}

ClipboardAppBar.defaultProps = {
	classes: {},
	showDrawer: false,
}

// GraphQL Clipboard query
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
	compose(withStyles, AppBarStyles)(),
	withAllClipboardsQuery,
	recomposeEnhancer,
)

export default enhancer(ClipboardAppBar)
