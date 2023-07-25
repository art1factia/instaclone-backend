import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";
import { processHashtags } from "../photos.utils.js";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser }) => {
        const oldPhoto = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
          include: { hashtags: { select: { hashtag: true } } }
        })
        if (!oldPhoto) {
          return {
            ok: false,
            error: "편집 권한이 없습니다."
          }
        }
        const photo = await client.photo.update({
          where: { id },
          data: { caption, hashtags:
            { disconnect: oldPhoto.hashtags,
            connectOrCreate: processHashtags(caption)} }
        })
        return {
          ok: true
        }
      }
    )
  }
}