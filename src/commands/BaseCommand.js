export default class BaseCommand {
  constructor(name, description) {
    this.name = name;
    this.description = description; 
  }

  async execute(ctx) {
    throw new Error(`Command ${this.name} has no execute logic defined.`);
  }
}
