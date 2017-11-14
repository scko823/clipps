export default `subscription subscribeClipUpdate($clipboardId: ID!) {
  Clip(filter: {
    mutation_in: [CREATED, UPDATED, DELETED],
    node: {
      clipboard: {id: $clipboardId}
    }
  }) {
    mutation
    node {
      content
      id
      name
    }
    updatedFields
    previousValues {
      content
      id
      name
    }
  }
}

`;
