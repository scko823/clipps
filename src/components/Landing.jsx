import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import { GridList, GridListTile } from 'material-ui/GridList';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import clip from '../images/clip.png';

const styles = {
	floatingLabelFocusStyle: {
		color: '#27bc9c',
	},
};

class Landing extends React.Component {
	propTypes = {
		history: PropTypes.object.isRequired,
	};
	state = {
		name: '',
	};
	handleEnterClipboard = () => {
		this.props.history.push(`/clipboard/new`, { name: this.state.name });
	};

	handleNameChange = e => {
		const val = e.target.value;
		this.setState(() => ({
			name: val,
		}));
	};

	render() {
		return (
  <Grid container>
    <Grid item xs={12}>
      <GridList cellHeight="auto" cols={2} className="landing">
        <GridListTile cols={1} rows={1}>
          <img alt="logo" src={clip} height="90" width="90" />
        </GridListTile>
      </GridList>
    </Grid>
    <GridListTile cols={1} rows={1}>
      <Button
        style={{ position: 'absolute', bottom: 0, right: 0 }}
        raisedprimary
        color="primary"
        disabled={!this.state.name}
        className="button"
      >
						Submit
      </Button>
    </GridListTile>
  </Grid>
		);
		// 		return (
		//   <GridList className="landing">
		//     <GridTile>
		//       <img alt="logo" src={clip} height="90" width="90" />
		//     </GridTile>
		//     <GridTile>
		//       <TextField
		//         floatingLabelText="Clipboard Name"
		//         floatingLabelStyle={styles.floatingLabelStyle}
		//         floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
		//         onChange={this.handleNameChange}
		//       />
		//       <br />
		//       <br />
		//       <Button
		//         label="Create Clipboard"
		//         primary
		//         raised
		//         onClick={this.handleEnterClipboard}
		//         disabled={!this.state.name}
		//       />
		//     </GridTile>
		//   </GridList>
		// );
	}
}

export default withStyles(styles)(Landing);
