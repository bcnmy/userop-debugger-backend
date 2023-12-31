import { UserOperation } from "../../../types";

export interface IEntryPointService {
    getRequiredPreFund(userOp: UserOperation): bigint;
    getPaymasterAddress(userOp: UserOperation): string;
    getPaymasterData(userOp: UserOperation): string;
}