import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const message = await client.message.findFirst({
        where:
        {
          id,
          userId: { not: loggedInUser.id },
          room: { users: { some: { id: loggedInUser.id } } }
        },
        select: { id: true }
      })
      if (!message) {
        return {
          ok: false,
          error: "읽을 수 있는 메세지가 존재하지 않습니다."
        }
      }
      await client.message.update({ where: {id}, data: { read: true } })
      return {
        ok: true
      }
    })
  }
}