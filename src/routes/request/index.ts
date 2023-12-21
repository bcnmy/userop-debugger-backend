import bodyParser from 'koa-bodyparser';
import debugUserOp from '../../controller/DebugUserOpController';

const Jsonrpc = require('@koalex/koa-json-rpc');

export const debugUserOpRequest = new Jsonrpc({
    bodyParser: bodyParser({
        onerror: (_, ctx) => {
            ctx.status = 200;
            ctx.body = Jsonrpc.parseError;
        }
    })
});

debugUserOpRequest.method("eth_debugUserOperation", async (ctx: any) => {
    const params = ctx.request.body.params;
    let result = await debugUserOp.handleParams(params);
    ctx.body = result;
    ctx.status = 200;
});

// Add other rpc methods here as mentioned above

export default debugUserOpRequest;