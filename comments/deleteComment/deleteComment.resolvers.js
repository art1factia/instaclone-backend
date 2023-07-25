import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({ where: { id }, select: { userId: true } })
      if (!comment) {
        return {
          ok: false,
          error: "댓글을 찾을 수 없습니다."
        }

      } else if (comment.userId != loggedInUser.id) {
        return {
          ok: false,
          error: "승인되지 않은 사용자입니다."
        }
      } else {
        await client.comment.delete({ where: { id } })
        return {
          ok: true
        }
      }
    })
  }
}