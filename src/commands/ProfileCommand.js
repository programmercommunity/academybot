import BaseCommand from "./BaseCommand.js";
import { getUser } from "../helpers/getUser.js";
import { View } from "../helpers/view.js";

export default class ProfileCommand extends BaseCommand {
  constructor(name = "profile", description = "Return the user profile") {
    super(name, description);
  }

  async execute(ctx, args = []) {
    try {
      const fetchedUser = await getUser(ctx.update.message.from.id, ctx);

      const photo = fetchedUser.profilePhotoId;
      const user = fetchedUser.user;

      const variables = {
        name: `${user.firstName} ${user.lastName || ""}`,
        username: user.username || "N/A",
        language: user.languageCode?.toUpperCase() || "Unknown",
        role: user.status || "Member",
        points: user.solutions + user.messageCount || 0,
      };

      const profileMessage = await View.render("profile", variables);

      if (photo) {
        await ctx.replyWithPhoto(photo, {
          caption: profileMessage,
          parse_mode: "Markdown",
          reply_to_message_id: ctx.message.message_id,
        });
      } else {
        await ctx.reply(profileMessage, {
          parse_mode: "Markdown",
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
