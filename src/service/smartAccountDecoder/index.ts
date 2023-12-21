import { UserOperation, SmartAccountInfo, IntentInfo } from "../../types";
import { ISmartAccountDecoder } from "./interface/ISmartAccountDecoder";

class SmartAccountDecoderService implements ISmartAccountDecoder {
        
        async decodeSmartAccount(userOp: UserOperation): Promise<SmartAccountInfo> {
            // Use SmartAccountDecoder factory to get correct implementation of SmartAccountDecoder then 
            // call decodeSmartAccount method on it
            throw new Error("Method not implemented.");
        }
        
        async decodeIntent(userOp: UserOperation): Promise<IntentInfo> {
            // Use SmartAccountDecoder factory to get correct implementation of SmartAccountDecoder then
            // call decodeIntent method on it
            throw new Error("Method not implemented.");
        }
}