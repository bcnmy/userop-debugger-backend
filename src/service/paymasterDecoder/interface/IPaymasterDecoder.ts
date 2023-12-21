import { UserOperation, PaymasterInfo } from "../../../types";

export interface IPaymasterDecoder {
    decodePaymaster(userOp: UserOperation): Promise<PaymasterInfo>;
}