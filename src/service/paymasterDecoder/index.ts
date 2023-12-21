import { UserOperation, PaymasterInfo } from "../../types";
import { IPaymasterDecoder } from "./interface/IPaymasterDecoder";

class PaymasterDecoderService implements IPaymasterDecoder {
    decodePaymaster(userOp: UserOperation): Promise<PaymasterInfo> {
        throw new Error("Method not implemented.");
    }
    
}