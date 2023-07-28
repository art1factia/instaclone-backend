const typeDefs = `#graphql
  type Photo {
    id: Int!
    user: User!
    file: Upload!
    caption: String
    hashtags: [Hashtag]
    comments: Int!
    createdAt: String!
    updatedAt: String!
    likes: Int!
    isMine: Boolean!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    user: User!
    createdAt: String!
    updatedAt: String!

  }

`

export default typeDefs