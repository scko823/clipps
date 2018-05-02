// query for getting all clips in one clipboard
export default `
query getClips($clipboardName: String!) {
  allClips(filter: {
    clipboard: {
      name: $clipboardName
    }
  }){
    id
    name
    content
    createdAt
    owner {
        firstName
        lastName
    }
  }
  Clipboard(name: $clipboardName){
    id
  }
}
`;
