import { User } from "../models/User.js";
import axios from "axios";
import log from "./logger.js";

export const getUser = async (telegramId, ctx = null) => {
  let user = await User.findOne({ telegramId });

  if (!user) {
    return false;
  }

  if (ctx) {
    const updatedUserData = {
      firstName: ctx.from.first_name || user.firstName,
      username: ctx.from.username || user.username,
    };

    if (
      updatedUserData.firstName !== user.firstName ||
      updatedUserData.username !== user.username
    ) {
      user.firstName = updatedUserData.firstName;
      user.username = updatedUserData.username;
      await user.save();
    }

    let profilePhoto = user.profilePhoto;
    let fileUrl = null;

    if (profilePhoto) {
      try {
        const userPhotos = await ctx.api.getUserProfilePhotos(telegramId);

        if (userPhotos.total_count === 0) {
          user.profilePhoto = null;
          await user.save();
          profilePhoto = null;
        } else {
          const latestPhoto = userPhotos.photos[0][0];
          profilePhoto = latestPhoto.file_id;

          const fileInfoResponse = await axios.get(
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile`,
            {
              params: { file_id: profilePhoto },
            }
          );

          if (!fileInfoResponse.data.ok) {
            log.error("Failed to fetch file information from Telegram");
          } else {
            const filePath = fileInfoResponse.data.result.file_path;
            fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
          }
        }
      } catch (error) {
        log.error("Error validating or fetching profile photo:", error);
        profilePhoto = null;
      }
    }

    return {
      user,
      profilePhotoUrl: fileUrl,
      profilePhotoId: profilePhoto ?? null,
    };
  } else {
    let fileUrl = null;

    if (user.profilePhoto) {
      try {
        const fileInfoResponse = await axios.get(
          `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile`,
          {
            params: { file_id: user.profilePhoto },
          }
        );

        if (fileInfoResponse.data.ok) {
          const filePath = fileInfoResponse.data.result.file_path;
          fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
        }
      } catch (error) {
        log.error("Error fetching profile photo without ctx:", error);
      }
    }

    return {
      user,
      profilePhotoUrl: fileUrl,
      profilePhotoId: user.profilePhoto ?? null,
    };
  }
};
