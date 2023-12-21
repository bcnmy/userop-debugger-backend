import bodyParser from 'koa-bodyparser';
const Jsonrpc = require('@koalex/koa-json-rpc');

export const debugUserOpRequest = new Jsonrpc({
    bodyParser: bodyParser({
        onerror: (_, ctx) => {
            ctx.status = 200;
            ctx.body = Jsonrpc.parseError;
        }
    })
});

debugUserOpRequest.method("eth_debugUserOperation", (ctx: any, next: Function) => {
    ctx.body = "OK";
    ctx.status = 200;

    next();
});

export default debugUserOpRequest;