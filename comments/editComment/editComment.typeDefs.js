const typeDefs = `#graphql
  type editCommentResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editComment(id:Int!, payload:String!): editCommentResult!
  }
`
export default typeDefs