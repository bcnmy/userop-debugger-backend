import { Context } from "koa";

export default async (ctx: Context, next: Function) => {
    return next().catch((err: any) => {
        const { statusCode, message, key, ...meta } = err;

        ctx.type = "json";
        ctx.status = statusCode || 500;
        ctx.body = {
            status: "error",
            code: statusCode,
            message,
            key,
            meta,
        };

        ctx.app.emit("error", err, ctx);
    });
};