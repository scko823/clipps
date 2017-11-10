import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import clip from '../images/clip.png'
import { GridList, GridTile } from 'material-ui/GridList'
import { browserHistory } from 'react-router'
import { teal400 } from 'material-ui/styles/colors'
import { withRouter } from 'react-router-dom'

const styles = {
	floatingLabelFocusStyle: {
		color: '#27bc9c'
	}
}

class Landing extends React.Component {
	state = {
		name: ''
	}
	handleEnterClipboard = () => {
		this.props.history.push(`/clipboard/new`, { name: this.state.name })
	}

	handleNameChange = e => {
		let val = e.target.value
		this.setState(state => ({
			name: val
		}))
	}

	render() {
		return (
			<GridList className="landing">
				<GridTile>
					<img src={clip} height="90" width="90" />
				</GridTile>
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
						label="Create Clipboard"
						primary={true}
						onClick={this.handleEnterClipboard}
						disabled={!this.state.name}
					/>
				</GridTile>
			</GridList>
		)
	}
}

export default withRouter(Landing)
