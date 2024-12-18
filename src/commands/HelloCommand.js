import BaseCommand from "./BaseCommand.js";
import { View } from "../helpers/view.js";

export default class HelloCommand extends BaseCommand {
  constructor(name = "hello", description = "Say hello to the bot") {
    super(name, description);
  }

  async execute(ctx, args = []) {
    const helloMessage = await View.render("hello");
    await ctx.reply(helloMessage);
  }
}
