import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";
import { processHashtags } from "../photos.utils.js";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagsObj = [];
        if (caption) {
          hashtagsObj = processHashtags(caption)
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagsObj.length > 0 && { hashtags: { connectOrCreate: hashtagsObj, } })
          }
          
        })

      }

    )
  }
}