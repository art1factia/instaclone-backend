const typeDefs = `#graphql
  type editPhotoResult {
    ok: Boolean!
    error: String

  }
  type Mutation {
    editPhoto(id: Int!, caption:String!): editPhotoResult!
  }
`
export default typeDefs