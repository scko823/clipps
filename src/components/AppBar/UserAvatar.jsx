import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router';
import Avatar from 'material-ui/Avatar';
import deepOrange from 'material-ui/colors/deepOrange';
import red from 'material-ui/colors/red';
import teal from 'material-ui/colors/teal';
import brown from 'material-ui/colors/brown';
import { compose } from 'recompose';

const styles = theme => ({
	'0': {
		backgroundColor: deepOrange[600],
		margin: `0 ${theme.spacing.unit * 1.5}px`
	},
	'1': {
		backgroundColor: red[900],
		margin: `0 ${theme.spacing.unit * 1.5}px`
	},
	'2': {
		backgroundColor: teal[800],
		margin: `0 ${theme.spacing.unit * 1.5}px`
	},
	'3': {
		backgroundColor: brown[800],
		margin: `0 ${theme.spacing.unit * 1.5}px`
	}
});
const UserAvatar = ({ classes }) => {
	const firstInit = localStorage.getItem('firstName')[0].toUpperCase();
	const lastInit = localStorage.getItem('lastName')[0].toUpperCase();
	const initials = `${firstInit}${lastInit}`;
	const hash =
		localStorage
			.getItem('id')
			.split('')
			.map(c => c.charCodeAt(0))
			.reduce((x, y) => x + y) % 4;
	return <Avatar className={classes[hash]}>{initials}</Avatar>;
};

UserAvatar.propTypes = {
	classes: PropTypes.object.isRequired
};

// const recomposeEnchancer = withProps(({ history }) => ({ login: () => history.push('/login') }));

export default compose(withRouter, withStyles(styles))(UserAvatar);
