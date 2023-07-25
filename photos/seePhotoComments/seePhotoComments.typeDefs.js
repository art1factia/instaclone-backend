const typeDefs = `#graphql
  type Query {
    seePhotoComments(id: Int!, lastId:Int): [Comment]
  }
`
export default typeDefs