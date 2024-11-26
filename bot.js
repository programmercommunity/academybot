import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use((ctx, next) => {
  console.log(`Received message: ${ctx.message.text} in chat: ${ctx.chat.id}`);
  return next();
});

bot.on("text", (ctx) => {
  if (ctx.chat.type === "group" || ctx.chat.type === "supergroup") {
    ctx.reply(`You said: "${ctx.message.text}"`);
  }
});
bot.launch();
console.log("Bot is running...");
