import React from 'react'
import MUIAppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Drawer from 'material-ui/Drawer'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import allClipboardsQuery from '../../../graphql/queries/allClipboards'

import DrawerList from './DrawerList'

class ClipboardAppBar extends React.Component {
	state = {
		showDrawer: false,
	}
	toggleDrawer = () => {
		this.setState(({ showDrawer }) => ({
			showDrawer: !showDrawer,
		}))
	}

	render() {
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
        <Typography type="title" color="inherit">
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
      <DrawerList />
    </Drawer>
  </div>
		)
	}
}

const withAllClipboardsQuery = graphql(gql`${allClipboardsQuery}`)

export default withAllClipboardsQuery(ClipboardAppBar)
