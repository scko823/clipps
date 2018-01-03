import React from 'react';
import PropTypes from 'prop-types';

// import { withRouter } from 'react-router';
// import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
// import { grey, blue, lightGreen } from 'material-ui/colors';
// import TextField from 'material-ui/TextField';
// import Typography from 'material-ui/Typography';
// import { CircularProgress } from 'material-ui/Progress';
// import Popover from 'material-ui/Popover';
import { withStyles } from 'material-ui/styles';
// import SendIcon from 'material-ui-icons/Send';

// import { compose, withStateHandlers, withProps } from 'recompose';

const styles = () => ({
    accountCircle: {
        width: '60%',
        height: '60%'
    }
});
const LoginButton = ({ classes }) => (
  <IconButton
    aria-owns={/* open ? 'menu-appbar' : */ null}
    aria-haspopup="true"
    onClick={() => {}}
    color="contrast"
  >
    <AccountCircle className={classes.accountCircle} />
  </IconButton>
);

LoginButton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginButton);
