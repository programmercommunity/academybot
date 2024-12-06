import { saveUser } from "../helpers/saveUser.js";

export const authenticate = async (ctx, next) => {
  const telegramId = ctx.from?.id;
  if (!telegramId) {
    console.error("Failed to authenticate: No user ID in context.");
    return ctx.reply("Authentication failed.");
  }

  try {
    ctx.auth = saveUser(ctx.from, ctx.api);;
    await next();
  } catch (error) {
    console.error("Authentication error:", error);
    ctx.reply("An error occurred during authentication.");
  }
};
