// create a clip comment
export default `
mutation createComment($clipId: ID!, $authorId: ID!, $content: String!) {
  createComment(content: $content, clipId: $clipId, authorId: $authorId){
    id
    content
    createdAt
  }
}`;
