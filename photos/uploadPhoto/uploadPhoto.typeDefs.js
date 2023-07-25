const typeDefs = `#graphql
  scalar Upload

  type Mutation {
    uploadPhoto(
      file: String!,
      caption: String
    ): Photo!
  }

`
export default typeDefs