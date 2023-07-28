const typeDefs = `#graphql
  type Mutation {
    sendMessage(payload:String!, roomId: Int, userId: Int): MutationResponse
  }
`
export default typeDefs
