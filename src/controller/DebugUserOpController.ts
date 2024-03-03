import { JsonRpcError } from "../types";
import { IJsonRpcController } from "./interface/IJsonRpcController";
import { getErrorDecoderService, getEntryPointContractInstance, getUserOpDecoderService } from "../manager/service-manager";
class DebugUserOpController implements IJsonRpcController {

    async handleParams(networkId: string, params: any[]) {
        console.log("Handling debugUserOp params for networkId: " + networkId);
        let userOperation = params[0];
        let entryPointAddress = params[1] as string; // Assuming the second param is the entry point address
        let errorObject = params[2] as JsonRpcError; // Assuming the third param is the error object
        
        console.log("userOperation: ", userOperation);
        console.log("entryPointAddress: " + entryPointAddress);
        console.log("errorObject: ", errorObject);
    
        let decodedUserOp;
        let decodedErrors;
    
        try {
            let userOpDecoderService = getUserOpDecoderService(networkId);
            if (userOpDecoderService) {
                decodedUserOp = await userOpDecoderService.decodeUserOp({ entryPointAddress, userOp: userOperation, beneficiaryAddress: ""});
            }
        } catch (error) {
            console.error("Error decoding user operation: ", error);
            // Handle or log the error as appropriate
        }
    
        try {
            let errorDecoderService = getErrorDecoderService(networkId);
            let entryPointContractInstance = getEntryPointContractInstance(networkId);
           
            if (errorDecoderService) {
                decodedErrors = await errorDecoderService.decodeError({
                    networkId,
                    entryPointAddress,
                    error: errorObject,
                    userOp: userOperation,
                });
            }
        } catch (error) {
            console.error("Error decoding error object: ", error);
            // Handle or log the error as appropriate
        }
    
        return {
            originalError: errorObject,
            decodedErrors: decodedErrors,
            additionalInfo: {
                entryPointAddress: entryPointAddress,
                userOpDetails: decodedUserOp
            }
        };
    }    
}

export default new DebugUserOpController();