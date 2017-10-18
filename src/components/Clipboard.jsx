import React from 'react';
import { FloatingActionButton, Menu, MenuItem } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';

class Clipboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			type: null
		};
	}

	handleTouchTap = event => {
		// This prevents ghost click.
		event.preventDefault();

		this.setState({
			open: true,
			anchorEl: event.currentTarget
		});
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

				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
					targetOrigin={{ horizontal: 'left', vertical: 'top' }}
					onRequestClose={this.handleRequestClose}
					animation={PopoverAnimationVertical}
				>
					<Menu>
						<MenuItem
							primaryText="Add Text Clip"
							onClick={() => this.props.openDialog('clip')}
						/>
						<MenuItem
							primaryText="Add Code"
							onClick={() => this.props.openDialog('code')}
						/>
					</Menu>
				</Popover>
			</div>
		);
	}
}

export default Clipboard;
