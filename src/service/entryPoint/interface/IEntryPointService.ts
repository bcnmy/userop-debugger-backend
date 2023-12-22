import { UserOperation } from "../../../types";

export interface IEntryPointService {
    getRequiredPreFund(userOp: UserOperation): bigint;
}