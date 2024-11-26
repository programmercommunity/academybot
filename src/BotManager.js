import { Bot } from "grammy";
import { connectDB } from "./utils/database.js";
import MessageHandler from "./modules/MessageHandler.js";
import NewMemberHandler from "./modules/NewMemberHandler.js";


export class BotManager {
  constructor(token) {
    this.bot = new Bot(token);
    this.modules = [
        new MessageHandler(this.bot),
        new NewMemberHandler(this.bot)
    ];
  }

  registerModules() {
    this.modules.forEach((module) => module.register());
  }

  async start() {
    await connectDB(); // Connect to MongoDB

    this.registerModules();
    this.bot.start();
    console.log("Bot is running...");
  }
}