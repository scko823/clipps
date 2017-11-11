/* eslint-disable */
import React from 'react'
import HighLight from 'react-highlight'
import { messages } from './mockData'
import { Paper, Subheader, IconButton } from 'material-ui'
import Snippet from './Snippet'

class PaperClips extends React.Component {
	renderPapers = arr => {
		return arr.map(clip => {
			return <Snippet clip={clip} />
		})
	}
	render() {
		const { boardLoading, boardDetails } = this.props
		return (
			<div style={{ height: '100%', margin: '20px' }}>
				{boardLoading && (
					<h3 style={{ textAlign: 'center' }}>Sample Clipboard</h3>
				)}
				{!boardLoading
					? this.renderPapers(boardDetails.clips)
					: this.renderPapers(messages)}
			</div>
		)
	}
}

export default PaperClips
