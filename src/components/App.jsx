import React from 'react';
import { AppBar } from 'material-ui';
import Clipboard from './Clipboard';
import PaperDialog from './PaperDialog';
import PaperClips from './PaperClips';

class App extends React.Component {
	state = {
		type: null,
		openDialog: false
	};

	openDialog = type => {
		this.setState({
			type: type,
			openDialog: true
		});
	};
	closeDialog = () => {
		this.setState({
			openDialog: false
		});
	};

	render() {
		return (
			<div id="clipboard">
				<AppBar
					title="Clipboard"
					iconClassNameRight="muidocs-icon-navigation-expand-more"
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
			</div>
		);
	}
}

export default App;
