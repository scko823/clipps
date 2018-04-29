// request password reset
export default `
mutation requestPasswordReset($email: String!){
    requestPasswordReset(email:$email){
        email
    }
}`;
