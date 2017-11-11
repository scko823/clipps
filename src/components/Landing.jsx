/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import { GridList, GridListTile } from 'material-ui/GridList'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import {
	FormLabel,
	FormControl,
	FormGroup,
	FormControlLabel,
	FormHelperText,
} from 'material-ui/Form'
import clip from '../images/clip.png'

const styles = {
	root: {
		flexGrow: 1,
		marign: 'auto 0',
	},
	floatingLabelFocusStyle: {
		color: '#27bc9c',
	},
}

class Landing extends React.Component {
	propTypes = {
		history: PropTypes.object.isRequired,
	}
	state = {
		name: '',
	}
	handleEnterClipboard = () => {
		this.props.history.push(`/clipboard/new`, { name: this.state.name })
	}

	handleNameChange = e => {
		const val = e.target.value
		this.setState(() => ({
			name: val,
		}))
	}

	render() {
		return (
			<Grid container>
				<Grid item xs={12}>
					<Grid container spacing={40} justify="center">
						<div>
							<img alt="logo" src={clip} height="90" width="90" />
						</div>
						<FormGroup>
							<TextField
								label="Clipboard Name"
								onChange={this.handleNameChange}
							/>
							<br />
							<Button
								label="Create Clipboard"
								color="primary"
								raised
								onClick={this.handleEnterClipboard}
								disabled={!this.state.name}
							>
								Create
							</Button>
						</FormGroup>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(Landing)
