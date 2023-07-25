const typeDefs = `#graphql
  type Mutation {
    createComment(photoId: Int!, payload:String!): MutationResponse!
  }
`
export default typeDefs