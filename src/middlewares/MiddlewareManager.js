export default class MiddlewareManager {
  constructor(bot) {
    this.bot = bot;
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  async process(ctx, next) {
    let index = -1;

    const run = async (i) => {
      if (i <= index) throw new Error("Middleware called multiple times.");
      index = i;
      const middleware = this.middlewares[i];
      if (middleware) {
        await middleware(ctx, () => run(i + 1));
      } else if (next) {
        await next();
      }
    };

    await run(0);
  }

  attach() {
    this.bot.use(async (ctx, next) => {
      await this.process(ctx, next);
    });
  }
}
