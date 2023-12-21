import { IntentInfo, SmartAccountInfo, UserOperation } from "../../../types";

export interface ISmartAccountDecoder {
    decodeSmartAccount(userOp: UserOperation): Promise<SmartAccountInfo>;
    decodeIntent(userOp: UserOperation): Promise<IntentInfo>;
}