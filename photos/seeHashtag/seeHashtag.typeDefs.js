const typeDefs = `#graphql
  type Query {
    seeHashtag(hashtag: String!): Hashtag
  }
`
export default typeDefs