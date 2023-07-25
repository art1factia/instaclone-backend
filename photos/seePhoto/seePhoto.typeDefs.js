const typeDefs = `#graphql
  type Query {
    seePhoto(id: Int!): Photo
  }
`
export default typeDefs