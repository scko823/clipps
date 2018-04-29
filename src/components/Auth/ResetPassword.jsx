import React from 'react';
// import PropTypes from 'prop-types';

// import { withRouter } from 'react-router';
// import { Link } from 'react-router-dom';
// import Grid from 'material-ui/Grid';
// import Button from 'material-ui/Button';
// import FormGroup from 'material-ui/Form/FormGroup';
// import { red } from 'material-ui/colors';
// import { withStyles } from 'material-ui/styles';
// import { compose, withStateHandlers } from 'recompose';

// import { UUIDInput, uuidInputEnhancer } from './UUIDInput';
// import { passwordConfirmEnhancer, PasswordConfirm } from './PasswordConfirm';

// const styles = theme => ({
// 	root: {
// 		margin: `${theme.spacing.unit * 2}px 0`
// 	},
// 	h1: {
// 		margin: `${theme.spacing.unit * 2}px 0`
// 	},
// 	centeredText: {
// 		textAlign: 'center'
// 	},
// 	'cta-btn': {
// 		margin: `${theme.spacing.unit * 2}px 0`
// 	}
// });

// const ForgetPassword = ({ classes }) => (
//   <Grid className={classes.root} container>
//     <Grid item xs={12}>
//       <Grid container justify="center">
//         <Grid item className={classes.centeredText}>
//           <h1 className={classes.h1}>Reset Password</h1>
//           <FormGroup>
//             <TextField
//               autoFocus
//               label="Email"
//               type="email"
//               error={emailError}
//               onBlur={validateEmail}
//               onChange={onFieldChange}
//               helperText={emailError && <span>Must be a valid email</span>}
//             />
//             <TextField label="Password" type="password" onChange={onFieldChange} />
//             <Button
//               variant="raised"
//               label="login"
//               color="primary"
//               onClick={login}
//               disabled={disabled}
//               className={classes['cta-btn']}
//             >
// 							Login
//             </Button>
//             {attempedLogin &&
// 							validationRequired && (
// 								<span>
// 									You must <Link to={`/validate-email/${email}`}>validate</Link>{' '}
// 									your email before login{' '}
// 								</span>
// 							)}
//             {attempedLogin && loginError && <span>Login Fail</span>}
//             <h6>
//               <Link to="/forget-password">Forget password</Link>
//             </h6>
//           </FormGroup>
//         </Grid>
//       </Grid>
//     </Grid>
//   </Grid>
// );

// export default compose(withStyles(styles))(ForgetPassword);

export default () => <h1>Reset Password</h1>;
