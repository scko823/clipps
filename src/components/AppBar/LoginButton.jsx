import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
// import Button from 'material-ui/Button';
// import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
// import { grey, blue, lightGreen } from 'material-ui/colors';
// import TextField from 'material-ui/TextField';
// import Typography from 'material-ui/Typography';
// import { CircularProgress } from 'material-ui/Progress';
// import Popover from 'material-ui/Popover';
import { withStyles } from 'material-ui/styles';
// import SendIcon from 'material-ui-icons/Send';
import { compose, withProps } from 'recompose';

const styles = () => ({
    popover: { padding: '1% 2%' },
    accountCircle: {
        width: '60%',
        height: '60%'
    }
});
const LoginButton = ({ classes, login }) => (
  <IconButton id="login-btn" onClick={login} color="contrast">
    <AccountCircle className={classes.accountCircle} />
  </IconButton>
);
//   <Popover
//     open={open}
//     key="asap-popover"
//     anchorEl={document.getElementById('login-btn')}
//     anchorReference="anchorEl"
//     anchorPosition={{ top: 200, left: 400 }}
//     onRequestClose={togglePopover}
//     anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'left'
//         }}
//     transformOrigin={{
//             vertical: 'top',
//             horizontal: 'center'
//         }}
//     classes={{ paper: classes.popover }}
//   >
//     <div>test</div>
//   </Popover>

LoginButton.propTypes = {
    classes: PropTypes.object.isRequired,
    login: PropTypes.bool.isRequired
    // open: PropTypes.bool.isRequired,
};

const recomposeEnchancer = withProps(({ history }) => ({ login: () => history.push('/login') }));

export default compose(withRouter, recomposeEnchancer, withStyles(styles))(LoginButton);
