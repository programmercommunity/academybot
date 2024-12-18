import BaseCommand from "./BaseCommand.js";
import { getUser } from "../helpers/getUser.js";
import { View } from "../helpers/view.js";

// todo: add mention argument
export default class ProfileCommand extends BaseCommand {
  constructor(name = "profile", description = "Return the user profile") {
    super(name, description);
  }

  async execute(ctx, args = []) {
    try {
     if (ctx.message.reply_to_message) {
       var fetchedUser = await getUser(ctx.message.reply_to_message.from.id, ctx);
     } else {
       var fetchedUser = await getUser(ctx.update.message.from.id, ctx);
     }
      const photo = fetchedUser.profilePhotoId;
      const user = fetchedUser.user;

      const role = {
        "owner": "Owner 🫅",
        "co-owner": "Co Owner 🤴",
        "admin": "Admin 👮‍♂️",
        "co-admin": "Co Admin 🥷",
        "developer": "Developer 🧑‍🏭",
        "pro-programmer": "Pro Programmer 👨‍💻",
        "programmer": "Programmer 🕴️",
        "special-member": "Special Member 🧑🏿‍🦰",
        "member": "Member 👤",
        "": "Member 👤",
      }[user?.status ?? ""] ?? "";

      const variables = {
        name: `${user.firstName} ${user.lastName || ""}`,
        language: user.languageCode?.toUpperCase() || "Unknown",
        role,
        points: user.solutions + user.messageCount || "0",
      };
      variables.mention =
        user.username !== "user" + user.telegramId
          ? "@" + user.username
          : "<a href='tg://user?id=" +
            user.telegramId +
            "'>" +
            variables.name +
            "</a>";

      const profileMessage = await View.render("profile", variables);
      if (photo) {
        ctx.replyWithPhoto(photo, {
          caption: profileMessage,
          parse_mode: "html",
          reply_to_message_id: ctx.message.message_id,
        });
      } else {
        ctx.reply(profileMessage, {
          parse_mode: "html",
          reply_to_message_id: ctx.message.message_id,
        });
      }
    } catch (error) {
      console.error("Failed to execute ProfileCommand:", error);
      await ctx.reply("An error occurred while retrieving your profile.", {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  }
}
