import client from "../../client.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { protectedResolver } from "../users.utils.js"
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { createWriteStream } from "fs"


const resolverFn = async (_, { firstName, lastName, username, email, password: newPassword, bio, avatar }, { loggedInUser }) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;
    console.log(avatarUrl)
  }
  console.log(avatar)

  let uglyPassword = null
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10)
  }

  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: { firstName, lastName, username, email, ...(uglyPassword && { password: uglyPassword }), bio, ...(avatarUrl && {avatar: avatarUrl}), }
  })
  if (updatedUser.id) {
    return {
      ok: true,
    }
  } else {
    return {
      ok: false,
      error: "could not update profile."
    }
  }
}

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  }
}