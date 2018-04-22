// user sing up
export default `
mutation validateEmail($email: String!, $validationSecret: String!) {
  validateEmail(email: $email, validationSecret: $validationSecret){
    id
    validated
  }
}`;
