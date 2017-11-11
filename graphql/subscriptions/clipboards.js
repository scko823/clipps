export default `
subscription subClipboard($mutationTypes: [_ModelMutationType!]! ) {
  Clipboard(filter: {
    mutation_in: $mutationTypes
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
