import BaseCommand from "./BaseCommand.js";
import { getUser } from "../helpers/getUser.js";

export default class ProfileCommand extends BaseCommand {
  constructor() {
    super("profile", "Return the user profile");
  }

  async execute(ctx) {
    let user = await getUser(ctx.update.message.from.id);
    let photo = user.profilePhotoUrl;
    user = user.user;


    const profileMessage = `
**Name:** ${user.firstName} ${user.lastName || ""}
**Username:** @${user.username || "N/A"}
**Language:** ${user.languageCode?.toUpperCase() || ""}
**Role:** ${user.status}
**Points:** ${user.solutions + user.messageCount}
    `;

    ctx.reply(profileMessage, { parse_mode: "Markdown" });
  }
}
