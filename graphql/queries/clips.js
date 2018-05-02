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
  }
  Clipboard(name: $clipboardName){
    id
  }
}
`;
