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

const styles = () => ({
	root: {
		flexGrow: 1,
		marign: 'auto 0',
	},
	floatingLabelFocusStyle: {
		color: '#27bc9c',
	},
})

const AddClipboard = props => {
	const { name, onInputChange, submit } = props
	return (
  <Grid container>
    <Grid item xs={12}>
      <Grid container spacing={40} justify="center">
        <div>
          <img alt="logo" src={clip} height="90" width="90" />
        </div>
        <FormGroup>
          <TextField label="Clipboard Name" onChange={onInputChange} />
          <br />
          <Button
            label="Create Clipboard"
            color="primary"
            raised
            onClick={submit}
            disabled={!name}
          >
							Create
          </Button>
        </FormGroup>
      </Grid>
    </Grid>
  </Grid>
	)
}

AddClipboard.propTypes = {
	name: PropTypes.string,
	onInputChange: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
}

AddClipboard.defaultProps = {
	name: '',
}

const withcreateClipboard = graphql(gql`${createClipboard}`, {
	props: ({ ownProps: { name = '' }, mutate }) => ({
		submit: () => {
			mutate({ variables: { name } })
		},
	}),
})

const recomposeEnhancer = compose(
	withStateHandlers(({ name = '' }) => ({ name }), {
		onInputChange: () => ev => ({ name: ev.target.value }),
	}),
)
const enhancer = compose(
	compose(withStyles, styles)(),
	recomposeEnhancer,
	withcreateClipboard,
)

export default enhancer(AddClipboard)
