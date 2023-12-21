import { UserOperation } from "../../../types";
import { ISmartAccountDecoder } from "../interface/ISmartAccountDecoder";

class SmartAccountDecoderFactory {

    //TODO: Maintain a mapping of implementation of ISmartAccountDecoder for different providers
    
    static getSmartAccountDecoder(userOp: UserOperation): ISmartAccountDecoder {
        //TODO: Return correct implementation of SmartAccountDecoder based on userop fields like send and initCode
        throw new Error("Method not implemented.");
    }
}