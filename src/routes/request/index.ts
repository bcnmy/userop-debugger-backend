import debugUserOp from '../../controller/DebugUserOpController';
import { jsonRPCRouter } from '../../config/router';
import { supportedNetworks } from '../../config';
import { networkConfig } from '../../config/network';

jsonRPCRouter.method("eth_debugUserOperation", async (ctx: any) => {
    const params = ctx.request.body.params;
    const networkId = ctx.params.networkId;
    let result = await debugUserOp.handleParams(networkId, params);
    ctx.body = result;
    ctx.status = 200;
});


// Add other rpc methods here as mentioned above
jsonRPCRouter.method("eth_chains", async (ctx: any) => {
    const data = supportedNetworks.map((network) => ({
        label: networkConfig[network].nativeSymbol,
        value: network,
    }));
    ctx.body = data;
    ctx.status = 200;
});


jsonRPCRouter.method("eth_supportedEntryPoints", async (ctx: any) => {
    const networkId = ctx.params.networkId;
    const data = [{
        label: "EntrypointV6",
        value: networkConfig[networkId].entryPointV6
    }]
    ctx.body = data;
    ctx.status = 200;
});


export default jsonRPCRouter;