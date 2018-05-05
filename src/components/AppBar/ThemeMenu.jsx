import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

import themes from './themes';
import HighlightThemeContext from '../contexts/HighlightThemeContext';

const ThemeMenu = ({ themeAnchorEl, onThemeMenuToggle }) => (
  <div>
    <Button
      aria-owns={themeAnchorEl ? 'simple-menu' : null}
      aria-haspopup="true"
      onClick={onThemeMenuToggle}
    >
			Open Menu
    </Button>
    <Menu
      id="theme-menu"
      anchorEl={themeAnchorEl}
      open={Boolean(themeAnchorEl)}
      onClose={onThemeMenuToggle}
    >
      {themes.map(theme => (
        <HighlightThemeContext.Consumer>
          {({ onChangeTheme }) => (
            <MenuItem id={`theme-${theme}`} onClick={onChangeTheme}>
              {theme}
            </MenuItem>
					)}
        </HighlightThemeContext.Consumer>
			))}
    </Menu>
  </div>
);

ThemeMenu.propTypes = {
	themeAnchorEl: PropTypes.node.isRequired,
	onThemeMenuToggle: PropTypes.func.isRequired
};

export default ThemeMenu;
