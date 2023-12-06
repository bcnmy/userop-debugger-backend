import { Context } from "koa"

export const userOp = async (ctx: Context) => {
    ctx.status = 200;
    ctx.body = {
        message: "OK"
    }
}