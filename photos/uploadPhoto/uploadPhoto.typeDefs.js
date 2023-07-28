const typeDefs = `#graphql
  scalar Upload

  type Mutation {
    uploadPhoto(
      file: Upload!,
      caption: String
    ): Photo!
  }

`
export default typeDefs