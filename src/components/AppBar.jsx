import React from 'react';
import MUIAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

// import { grey600, teal300, green500 } from 'material-ui/styles/colors'

const styles = {
	list: {
		width: 250,
	},
	listFull: {
		width: 'auto',
	},
};

class AppBar extends React.Component {
	state = {
		showDrawer: false,
	};
	toggleDrawer = () => {
		this.setState(({ showDrawer }) => ({
			showDrawer: !showDrawer,
		}));
	};

	render() {
		return (
  <div id="clipboard">
    <MUIAppBar position="static">
      <Toolbar>
        <IconButton color="contrast" aria-label="Menu">
          <MenuIcon onClick={this.toggleDrawer} />
        </IconButton>
        <Typography type="title" color="inherit">
							ClipBoards
        </Typography>
        <Button color="contrast">Login</Button>
      </Toolbar>
    </MUIAppBar>
    <Drawer
      width={200}
      open={this.state.showDrawer}
      onRequestClose={this.toggleDrawer}
      className="drawer"
    >
      <div>
        <h4>Clipboards</h4>
        <Divider />
      </div>
    </Drawer>
  </div>
		);
	}
}

export default withStyles(styles)(AppBar);
