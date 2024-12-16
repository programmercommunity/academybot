import { User } from '../models/User.js';
import axios from "axios";
import log from './logger.js';

export const getUser = async (telegramId) => {
    let user = await User.findOne({ telegramId });

    if (!user) {
      return false;
    }

    let profilePhoto = user.profilePhoto;

    const fileInfoResponse = await axios.get(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile`,
      {
        params: { file_id: profilePhoto },
      }
    );

    if (!fileInfoResponse.data.ok) {
        log.error("Failed to fetch file information from Telegram");
    }

    const filePath = fileInfoResponse.data.result.file_path;

    const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;

    return { user, profilePhotoUrl: fileUrl };
};
