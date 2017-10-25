import React from 'react';
import HighLight from 'react-highlight';
import { Paper, Subheader, IconButton } from 'material-ui';

const style = {
	width: 400,
	margin: 20,
	textAlign: 'center',
	display: 'inline-block',
	verticalAlign: 'top'
};

class Snippet extends React.Component {
	onClick = e => {
		e.preventDefault();
		const { content, id } = this.props.clip;

		var text = document.createElement('textarea');
		text.innerText = content;
		document.body.appendChild(text);
		text.select();

		document.execCommand('Copy');
		text.remove();
	};

	render() {
		const { clip } = this.props;
		return (
			<Paper style={style} zDepth={3}>
				<div style={{ display: 'flex' }}>
					<Subheader style={{ textAlign: 'left' }}>{clip.name}</Subheader>
					<IconButton onClick={this.onClick} tooltip="Copy">
						<i className="material-icons md-18">content_copy</i>
					</IconButton>
				</div>
				<br />
				<br />
				<HighLight ref={c => (this._textNode = c)} className="code" language={clip.type}>
					{clip.content}
				</HighLight>
			</Paper>
		);
	}
}

export default Snippet;
