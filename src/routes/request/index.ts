import debugUserOp from '../../controller/DebugUserOpController';
import { jsonRPCRouter } from '../../config/router';

jsonRPCRouter.method("eth_debugUserOperation", async (ctx: any) => {
    const params = ctx.request.body.params;
    const networkId = ctx.params.networkId;
    let result = await debugUserOp.handleParams(networkId, params);
    ctx.body = result;
    ctx.status = 200;
});

// Add other rpc methods here as mentioned above

export default jsonRPCRouter;