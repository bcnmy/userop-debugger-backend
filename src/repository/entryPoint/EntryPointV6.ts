import { UserOperation } from "../../types";
import { isPaymasterUsed } from "../../utils";
import { IEntryPointService } from "./interface/IEntryPointService";
import { ethers } from "ethers";

export class EntryPointV6 implements IEntryPointService {
   
    getRequiredPreFund(userOp: UserOperation): bigint {
        let maxTransactionFee;

        let verificationGasLimit = BigInt(userOp.verificationGasLimit);
        let callGasLimit = BigInt(userOp.callGasLimit);
        let preVerificationGas = BigInt(userOp.preVerificationGas);
        let maxFeePerGas = BigInt(userOp.maxFeePerGas);

        if (isPaymasterUsed(userOp)) {
            maxTransactionFee = (verificationGasLimit + callGasLimit + preVerificationGas) * maxFeePerGas;
        } else {
            maxTransactionFee = ((verificationGasLimit * BigInt(3)) + callGasLimit + preVerificationGas) * maxFeePerGas;
        }
        return maxTransactionFee;
    }

    getSenderAddress(userOp: UserOperation): string {
        return userOp.sender;
    }

    getUserOpNonce(userOp: UserOperation): bigint {
        return userOp.nonce ? BigInt(userOp.nonce) : BigInt(0);
    }

    getPaymasterAddress(userOp: UserOperation): string {
        try {
            if (!userOp.paymasterAndData || userOp.paymasterAndData.length < 42) {
                throw new Error("Invalid or too short paymasterAndData provided");
            }
            // Extract the first 20 bytes (40 hex characters) for the address
            const paymasterAddress = `0x${userOp.paymasterAndData.slice(2, 42)}`;
            return paymasterAddress;
        } catch (error) {
            console.debug("Error in getPaymasterAddress:", error);
            throw new Error("Invalid paymasterAndData format provided");
        }
    }

    getPaymasterData(userOp: UserOperation): string {
        try {
            if (!userOp.paymasterAndData || userOp.paymasterAndData.length < 42) {
                throw new Error("Invalid or too short paymasterAndData provided");
            }
            // Extract the paymaster data, as first 20 bytes are paymaster address
            const paymasterData = `0x${userOp.paymasterAndData.slice(42)}`;

            return paymasterData;
        } catch (error) {
            console.debug("Error in getPaymasterAddress:", error);
            throw new Error("Invalid paymasterAndData format provided");
        }
    }

    //AA93: paymasterAndData.length >= UserOperationLib.PAYMASTER_DATA_OFFSET
    // AA40: if (mUserOp.verificationGasLimit + mUserOp.paymasterVerificationGasLimit < gasUsed) {
    //            revert FailedOp(opIndex, "AA40 over verificationGasLimit");
    //      }
    unpackPaymasterStaticFields(paymasterAndData: string): [string, bigint, bigint] {
        let paymasterAddress = ethers.getAddress(paymasterAndData.slice(0, 42));
        let paymasterVerificationGasLimit = BigInt('0x' + paymasterAndData.slice(42, 66));
        let paymasterPostOpGasLimit = BigInt('0x' + paymasterAndData.slice(66, 90));
        return [paymasterAddress, paymasterVerificationGasLimit, paymasterPostOpGasLimit];
    }
}
