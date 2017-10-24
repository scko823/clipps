import React from 'react';
import { AppBar, Drawer, MenuItem, Divider, Avatar, ListItem } from 'material-ui';
import Clipboard from './Clipboard';
import PaperDialog from './PaperDialog';
import PaperClips from './PaperClips';
import { startCase } from 'lodash';
import { grey600, teal300, green500 } from 'material-ui/styles/colors';

const style = {
	menuStyle: {
		color: green500
	},
	avatar: {
		top: '4px'
	},
	login: {
		color: 'white'
	}
};

class App extends React.Component {
	state = {
		openDialog: false,
		name: '',
		open: false
	};

	openDialog = type => {
		this.setState({
			openDialog: true
		});
	};
	closeDialog = () => {
		this.setState({
			openDialog: false
		});
	};

	componentWillMount() {
		var clipName = this.props.location.query.name;
		this.setState({
			name: clipName
		});
	}
	toggleDrawer = () => this.setState({ open: true });
	handleClose = () => this.setState({ open: false });

	getAvatar = () => {
		return (
			<ListItem
				disabled={true}
				leftAvatar={
					<Avatar color={teal300} backgroundColor="white" size={45} style={style.avatar}>
						{startCase(this.props.location.query.name.substr(0, 1))}
					</Avatar>
				}
				style={style.login}
			>
				{startCase(this.props.location.query.name)}
			</ListItem>
		);
	};

	render() {
		return (
			<div id="clipboard">
				<AppBar
					onLeftIconButtonTouchTap={this.toggleDrawer}
					iconElementRight={this.getAvatar()}
				/>
				<Clipboard openDialog={this.openDialog} />
				<PaperClips />
				{this.state.openDialog && (
					<PaperDialog
						open={this.state.openDialog}
						handleClose={this.closeDialog}
						type={this.state.type}
					/>
				)}

				<Drawer
					docked={false}
					width={200}
					open={this.state.open}
					onRequestChange={open => this.setState({ open })}
					className="drawer"
				>
					<h3>Clipboards</h3>
					<Divider />
					<MenuItem onClick={this.handleClose} style={style.menuStyle}>
						ClipBoard1
					</MenuItem>
					<MenuItem onClick={this.handleClose} style={style.menuStyle}>
						ClipBoard2
					</MenuItem>
				</Drawer>
			</div>
		);
	}
}

export default App;
