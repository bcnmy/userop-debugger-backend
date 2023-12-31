import { UserOperation, PaymasterInfo } from "../../../types";

export type DecodePaymasterConfig = {
    entryPointAddress: string;
    userOp: UserOperation;
};
export interface IPaymasterDecoder {
    decodePaymaster(param: DecodePaymasterConfig): Promise<PaymasterInfo>;
}