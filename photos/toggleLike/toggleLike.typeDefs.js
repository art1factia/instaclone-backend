const typeDefs = `#graphql
  type toggleLikeResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    toggleLike(id: Int!):toggleLikeResult!
  }
`
export default typeDefs