const typeDefs = `#graphql
  type Query {
    searchPhotos (keyword:String!): [Photo]
  }

`
export default typeDefs