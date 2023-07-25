const typeDefs = `#graphql
  type Query {
    seePhotoLikes(id: Int!): [User]
  }
`
export default typeDefs