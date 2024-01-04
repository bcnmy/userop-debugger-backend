import { getErrorResolvers } from "../../../manager/service-manager";
import { UserOperation, JsonRpcError } from "../../../types";
import { IErrorDecoder } from "../interface/IErrorDecoder";
import { IErrorResolver } from "../interface/IErrorResolver";

export type ErrorDecoderFactoryParam = {
    entryPointAddress: string;
    networkId: string;
    userOp: UserOperation;
    error: JsonRpcError;
}

/**
 * ErrorDecoderFactory is responsible for returning the correct Error Decoder for a given 
 * user operation, error object and network id.
 * It gets all registered Error resolvers from the config and runs them in parallel to find all
 * Error Decoders that can handle the error object and given userOp.
 */
export class ErrorDecoderFactory {

    static async getErrorDecoders(param: ErrorDecoderFactoryParam) : Promise<(IErrorDecoder | undefined)[]> {
        let { networkId, userOp, error } = param;

        // Get smart account resolver map from config
        let errorResolverArray = getErrorResolvers(networkId);
        if(!errorResolverArray) {
            throw new Error(`No error resolver found for networkId: ${networkId}`);
        }
        console.log(`getErrorDecoders: Found ${errorResolverArray.length} error resolvers for networkId: ${networkId}`);

        // Wrap the resolver logic to always resolve (never reject)
        const resolveIfSuitable = async (resolver: IErrorResolver): Promise<IErrorDecoder | undefined> => {
            try {
                return await resolver.resolve({
                    userOp,
                    error
                });
            } catch (error) {
                // Return undefined or handle error as appropriate
                return undefined;
            }
        };

        // Run all resolvers in parallel
        const results = await Promise.all(errorResolverArray.map(resolveIfSuitable));

        // Find all (non-undefined) resolvers
        const suitableDecoders = results.filter(result => result !== undefined);
        console.log(`getErrorDecoders: Found ${suitableDecoders.length} suitable error decoders for networkId: ${networkId}`);

        if (suitableDecoders.length === 0) {
            throw new Error("No suitable error decoders found for the provided userOp and error object.");
        }

        return suitableDecoders;
    }
}