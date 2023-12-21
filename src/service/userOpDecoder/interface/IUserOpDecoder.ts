import { DecodedUserOp, UserOperation } from "../../../types";

export interface IUserOpDecoder {
    decodeUserOp(userOp: UserOperation): Promise<DecodedUserOp>;
}