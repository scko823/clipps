// crete a new clip in a particular clipboard
export default `
mutation createClip($content: String!, $name: String!, $clipboardId: ID!, $user_id: ID!) {
  createClip(content: $content, name: $name, clipboardId: $clipboardId, ownerId: $user_id) {
    id
  }
}
`;
