import { Context } from "koa";

export default () => async (ctx: Context, next: Function) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("x-response-time", `${ms}ms`);
};