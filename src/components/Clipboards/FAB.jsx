import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { withStyles } from 'material-ui/styles'

const style = () => ({
	fab: {
		float: 'right',
		marginTop: '25px',
		position: 'sticky',
		marginRight: '20px',
		top: '30px',
	},
})

const FAB = ({ classes, onClick }) => (
  <Button
    fab
    color="primary"
    aria-label="add"
    className={classes.fab}
    onClick={onClick}
  >
    <AddIcon />
  </Button>
)

FAB.propTypes = {
	classes: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default withStyles(style)(FAB)
