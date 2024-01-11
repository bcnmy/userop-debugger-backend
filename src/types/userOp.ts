import { PaymasterInfo } from "./paymaster";
import { SmartAccountInfo, IntentInfo } from "./smartAccount";

export interface UserOperation {
    sender: string;
    nonce: string;
    initCode: string;
    callData: string;
    callGasLimit: string;
    verificationGasLimit: string;
    preVerificationGas: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    paymasterAndData: string;
    signature: string;
}

export interface DecodedUserOp {
    smartAccount?: SmartAccountInfo;
    paymaster?: PaymasterInfo;
    intent?: IntentInfo;
    maxTransactionFee: string;
    gasPaidBy: Actors;
}

export interface Error {
    code: number;
    message: string;
}

export interface DecodedError {
    message: string;
    errorSource: ErrorSource;
    suggestions: string[];
}

export enum ErrorSource {
    SMART_ACCOUNT = "SMART_ACCOUNT",
    PAYMASTER = "PAYMASTER",
    TARGET_CONTRACT = "TARGET_CONTRACT",
    UNKNOWN = "UNKNOWN",
}

export enum Actors {
    SMART_ACCOUNT = "SMART_ACCOUNT",
    PAYMASTER = "PAYMASTER",
}