// user login
export default `
mutation authenticateUser($email: String!, $password: String!) {
  authenticateUser(email: $email, password: $password){
    id,
    token
  }
}`;
