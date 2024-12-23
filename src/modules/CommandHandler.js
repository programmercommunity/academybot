import IdCommand from "../commands/IdCommand.js";
import SayCommand from "../commands/SayCommand.js";
import HelloCommand from "../commands/HelloCommand.js";
import ProfileCommand from "../commands/ProfileCommand.js";
import BaseCommand from "../commands/BaseCommand.js";

export default class CommandHandler {
  constructor(bot) {
    this.bot = bot;
    this.commands = [
      new HelloCommand(),
      new ProfileCommand(),
      new IdCommand(),
      new SayCommand(),
    ];
  }

  register() {
    this.commands.forEach((command) => {
      this.bot.command(command.name, async (ctx) => {
        const messageText = ctx.message.text || "";

        if(command.argsType == "array")
        {
          var args = messageText
            .replace(/^\/\S+\s*/, "")
            .replace(/\s+/g, " ") // remove double spaces/tabs
            .trim()
            .split(" ");
        } else {
          var args = messageText.replace(/^\/\S+\s*/, "");
        }
        await command.execute(ctx, args);
      });
      console.log(`Command registered: ${command.name}`);
    });

    console.log(`${this.commands.length} commands registered.`);
  }
}
