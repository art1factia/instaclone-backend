import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Query: {
    seeRoom: protectedResolver((_, { id }, { loggedInUser }) => {
      client.room.findFirst({ where: { id, users: { some: { id: loggedInUser.id } } } })
    })
  }
}