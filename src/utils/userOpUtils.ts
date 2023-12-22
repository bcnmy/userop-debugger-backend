import { UserOperation } from "../types";

export function isPaymasterUsed(userOp: UserOperation): boolean {
    if(userOp.paymasterAndData == "0x") {
        return false;
    }
    return true;
}

