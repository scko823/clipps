/* eslint-disable */

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

class FAB extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};
	}

	handleTouchTap = event => {
		this.props.openDialog();
	};

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<Button
				fab
				color="primary"
				aria-label="add"
				className={classes.fab}
				onClick={this.handleTouchTap}
			>
				<AddIcon />
			</Button>
		);
	}
}

FAB.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(style)(FAB);
