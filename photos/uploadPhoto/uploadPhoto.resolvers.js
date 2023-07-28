import client from "../../client.js";
import { uploadToS3 } from "../../shared/shared.utils.js";
import { protectedResolver } from "../../users/users.utils.js";
import { processHashtags } from "../photos.utils.js";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagsObj = [];
        const fileURL = await uploadToS3(file, loggedInUser.id, "uploads")
        if (caption) {
          hashtagsObj = processHashtags(caption)
        }
        return await client.photo.create({
          data: {
            file: fileURL,
            caption,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagsObj.length > 0 && { hashtags: { connectOrCreate: hashtagsObj, } })
          }
        })

      }

    )
  }
}