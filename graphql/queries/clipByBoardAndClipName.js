// get a clip by its clipboardName and clipName
// TODO: make resolver for this?
export default `query getClip($clipboardName: String!, $clipName: String!){
  allClips(filter: {
    name: $clipName,
    clipboard: {
      name: $clipboardName,
    }
  }){
    content
    name
    owner {
        lastName
        firstName
    }
  }
}`;
