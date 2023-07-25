import client from "../../client.js";

export default {
  Query: {
    seePhotoComments: (_, { id, lastId }) => {
      return client.photo.findUnique({ where: { id } })
      .comments({
        include: { user: true, photo: true },
        take: 2,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } })
      })


    }
  }
}