import { UserOperation } from "../types";

export function isPaymasterUsed(userOp: UserOperation): boolean {
    if(userOp.paymasterAndData == "0x") {
        return false;
    }
    return true;
}

//TODO: Also check if userOp.callData is not empty
export function isFirstTransaction(userOp: UserOperation): boolean {
    if(userOp.initCode == "0x") {
        return false;
    }
    return true;
}

export function isDeploymentTransaction(userOp: UserOperation): boolean {
    if(userOp.initCode == "0x") {
        return false;
    }
    return true;
}