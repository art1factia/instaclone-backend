import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    createComment: protectedResolver(async (_, { photoId, payload }, { loggedInUser }) => {
      const ok = await client.photo.findUnique({ where: { id: photoId }, select: { id: true } })
      if (!ok) {
        return {
          ok: false,
          error: "사진을 찾을 수 없습니다."
        }
      }
      const c = await client.comment.create({
        data: {
          photo: { connect: { id: photoId } },
          user: { connect: { id: loggedInUser.id } },
          payload
        }
      })
      return {
        ok: true
      }

    })
  }
}