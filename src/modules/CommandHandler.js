import HelloCommand from "../commands/HelloCommand.js";
import ProfileCommand from "../commands/ProfileCommand.js";
import BaseCommand from "../commands/BaseCommand.js";

export default class CommandHandler {
  constructor(bot) {
    this.bot = bot;
    this.commands = [
      new HelloCommand(),
      new ProfileCommand(),
    ];
  }

  register() {
    this.commands.forEach((command) => {
      this.bot.command(command.name, async (ctx) => {
        await command.execute(ctx);
      });
      console.log(`Command registered: ${command.name}`);
    });

    console.log(`${this.commands.length} commands registered.`);
  }
}
