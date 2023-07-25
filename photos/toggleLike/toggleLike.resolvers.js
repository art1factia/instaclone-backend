import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({ where: { id } })
      if (!photo) {
        return {
          ok: false,
          error: "사진을 찾을 수 없습니다"
        }
      }
      const like = await client.like.findUnique({
        where: { photoId_userId: { photoId: id, userId: loggedInUser.id } }
      })
      if (like) {
        await client.like.delete({
          where: { photoId_userId: { photoId: id, userId: loggedInUser.id } }
        })
        console.log(like)
      } else {
        await client.like.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            photo: { connect: { id: photo.id } }
          }
        })
      }
      return {
        ok: true
      }

    })
  }
}