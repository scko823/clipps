// // reset password
export default `
mutation resetPassword($pwRestSecret: String!, $password: String!){
    resetPassword(pwRestSecret: $pwRestSecret, password: $password){
        id
    }
}`;
