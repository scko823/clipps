import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import Button from 'material-ui/Button';
import { grey, blue, lightGreen } from 'material-ui/colors';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Popover from 'material-ui/Popover';
import { withStyles } from 'material-ui/styles';
import SendIcon from '@material-ui/icons/Send';

import { compose, withStateHandlers, withProps } from 'recompose';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import createClipMutation from '../../../graphql/mutations/createClip';
import randomClipName from '../../utils/randomName';

const styles = () => ({
	popover: { padding: '1% 2%' },
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		'&>h2': {
			alignSelf: 'center'
		}
	},
	icon: {
		cursor: 'pointer'
	},
	ASAPBtn: {
		backgroundColor: '#ff4081'
	},
	disabledIcon: {
		cursor: 'disabled'
	},
	progressWrapper: {
		position: 'relative'
	},
	progress: {
		color: lightGreen['500'],
		position: 'absolute',
		left: '25%',
		marginTop: '-3px',
		zIndex: 1
	},
	progress2: {
		color: lightGreen['500'],
		position: 'absolute',
		left: '0',
		zIndex: 1
	}
});

const ASAPButton = ({
	open,
	togglePopover,
	handleClipNameChange,
	handleClipContentChange,
	clipName,
	clipContent,
	classes,
	nowBoardId,
	submitAndRedirect,
	submitting,
	disabled
}) => [
  <div key="asap-btn-wrapper" className={classes.progressWrapper}>
    <Button
      variant="raised"
      color="inherit"
      id="ASAP-btn"
      disabled={disabled || nowBoardId === '1'}
      onClick={togglePopover}
      className={classes.ASAPBtn}
    >
			ASAP
    </Button>
    {nowBoardId === '1' && <CircularProgress className={classes.progress} />}
  </div>,
  <Popover
    open={open}
    key="asap-popover"
    anchorEl={document.getElementById('ASAP-btn')}
    anchorReference="anchorEl"
    anchorPosition={{ top: 200, left: 400 }}
    onClose={togglePopover}
    anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'left'
		}}
    transformOrigin={{
			vertical: 'top',
			horizontal: 'center'
		}}
    classes={{ paper: classes.popover }}
  >
    <div className={classes.title}>
      <Typography color="primary" type="title">
				Post a clip to NOW board
      </Typography>
      <div className={classes.progressWrapper}>
        {submitting ? (
          <CircularProgress
            className={classes.progress2}
            style={{
							width: '24px',
							height: '24px'
						}}
          />
				) : (
  <SendIcon
    color={clipContent !== '' ? blue['500'] : grey['500']}
    className={clipName && clipContent ? classes.icon : classes.disabledIcon}
    onClick={submitAndRedirect}
  />
				)}
      </div>
    </div>

    <form noValidate autoComplete="off">
      <TextField
        margin="dense"
        id="name"
        label="clip name"
        onChange={handleClipNameChange}
        fullWidth
        value={clipName}
      />
      <TextField
        multiline
        autoFocus
        fullWidth
        margin="dense"
        id="content"
        label="clip content"
        value={clipContent}
        inputProps={{ type: 'textarea' }}
        onChange={handleClipContentChange}
        rows="4"
      />
    </form>
  </Popover>
];

ASAPButton.propTypes = {
	open: PropTypes.bool.isRequired,
	togglePopover: PropTypes.func.isRequired,
	handleClipNameChange: PropTypes.func.isRequired,
	handleClipContentChange: PropTypes.func.isRequired,
	submitAndRedirect: PropTypes.func.isRequired,
	clipName: PropTypes.string.isRequired,
	clipContent: PropTypes.string.isRequired,
	nowBoardId: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired
};

const recomposeEnhancer = compose(
	withStateHandlers(
		({ initOpenPopover = false, submitting = false }) => ({
			open: initOpenPopover,
			clipName: randomClipName(),
			clipContent: '',
			submitting
		}),
		{
			togglePopover: ({ open }) => () => ({ open: !open }),
			handleClipNameChange: () => ev => ({ clipName: ev.target.value }),
			handleClipContentChange: () => ev => ({
				clipContent: ev.target.value
			}),
			setSubmitting: () => bool => ({ submitting: bool }),
			handleClipCreateSuccess: () => () => ({
				clipName: randomClipName(),
				clipContent: ''
			})
		}
	),
	withProps(
		({
			clipName,
			clipContent,
			nowBoardId,
			createASAP,
			history,
			togglePopover,
			setSubmitting,
			handleClipCreateSuccess
		}) => ({
			submitAndRedirect: () => {
				if (!(clipName && clipContent)) {
					return;
				}
				setSubmitting(true);
				createASAP(clipName, clipContent, nowBoardId).then(() => {
					togglePopover();
					setSubmitting(false);
					handleClipCreateSuccess();
					history.push(`/NOW/${clipName}`);
				});
			}
		})
	)
);

const withCreateClipMutation = graphql(
	gql`
		${createClipMutation}
	`,
	{
		props: ({ mutate }) => ({
			createASAP: (name, content, nowBoardId) =>
				mutate({
					variables: {
						clipboardId: nowBoardId,
						name,
						content
					}
				})
		})
	}
);

const enhancer = compose(
	compose(withStyles(styles)),
	withRouter,
	withCreateClipMutation,
	recomposeEnhancer
);

export default enhancer(ASAPButton);
