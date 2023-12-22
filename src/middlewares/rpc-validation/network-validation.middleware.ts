import { supportedNetworks } from "../../config";
import { Context } from "koa";

export const validateNetworkId = async (ctx: Context, next: Function) => {
    const { networkId } = ctx.params;

    if (supportedNetworks.includes(networkId)) {
        await next(); // Proceed to the next middleware if the network is supported
    } else {
        ctx.status = 400;
        ctx.body = { 
            error: `Network '${networkId}' is not supported.`,
            supportedNetworks: supportedNetworks
        };
    }
};

module.exports = {
    validateNetworkId
};