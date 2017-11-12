export default `
subscription  {
  Clipboard(filter: {
    mutation_in:  [CREATED, DELETED, UPDATED],
  }) {
    mutation
    node {
      id
      name
    }
    updatedFields
    previousValues{
      id
      name
    }
  }
}
`
