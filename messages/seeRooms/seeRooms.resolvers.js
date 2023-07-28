import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Query: {
    seeRooms: protectedResolver(
      async (_, __, { loggedInUser }) => {
        const rooms = await client.room.findMany({
          where: { users: { some: { id: loggedInUser.id } } },
        })
        return rooms

      }
    )
  }
}