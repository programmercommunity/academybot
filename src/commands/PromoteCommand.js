import BaseCommand from "./BaseCommand.js";
import { View } from "../helpers/view.js";

export default class SayCommand extends BaseCommand {
  constructor(name = "promote", description = "promote user") {
    super(name, description);
  }

  async execute(ctx, args) {
    const message = args;
    await ctx.reply(message);
  }
}
