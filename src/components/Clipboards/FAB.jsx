// @flow
import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';

const style = () => ({
	fab: {
		float: 'right',
		position: 'sticky',
		marginRight: '20px',
		bottom: '2%'
	}
});

const FAB = (props: FABPropType) => {
	const { classes, onClick } = props;
	return (
  <Button
    variant="fab"
    color="primary"
    aria-label="add"
    className={classes.fab}
    onClick={onClick}
		>
    <AddIcon />
  </Button>
	);
};

export default withStyles(style)(FAB);
