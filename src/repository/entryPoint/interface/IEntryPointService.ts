import { UserOperation } from "../../../types";

export interface IEntryPointService {
    getRequiredPreFund(userOp: UserOperation): bigint;
    getUserOpNonce(userOp: UserOperation): bigint;
    getSenderAddress(userOp: UserOperation): string;
    getPaymasterAddress(userOp: UserOperation): string;
    getPaymasterData(userOp: UserOperation): string;
}