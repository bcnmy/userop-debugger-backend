import { DecodedUserOp, UserOperation } from "../types";

export interface IUserOpController<T extends UserOperation> {
    decodeUserOp(userOp: T): DecodedUserOp;
}

