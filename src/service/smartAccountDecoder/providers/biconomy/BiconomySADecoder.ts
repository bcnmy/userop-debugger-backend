import { UserOperation, SmartAccountInfo, IntentInfo, BiconomySAVersion } from "../../../../types";
import { ISmartAccountDecoder } from "../../interface/ISmartAccountDecoder";

export class BiconomySADecoderV2 implements ISmartAccountDecoder {
    
    version: BiconomySAVersion = BiconomySAVersion.v2;

    async decodeSmartAccount(userOp: UserOperation): Promise<SmartAccountInfo> {
        console.log("IN BiconomySADecoderV2 decodeSmartAccount method", userOp);
        throw new Error("Method not implemented.");
    }
    
    async decodeIntent(userOp: UserOperation): Promise<IntentInfo> {
        console.log("IN BiconomySADecoderV2 decodeIntent method", userOp);
        throw new Error("Method not implemented.");
    }
}