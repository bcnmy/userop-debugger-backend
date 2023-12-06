import { ParsedError, TransactionResult, UserOperation } from "../types";

export abstract class UserOpController {

    abstract parseError(error: any): ParsedError;

    abstract simulateTransaction(userOp: UserOperation): Promise<TransactionResult>;
}