import React from 'react';
import { browserHistory } from 'react-router';
import { AppBar, Drawer, MenuItem, Divider, Avatar, ListItem, CircularProgress } from 'material-ui';
import Clipboard from './Clipboard';
import PaperDialog from './PaperDialog';
import PaperClips from './PaperClips';
import { startCase } from 'lodash';
import axios from 'axios';
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
		open: false,
		clipboardLoading: true,
		clipboards: [],
		boardDetails: {},
		boardLoading: true,
		new: true
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

	componentDidMount() {
		axios.get(`http://localhost:8080/clipboard`).then(res => {
			this.setState({
				clipboardLoading: false,
				clipboards: res.data
			});
		});
	}
	toggleDrawer = () => this.setState({ open: true });
	handleClose = () => this.setState({ open: false });

	fetchClipBoard = board => {
		browserHistory.push(`/clipboard/${board.id}`);
		axios.get(`http://localhost:8080/clipboard/${board.id}`).then(res => {
			this.setState({
				boardDetails: res.data,
				open: false,
				boardLoading: false,
				new: false
			});
		});
	};

	getAvatar = () => {
		const { boardLoading, boardDetails } = this.state;
		return (
			<ListItem
				disabled={true}
				leftAvatar={
					<Avatar color={teal300} backgroundColor="white" size={45} style={style.avatar}>
						{!boardLoading
							? boardDetails.name.substr(0, 1)
							: startCase(this.props.location.query.name.substr(0, 1))}
					</Avatar>
				}
				style={style.login}
			>
				{!boardLoading ? boardDetails.name : startCase(this.props.location.query.name)}
			</ListItem>
		);
	};

	handlePost = body => {
		const { boardLoading, boardDetails } = this.state;
		return axios.post(`http://localhost:8080/clipboard/${boardDetails.id}/clip`, body, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	handleGet = () => {
		const { boardLoading, boardDetails } = this.state;
		return axios.get(`http://localhost:8080/clipboard/${boardDetails.id}`).then(response => {
			this.setState(() => ({
				boardDetails: response.data
			}));
		});
	};

	handleCreateBoard = body => {
		axios.all([this.handlePost(body), this.handleGet()]).then(
			axios.spread(resp => {
				this.setState({
					boardDetails: resp.data,
					boardLoading: false
				});
			})
		);

		this.closeDialog();
	};

	render() {
		return (
			<div id="clipboard">
				<AppBar
					onLeftIconButtonTouchTap={this.toggleDrawer}
					iconElementRight={this.getAvatar()}
				/>
				<Clipboard openDialog={this.openDialog} />
				<PaperClips
					boardLoading={this.state.boardLoading}
					boardDetails={this.state.boardDetails}
				/>
				{this.state.openDialog && (
					<PaperDialog
						open={this.state.openDialog}
						handleClose={this.closeDialog}
						handleCreateBoard={this.handleCreateBoard}
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
					{this.state.clipboardLoading ? (
						<CircularProgress size={60} thickness={7} />
					) : (
						this.state.clipboards.map(board => {
							return (
								<MenuItem
									onClick={() => {
										this.fetchClipBoard(board);
									}}
									style={style.menuStyle}
								>
									{board.name}
								</MenuItem>
							);
						})
					)}
				</Drawer>
			</div>
		);
	}
}

export default App;
