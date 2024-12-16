import { saveUser } from "../helpers/saveUser.js";
import log from "../helpers/logger.js";

export const authenticate = async (ctx, next) => {
  const telegramId = ctx.from?.id;
  if (!telegramId) {
    log.error("Failed to authenticate: No user ID in context. update_id:" + ctx?.update_id);
  }

  try {
    ctx.auth = saveUser(ctx.from, ctx.api);
    await next();
  } catch (error) {
    log.error("Authentication error: " + error + " ::: " + ctx.from?.id);
  }
};
