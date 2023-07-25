const typeDefs = `#graphql
  type Mutation {
    readMessage(id:Int):MutationResponse!
  }
`
export default typeDefs