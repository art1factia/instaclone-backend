import client from "../client.js";

export default {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) => client.message.findMany({
      where: { roomId: id },
      take: 2,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } })
    }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0
      } else {
        client.message.count({ where: { read: false, roomId: id, userId: { not: loggedInUser.id } } })
      }
    }
  }
}