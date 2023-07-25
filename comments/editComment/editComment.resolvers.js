import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";


export default {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { loggedInUser }) => {
        const oldComment = await client.comment.findFirst({
          where: { id, userId: loggedInUser.id },
        })
        if (!oldComment) {
          return {
            ok: false,
            error: "편집 권한이 없습니다."
          }
        } else {
          await client.comment.update({
            where: { id },
            data: { payload }
          })
          return {
            ok: true
          }
        }
      }
    )
  }
}