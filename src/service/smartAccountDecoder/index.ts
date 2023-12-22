import { UserOperation, SmartAccountInfo, IntentInfo } from "../../types";
import { ISmartAccountDecoder } from "./interface/ISmartAccountDecoder";

export type SmartAccountDecoderConfig = {
    networkId: string;
}
export class SmartAccountDecoderService implements ISmartAccountDecoder {
        
    networkId: string;

    constructor(config: SmartAccountDecoderConfig) {
        this.networkId = config.networkId;
    }

    async decodeSmartAccount(userOp: UserOperation): Promise<SmartAccountInfo> {
        console.log(userOp);
        // Use SmartAccountDecoder factory to get correct implementation of SmartAccountDecoder then 
        // call decodeSmartAccount method on it
        throw new Error("Method not implemented.");
    }
    
    async decodeIntent(userOp: UserOperation): Promise<IntentInfo> {
        console.log(userOp);
        // Use SmartAccountDecoder factory to get correct implementation of SmartAccountDecoder then
        // call decodeIntent method on it
        throw new Error("Method not implemented.");
    }
}