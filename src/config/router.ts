import bodyParser from 'koa-bodyparser';
const Jsonrpc = require('@koalex/koa-json-rpc');

export const jsonRPCRouter = new Jsonrpc({
    bodyParser: bodyParser({
        onerror: (_, ctx) => {
            ctx.status = 200;
            ctx.body = Jsonrpc.parseError;
        }
    })
});