import BaseCommand from "./BaseCommand.js";
import { View } from "../helpers/view.js";

export default class SayCommand extends BaseCommand {
  argsType = "singular";
  constructor(name = "say", description = "make the bot repeat the word sent") {
    super(name, description);
  }

  async execute(ctx, args) {
    const message = args;
    await ctx.reply(message);
  }
}
