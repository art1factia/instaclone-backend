import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    sendMessage: protectedResolver(async (_, { payload, roomId, userId }, { loggedInUser }) => {
      let room = null
      if (userId) {
        const user = await client.user.findUnique({ where: { id: userId }, select: { id: true } })
        if (!user) {
          return {
            ok: false,
            error: "사용자를 찾을 수 없습니다."
          }
        } else {
          room = await client.room.create({ data: { users: { connect: [{ id: userId }, { id: loggedInUser.id }] } } })
        }
      } else if (roomId) {
        room = await client.room.findUnique({ where: { id: roomId }, select: { id: true } })
        if (!room) {
          return {
            ok: false,
            error: "대화방을 찾을 수 없습니다."
          }
        }
      }
      const newMessage = await client.message.create({
        data: {
          payload,
          users: { connect: { id: loggedInUser.id } },
          room: { connect: { id: room.id } },
        }
      })
      return {
        ok: true
      }
    })
  }
}