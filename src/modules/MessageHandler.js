
export default class MessageHandler {
  constructor(bot) {
    this.bot = bot;
  }

  register() {
    this.bot.on("message:text", (ctx) => {
      const userMessage = ctx.message.text;
      ctx.reply(`You said: "${userMessage}"`);
    });
  }
}
