// user sign up
export default `
mutation signupUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  signupUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName){
    id
  }
}`;
