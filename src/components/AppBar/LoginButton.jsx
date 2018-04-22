import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router';
import IconButton from 'material-ui/IconButton';
import PersonPin from 'material-ui-icons/PersonPin';
import { compose, withProps } from 'recompose';

const styles = () => ({
	icons: {
		width: '60%',
		height: '60%'
	}
});
const LoginButton = ({ classes, login }) => (
  <IconButton id="login-btn" onClick={login} color="inherit">
    <PersonPin className={classes.icons} />
  </IconButton>
);

LoginButton.propTypes = {
	classes: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired
};

const recomposeEnchancer = withProps(({ history }) => ({ login: () => history.push('/login') }));

export default compose(withRouter, recomposeEnchancer, withStyles(styles))(LoginButton);
