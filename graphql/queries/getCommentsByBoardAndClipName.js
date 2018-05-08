// get a clip's comments by its clipboardName and clipName
export default `
query getCommentsByClip($clipName: String!, $clipboardName: String!, $pageSize: Int!, $skip: Int!) {
  allComments(first: $pageSize, skip:$skip, filter: {
    clip: {
      name: $clipName,
      clipboard: {
        name: $clipboardName
      }
    }
  }){
    content
    createdAt
    updatedAt
    id
    clip {
        id
    }
    author {
      id
      firstName
      lastName
    }
  }
}
`;
