import { UserOperation, SmartAccountInfo, IntentInfo } from "../../types";
import { isDeploymentTransaction, isFirstTransaction } from "../../utils";
import { SmartAccountDecoderFactory } from "./factory";
import { ISmartAccountDecoder } from "./interface/ISmartAccountDecoder";

export type SmartAccountDecoderConfig = {
    networkId: string;
}
/**
 * SmartAccountDecoderService is the implementation of ISmartAccountDecoder.
 * This class is responsible for decoding the user operation and returning the Smart Account information.
 * It uses SmartAccountDecoderFactory to get the correct implementation of SmartAccountDecoder and then
 * calls decodeSmartAccount method on it.
 * If no decoder is found for the given user operation, it tries to decode the generic information from the user operation.
 */
export class SmartAccountDecoderService implements ISmartAccountDecoder {
        
    networkId: string;

    constructor(config: SmartAccountDecoderConfig) {
        this.networkId = config.networkId;
    }

    async decodeSmartAccount(userOp: UserOperation): Promise<SmartAccountInfo> {
        let smartAccountInfo: SmartAccountInfo;
        let smartAccountDecoder = await SmartAccountDecoderFactory.getSmartAccountDecoder(this.networkId, userOp);
        if(smartAccountDecoder) {
            smartAccountInfo = await smartAccountDecoder.decodeSmartAccount(userOp);
        } else {
            smartAccountInfo = {
                smartAccountAddress: userOp.sender,
                firstTransaction: isFirstTransaction(userOp),
                deploymentTransaction: isDeploymentTransaction(userOp),
            };
        }
        return smartAccountInfo;
    }
    
    async decodeIntent(userOp: UserOperation): Promise<IntentInfo> {
        let intentInfo: IntentInfo;
        let smartAccountDecoder = await SmartAccountDecoderFactory.getSmartAccountDecoder(this.networkId, userOp);
        if(smartAccountDecoder) {
            intentInfo = await smartAccountDecoder.decodeIntent(userOp);
        } else {
            throw new Error("No SmartAccountDecoder found for the given user operation.");
        }
        return intentInfo;
    }
}