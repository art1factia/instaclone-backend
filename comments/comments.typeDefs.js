const typeDefs = `#graphql
  type Comment {
    id: Int!
    user: User
    photo: Photo
    payload: String!
    isMine: Boolean!
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    likes: Int!
  }
`
export default typeDefs