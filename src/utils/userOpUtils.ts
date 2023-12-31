import { ZEROX_ADDRESS } from "../config/constants";
import { UserOperation } from "../types";

export function isPaymasterUsed(userOp: UserOperation): boolean {
    if(userOp.paymasterAndData == ZEROX_ADDRESS) {
        return false;
    }
    return true;
}

//TODO: Also check if userOp.callData is not empty
export function isFirstTransaction(userOp: UserOperation): boolean {
    if(userOp.initCode == ZEROX_ADDRESS) {
        return false;
    }
    return true;
}

export function isDeploymentTransaction(userOp: UserOperation): boolean {
    if(userOp.initCode == ZEROX_ADDRESS) {
        return false;
    }
    return true;
}