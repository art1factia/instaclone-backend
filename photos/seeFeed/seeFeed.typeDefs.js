const typeDefs = `#graphql
  type Query {
    seeFeed(lastId: Int): [Photo]
  }

`
export default typeDefs