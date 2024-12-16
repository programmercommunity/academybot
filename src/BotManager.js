import { Bot } from "grammy";
import { connectDB } from "./utils/database.js";
import MessageHandler from "./modules/MessageHandler.js";
import NewMemberHandler from "./modules/NewMemberHandler.js";
import CommandManager from "./modules/CommandHandler.js";
import MiddlewareManager from "./middlewares/MiddlewareManager.js";
import { authenticate } from "./middlewares/AuthenticateMiddleware.js";
import { messageCounter } from "./middlewares/MessageCounterMiddleware.js";


export class BotManager {
  constructor(token) {
    this.bot = new Bot(token);
    this.middlewareManager = new MiddlewareManager(this.bot);
    this.modules = [
      new CommandManager(this.bot),
      new NewMemberHandler(this.bot),
    ];
  }

  registerMiddlewares() {
    this.middlewareManager.use(authenticate);
    this.middlewareManager.use(messageCounter);
    this.middlewareManager.attach();
  }

  registerModules() {
    this.modules.forEach((module) => module.register());
  }

  async start() {
    await connectDB();
    this.registerMiddlewares();
    this.registerModules();

    this.bot.start();
    console.log("Bot is running...");
  }
}
