// // reset password
export default `
mutation resetPassword($pwResetSecret: String!, $password: String!){
    resetPassword(pwResetSecret: $pwResetSecret, password: $password){
        id
    }
}`;
