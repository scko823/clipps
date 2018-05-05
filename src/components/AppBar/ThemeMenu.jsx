import React from 'react';
// import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

import themes from './themes';

class SimpleMenu extends React.Component {
	state = {
		anchorEl: null
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { anchorEl } = this.state;

		return (
  <div>
    <Button
      aria-owns={anchorEl ? 'simple-menu' : null}
      aria-haspopup="true"
      onClick={this.handleClick}
    >
					Open Menu
    </Button>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={this.handleClose}
    >
      {themes.map(theme => (
        <MenuItem onClick={this.handleClose}>{theme.replace('.css', '')}</MenuItem>
					))}
    </Menu>
  </div>
		);
	}
}

export default SimpleMenu;
