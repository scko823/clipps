// user sing up
export default `
mutation signupUser($email: String!, $password: String!) {
  signupUser(email: $email, password: $password){
    id
  }
}`;
