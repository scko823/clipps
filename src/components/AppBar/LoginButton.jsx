import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { compose, withProps } from 'recompose';

const styles = () => ({
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

LoginButton.propTypes = {
	classes: PropTypes.object.isRequired,
	login: PropTypes.bool.isRequired
};

const recomposeEnchancer = withProps(({ history }) => ({ login: () => history.push('/login') }));

export default compose(withRouter, recomposeEnchancer, withStyles(styles))(LoginButton);
