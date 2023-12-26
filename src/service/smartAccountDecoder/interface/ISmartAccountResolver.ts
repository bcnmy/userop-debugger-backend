import { UserOperation } from "../../../types";
import { ISmartAccountDecoder } from "./ISmartAccountDecoder";

export interface ISmartAccountResolver {
    resolve(userOp: UserOperation): Promise<ISmartAccountDecoder | undefined>;
}