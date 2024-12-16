import { User } from "../models/User.js";
import log from "../helpers/logger.js";

export const messageCounter = async (ctx, next) => {
  try {
    let telegramId = ctx.update.message.from.id;
    let user = await User.findOne({ telegramId });

    if(user){
        user.messageCount += 1;
    }

    await user.save();
  } catch (error) {
    log.error("Error updating message count: " + error);
  }
  await next();
};
