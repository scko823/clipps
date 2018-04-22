import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { compose } from 'recompose';

const styles = () => ({
	accountCircle: {
		width: '60%',
		height: '60%'
	}
});
const LoginButton = ({ classes }) => (
  <IconButton id="login-btn" color="inherit">
    <AccountCircle className={classes.accountCircle} />
  </IconButton>
);

LoginButton.propTypes = {
	classes: PropTypes.object.isRequired
	// login: PropTypes.bool.isRequired
};

// const recomposeEnchancer = withProps(({ history }) => ({ login: () => history.push('/login') }));

export default compose(withRouter, withStyles(styles))(LoginButton);
