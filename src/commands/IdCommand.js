import ProfileCommand from "./ProfileCommand.js";

export default class IdCommand extends ProfileCommand {
  constructor(name = "id", description = "Return the user profile") {
    super(name, description);
  }
}
