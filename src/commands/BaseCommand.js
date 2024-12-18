export default class BaseCommand {
  argsType = "array";
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  async execute(ctx, args = []) {
    throw new Error(
      `Command ${this.name} has no execute logic defined. Args: ${args}`
    );
  }
}
