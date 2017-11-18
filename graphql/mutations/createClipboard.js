// create a clipboard by name
export default `
mutation createNewClipboard($name: String!){
  createClipboard(name: $name){
    name
    id
  }
}
`
