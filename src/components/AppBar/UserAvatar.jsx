import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router';
import Avatar from 'material-ui/Avatar';
import deepOrange from 'material-ui/colors/deepOrange';
import red from 'material-ui/colors/red';
import teal from 'material-ui/colors/teal';
import brown from 'material-ui/colors/brown';
import Popover from 'material-ui/Popover';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';

import { compose, withStateHandlers } from 'recompose';

const styles = theme => ({
	'0': {
		backgroundColor: deepOrange[600]
	},
	'1': {
		backgroundColor: red[900]
	},
	'2': {
		backgroundColor: teal[800]
	},
	'3': {
		backgroundColor: brown[800]
	},
	fakeLink: {
		cursor: 'pointer',
		margin: `0 ${theme.spacing.unit * 1.5}px`
	}
});
const UserAvatar = ({ classes, popoverOpen, togglePopover, onLogOut }) => {
	const firstInit = localStorage.getItem('firstName')[0].toUpperCase();
	const lastInit = localStorage.getItem('lastName')[0].toUpperCase();
	const initials = `${firstInit}${lastInit}`;
	const hash =
		localStorage
			.getItem('id')
			.split('')
			.map(c => c.charCodeAt(0))
			.reduce((x, y) => x + y) % 4;
	return (
  <Fragment>
    <Avatar
      classes={{ root: classes.fakeLink }}
      onClick={togglePopover}
      id="user-avatar"
      className={classes[hash]}
    >
      {initials}
    </Avatar>
    <Popover
      open={popoverOpen}
      anchorEl={document.getElementById('user-avatar')}
      anchorReference="anchorEl"
      anchorPosition={{ top: 200, left: 400 }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
      onClose={togglePopover}
    >
      <Paper>
        <List>
          <ListItem button component="a" onClick={onLogOut}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Paper>
    </Popover>
  </Fragment>
	);
};

UserAvatar.propTypes = {
	classes: PropTypes.object.isRequired,
	popoverOpen: PropTypes.bool.isRequired,
	togglePopover: PropTypes.func.isRequired,
	onLogOut: PropTypes.func.isRequired
};

const recomposeEnchancer = withStateHandlers(
	({ popoverOpen = false }) => ({
		popoverOpen
	}),
	{
		togglePopover: ({ popoverOpen }) => () => ({ popoverOpen: !popoverOpen }),
		onLogOut: (_, { history, onLogout: notifyLogOut }) => () => {
			localStorage.clear();
			notifyLogOut();
			history.push('/');
		}
	}
);

export default compose(withRouter, withStyles(styles), recomposeEnchancer)(UserAvatar);
