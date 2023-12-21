import { UserOperation, SmartAccountInfo, IntentInfo } from "../../../../types";
import { ISmartAccountDecoder } from "../../interface/ISmartAccountDecoder";

class BiconomySADecoder implements ISmartAccountDecoder {
        
        async decodeSmartAccount(userOp: UserOperation): Promise<SmartAccountInfo> {
            throw new Error("Method not implemented.");
        }
        
        async decodeIntent(userOp: UserOperation): Promise<IntentInfo> {
            throw new Error("Method not implemented.");
        }
}