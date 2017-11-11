import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		minWidth: 200,
		background: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
	},
});

const DrawerList = ({ clips, classes }) => (
  <List className={classes.root} subheader={<ListSubheader>Clipboards</ListSubheader>} />
);

DrawerList.propTypes = {
	clips: PropTypes.array,
	classes: PropTypes.object,
};

DrawerList.defaultProps = {
	clips: [],
	classes: {
		root: {
			width: '100%',
			maxWidth: 360,
			minWidth: 200,
			background: 'white',
		},
	},
};
export default withStyles(styles)(DrawerList);
