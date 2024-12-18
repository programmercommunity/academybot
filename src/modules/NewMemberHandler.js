import { saveUser } from "../helpers/saveUser.js";

export default class NewMemberHandler {
  constructor(bot) {
    this.bot = bot;
  }

  register() {
    this.bot.on("chat_member", async (ctx) => {
      const status = ctx.update.chat_member.new_chat_member.status;

      if (status === "member") {
        await this.handleNewMember(ctx);
      }
    });

    this.bot.command("start", async (ctx) => {
      const user = await saveUser(ctx.from, ctx.api);
      await ctx.reply(`Hi ${user.firstName}, welcome to the bot! 🎉`);
    });
  }
}
