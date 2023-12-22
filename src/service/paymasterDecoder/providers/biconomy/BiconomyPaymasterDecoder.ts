import { UserOperation, PaymasterInfo } from "../../../../types";
import { IPaymasterDecoder } from "../../interface/IPaymasterDecoder";

export class BiconomyPaymasterDecoder implements IPaymasterDecoder {

    decodePaymaster(userOp: UserOperation): Promise<PaymasterInfo> {
        // Decode userOp.paymasterAndData assuming it is a Biconomy paymaster
        throw new Error("Method not implemented.");
    }
}