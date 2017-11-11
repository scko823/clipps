export default `subscription {
  Clipboard(filter: {
    mutation_in: [CREATED, UPDATED, DELETED]
  }) {
    mutation
    updatedFields
    previousValues{
      id
      name
    }
  }
}
`
