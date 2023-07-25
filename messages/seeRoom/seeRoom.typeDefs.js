const typeDefs = `#graphql
  type Query {
    seeRoom(id:Int!):Room
  }
`
export default typeDefs