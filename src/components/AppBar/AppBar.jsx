import React from 'react'
import PropTypes from 'prop-types'
import MUIAppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Drawer from 'material-ui/Drawer'

import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import allClipboardsQuery from '../../../graphql/queries/allClipboards'
import clipboardsSubscription from '../../../graphql/subscriptions/clipboards'

import DrawerList from './DrawerList'

class ClipboardAppBar extends React.Component {
	propTypes = {
		clipboards: {
			loading: PropTypes.bool.isRequired,
			allClipboard: PropTypes.arrayOf(PropTypes.object).isRequired,
			refetch: PropTypes.func.isRequired,
		},
	}
	state = {
		showDrawer: false,
	}
	toggleDrawer = () => {
		this.setState(({ showDrawer }) => ({
			showDrawer: !showDrawer,
		}))
	}

	render() {
		const {
			loading: loadingClipboards,
			allClipboards: clipboards,
			refetch: refetchClipboard,
		} = this.props.clipboards

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
  </div>
		)
	}
}

const withAllClipboardsQuery = graphql(
	gql`
  ${allClipboardsQuery}
`,
	{
		name: 'clipboards',
	},
)

const withClipboardsSubscription = graphql(
	gql`
	${clipboardsSubscription}
`,
)

const enhancer = compose(withAllClipboardsQuery, withClipboardsSubscription)

export default enhancer(ClipboardAppBar)
