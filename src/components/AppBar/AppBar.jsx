import React from 'react'
import PropTypes from 'prop-types'
import MUIAppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Drawer from 'material-ui/Drawer'

// import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import allClipboardsQuery from '../../../graphql/queries/allClipboards'
import clipboardsSubscription from '../../../graphql/subscriptions/clipboards'

import DrawerList from './DrawerList'

class ClipboardAppBar extends React.Component {
	propTypes = {
		subscribeToClipboardsEvents: PropTypes.func,
		children: PropTypes.node,
		loadingClipboards: PropTypes.bool.isRequired,
		refetchClipboard: PropTypes.func.isRequired,
		clipboards: PropTypes.arrayOf(PropTypes.object).isRequired,
	}
	state = {
		showDrawer: false,
	}
	componentDidMount() {
		this.props.subscribeToClipboardsEvents()
	}
	toggleDrawer = () => {
		this.setState(({ showDrawer }) => ({
			showDrawer: !showDrawer,
		}))
	}

	render() {
		const { loadingClipboards, clipboards, refetchClipboard } = this.props

		return (
  <div id="clipboard">
    <MUIAppBar position="static">
      <Toolbar>
        <IconButton
          onClick={this.toggleDrawer}
          color="contrast"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" style={{ flexGrow: 1 }}>
							ClipBoards
        </Typography>
        <Button color="contrast">Login</Button>
      </Toolbar>
    </MUIAppBar>
    <Drawer
      open={this.state.showDrawer}
      onRequestClose={this.toggleDrawer}
      className="drawer"
    >
      <DrawerList
        loading={loadingClipboards}
        clipboards={clipboards}
        refetch={refetchClipboard}
      />
    </Drawer>
    {this.props.children}
  </div>
		)
	}
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

// const enhancer = compose(withAllClipboardsQuery)

export default withAllClipboardsQuery(ClipboardAppBar)
