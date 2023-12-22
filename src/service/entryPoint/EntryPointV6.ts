import { UserOperation } from "../../types";
import { isPaymasterUsed } from "../../utils";
import { IEntryPointService } from "./interface/IEntryPointService";

export class EntryPointV6 implements IEntryPointService {
    getRequiredPreFund(userOp: UserOperation): bigint {
        let maxTransactionFee;

        let verificationGasLimit = BigInt(userOp.verificationGasLimit);
        let callGasLimit = BigInt(userOp.callGasLimit);
        let preVerificationGas = BigInt(userOp.preVerificationGas);
        let maxFeePerGas = BigInt(userOp.maxFeePerGas);

        if(isPaymasterUsed(userOp)) {
            maxTransactionFee = (verificationGasLimit + callGasLimit + preVerificationGas) * maxFeePerGas;
        } else {
            maxTransactionFee = ((verificationGasLimit * BigInt(3)) + callGasLimit + preVerificationGas) * maxFeePerGas;
        }
        return maxTransactionFee;
    }
}