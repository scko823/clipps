import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Template_clipboard from '../images/Template_clipboard.png';
import { GridList, GridTile } from 'material-ui/GridList';
import { browserHistory } from 'react-router';
import { green500 } from 'material-ui/styles/colors';

const styles = {
	floatingLabelFocusStyle: {
		color: green500
	}
};

class Landing extends React.Component {
	state = {
		name: ''
	};
	handleEnterClipboard = () => {
		browserHistory.push({
			pathname: '/clipboard/99',
			query: { name: this.state.name }
		});
	};

	handleNameChange = e => {
		let val = e.target.value;
		this.setState(state => ({
			name: val
		}));
	};

	render() {
		return (
			<GridList className="landing">
				<GridTile>
					<TextField
						floatingLabelText="Clipboard Name"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
						onChange={this.handleNameChange}
					/>
					<br />
					<br />
					<RaisedButton
						label="Enter Clipboard"
						primary={true}
						onClick={this.handleEnterClipboard}
					/>
				</GridTile>
				<GridTile>
					<img src={Template_clipboard} height="60" width="60" />
				</GridTile>
			</GridList>
		);
	}
}

export default Landing;
