// @flow

import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { withRouter } from 'react-router';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';
import FormGroup from 'material-ui/Form/FormGroup';
import { red } from 'material-ui/colors';

// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import createClipboard from '../../graphql/mutations/createClipboard';
import clip from '../images/clip.png';

const styles = theme => ({
	root: {
		// flexGrow: 1,
		margin: `${theme.spacing.unit * 2}px 0`,
	},
	inputError: {
		color: red['100'],
	},
});

const AddClipboard = (props: {
	name: string,
	onInputChange: (prop?: Object) => (event: SyntheticEvent<HTMLFormElement>) => Object,
	submit: (event?: SyntheticEvent<HTMLButtonElement>) => void,
	classes: { root?: cssInJS, inputError: cssInJS },
	error: boolean,
}) => {
	const { name, onInputChange, submit, classes, error } = props;
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
              autoFocus
              error={error}
              helperText={
									error ? (
  <span>
    {'Must not be "board" or contains special characters'}
  </span>
									) : null
								}
              classes={error ? classes.inputError : {}}
              label="Clipboard Name"
              onChange={onInputChange}
            />
            <br />
            <Button
              raised
              label="Create Clipboard"
              color="primary"
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
	);
};

const withcreateClipboard = graphql(gql`${createClipboard}`, {
	props: ({ ownProps: { history, name = '' }, mutate }) => ({
		submit: () => {
			mutate({ variables: { name } }).then(
				({ data: { createClipboard: { name: clipboardName } } }) => {
					history.push(`/boards/${clipboardName}`);
				},
			);
		},
	}),
});

const recomposeEnhancer = compose(
	withStateHandlers(({ name = '', error = false }) => ({ name, error }), {
		onInputChange: () => ({ target: { value = '' } = { value: '' } }) => ({
			name: value,
			error: value === 'boards' || /[^0-9a-zA-Z_-]/g.test(value),
		}),
	}),
);
const enhancer = compose(withStyles(styles), withRouter, recomposeEnhancer, withcreateClipboard);

export default enhancer(AddClipboard);
