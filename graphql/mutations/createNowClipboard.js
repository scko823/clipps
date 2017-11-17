// create Now clipboard
export default `
mutation createNowBoard {
  createClipboard(name: "NOW"){
    id
    name
  }
}`
