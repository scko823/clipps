// create a subscription for clip comments
export default `
subscription subscribeClipComment($clipboardName: String!, $clipName: String!) {
    Comment(filter: {
        mutation_in: [CREATED, UPDATED, DELETED],
        node: {
            clip: {
                name: $clipName
                clipboard: {
                    name: $clipboardName
                }
            }
        }
    }) {
        mutation
        node {
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
        previousValues {
            content
            id
        }
    }
}

`
