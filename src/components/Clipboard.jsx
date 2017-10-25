import React from 'react';
import { FloatingActionButton, Menu, MenuItem } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';

class Clipboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		};
	}

	handleTouchTap = event => {
		this.props.openDialog();
	};

	handleRequestClose = () => {
		this.setState({
			open: false
		});
	};

	render() {
		return (
			<div className="fab">
				<FloatingActionButton onClick={this.handleTouchTap}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}

export default Clipboard;
