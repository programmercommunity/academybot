import { BotManager } from "./src/BotManager.js";
import dotenv from "dotenv";

dotenv.config();

const botManager = new BotManager(process.env.BOT_TOKEN);
botManager.start();
