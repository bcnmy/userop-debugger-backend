import { UserOperation } from "../../../types/userOp";
import { IPaymasterDecoder } from "../interface/IPaymasterDecoder";

class PaymasterDecoderFactory {

    //TODO: Maintain a mapping of implementation of IPaymasterDecoder for different providers
    
    static getPaymasterDecoder(userOp: UserOperation): IPaymasterDecoder {
        //TODO: Return correct implementation of PaymasterDecoder based on userop fields like paymasterAndData
        throw new Error("Method not implemented.");
    }
}