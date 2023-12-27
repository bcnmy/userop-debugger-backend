import { JsonRpcError } from "../types";
import { IJsonRpcController } from "./interface/IJsonRpcController";
import { getUserOpDecoderService } from "../manager/service-manager";
class DebugUserOpController implements IJsonRpcController {

    async handleParams(networkId: string, params: any[]) {
        console.log("Handling debugUserOp params for networkId: " + networkId);
        let userOperation = params[0];
        let entryPointAddress = params[1] as string; // Assuming the second param is the entry point address
        let errorObject = params[2] as JsonRpcError; // Assuming the third param is the error object
        console.log(errorObject);
        
        let userOpDecoderService = getUserOpDecoderService(networkId);
        let decodedUserOp = await userOpDecoderService?.decodeUserOp({entryPointAddress, userOp: userOperation});
        console.log(decodedUserOp);
        // Call respective service files here like userOpDecoder, errorDecoder and recommendation service
        return {
            originalError: errorObject,
            additionalInfo: {
                entryPointAddress: entryPointAddress,
                userOpDetails: decodedUserOp
            }
        };
    }
}

export default new DebugUserOpController();