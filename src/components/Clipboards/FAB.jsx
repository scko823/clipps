// @flow
import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';

const style = () => ({
	fab: {
		float: 'right',
		marginTop: '25px',
		position: 'sticky',
		marginRight: '20px',
		top: '30px',
	},
});

const FAB = (props: FABPropType) => {
	const { classes, onClick } = props;
	return (
  <Button fab color="primary" aria-label="add" className={classes.fab} onClick={onClick}>
    <AddIcon />
  </Button>
	);
};

export default withStyles(style)(FAB);
