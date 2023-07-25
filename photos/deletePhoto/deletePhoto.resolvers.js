import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({ where: { id }, select: { userId: true } })
      if (!photo) {
        return {
          ok: false,
          error: "사진을 찾을 수 없습니다."
        }

      } else if (photo.userId != loggedInUser.id) {
        return {
          ok: false,
          error: "승인되지 않은 사용자입니다."
        }
      } else {
        await client.photo.delete({ where: { id } })
        return {
          ok: true
        }
      }
    })
  }
}