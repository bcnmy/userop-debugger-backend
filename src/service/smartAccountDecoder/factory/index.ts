import { getSmartAccountResolver } from "../../../manager/service-manager";
import { UserOperation } from "../../../types";
import { ISmartAccountDecoder } from "../interface/ISmartAccountDecoder";
import { ISmartAccountResolver } from "../interface/ISmartAccountResolver";

export class SmartAccountDecoderFactory {

    /**
     * This method checks which SA provider should be returned basis sender and initCode of userOp.
     * @param networkId Network id where userOp is to be executed
     * @param userOp UserOperation object
     */
    static async getSmartAccountDecoder(networkId: string, userOp: UserOperation): Promise<ISmartAccountDecoder> {

        // Get smart account resolver map from config
        let saResolverArray = getSmartAccountResolver(networkId);
        if(!saResolverArray) {
            throw new Error(`No smart account resolver found for networkId: ${networkId}`);
        }

        // Wrap the resolver logic to always resolve (never reject)
        const resolveIfSuitable = async (resolver: ISmartAccountResolver): Promise<ISmartAccountDecoder | undefined> => {
            try {
                return await resolver.resolve(userOp);
            } catch (error) {
                // Return undefined or handle error as appropriate
                return undefined;
            }
        };

        // Run all resolvers in parallel
        const results = await Promise.all(saResolverArray.map(resolveIfSuitable));

        // Find the first defined (non-undefined) resolver
        const suitableDecoder = results.find(result => result !== undefined);

        if (!suitableDecoder) {
            throw new Error("No suitable smart account decoder found for the provided userOp.");
        }

        return suitableDecoder;
    }
}