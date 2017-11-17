import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers } from 'recompose'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import withStyles from 'material-ui/styles/withStyles'
import FormGroup from 'material-ui/Form/FormGroup'

// GraphQL
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import createClipboard from '../../graphql/mutations/createClipboard'
import clip from '../images/clip.png'

const styles = theme => ({
	root: {
		// flexGrow: 1,
		margin: `${theme.spacing.unit * 2}px 0`,
	},
})

const AddClipboard = props => {
	const { name, onInputChange, submit, classes, error } = props
	return (
  <Grid className={classes.root} container>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item>
          <img alt="logo" src={clip} height="90" width="90" />
        </Grid>
        <Grid item>
          <FormGroup>
            <TextField
              label="Clipboard Name"
              onChange={onInputChange}
            />
            <br />
            <Button
              label="Create Clipboard"
              color="primary"
              raised
              onClick={submit}
              disabled={!name || error}
            >
								Create
            </Button>
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
	)
}

AddClipboard.propTypes = {
	name: PropTypes.string,
	onInputChange: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	error: PropTypes.bool,
}

AddClipboard.defaultProps = {
	name: '',
	error: false,
}

const withcreateClipboard = graphql(gql`${createClipboard}`, {
	props: ({ ownProps: { name = '' }, mutate }) => ({
		submit: () => {
			mutate({ variables: { name } })
		},
	}),
})

const recomposeEnhancer = compose(
	withStateHandlers(({ name = '', error = false }) => ({ name, error }), {
		onInputChange: () => ev => ({
			name: ev.target.value,
			error: ev.target.value === 'boards',
		}),
	}),
)
const enhancer = compose(
	withStyles(styles),
	recomposeEnhancer,
	withcreateClipboard,
)

export default enhancer(AddClipboard)
