import { User } from "../models/User.js";

export default class NewMemberHandler {
  constructor(bot) {
    this.bot = bot;
  }

  async handleNewMember(ctx) {
    const newMember = ctx.update.chat_member.new_chat_member.user;
    const userId = newMember.id;
    const firstName = newMember.first_name;
    const username = newMember.username || `user${userId}`;

    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({
        userId,
        firstName,
        username,
        joinedAt: new Date(),
        lastActiveAt: new Date(),
      });
      await user.save();
      console.log(`New user added: ${username}`);
    }

    await ctx.reply(`Welcome, ${firstName}! Glad to have you here. 🎉`);
  }

  register() {
    this.bot.on("chat_member", async (ctx) => {
      const status = ctx.update.chat_member.new_chat_member.status;

      if (status === "member") {
        await this.handleNewMember(ctx);
      }
    });
  }
}
