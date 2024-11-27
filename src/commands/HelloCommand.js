import BaseCommand from "./BaseCommand.js";

export default class HelloCommand extends BaseCommand {
  constructor() {
    super("hello", "Say hello to the bot");
  }

  async execute(ctx) {
    await ctx.reply("Hello! How can I help you?");
  }
}
