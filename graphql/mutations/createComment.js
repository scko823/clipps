// create a clip comment
export default `
mutation createClipComment($clipId: ID!, $authorId: ID!, $content: String!) {
  createComment(content: $content, clipId: $clipId, authorId: $authorId){
    id
    content
    createdAt
  }
}`;
