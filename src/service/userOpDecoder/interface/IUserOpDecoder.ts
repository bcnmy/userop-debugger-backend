import { DecodedUserOp, UserOperation } from "../../../types";

export type DecodeUserOpParam = {
    userOp: UserOperation;
    entryPointAddress: string;
}
export interface IUserOpDecoder {
    decodeUserOp(param: DecodeUserOpParam): Promise<DecodedUserOp>;
}