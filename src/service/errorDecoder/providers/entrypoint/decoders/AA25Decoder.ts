import { EntryPointFactory } from "../../../../../repository/entryPoint/factory";
import { DecodedError, ErrorSource } from "../../../../../types";
import { ErrorDecoderParams, IErrorDecoder } from "../../../interface/IErrorDecoder";
import { BigNumber } from '@ethersproject/bignumber';
import {ethers} from 'ethers';

export class AA25Decoder implements IErrorDecoder {

    async decodeError(param: ErrorDecoderParams): Promise<DecodedError> {
        // Extract more information that is related to this error 
        // expected accountNonce from the smart account and actual accountNonce from the userOp
        let epService = EntryPointFactory.getEntryPointService(param.entryPointAddress);
        let entryPointContractInstance = param.entryPointContractInstance;
        let userOpNonce: bigint | undefined = undefined;
        let accountNonceInEntryPoint: bigint | undefined = undefined;
        let senderAddress: string | undefined = undefined;
        let suggestedActions: string[] = [];
        if (epService) {
            userOpNonce = epService.getUserOpNonce(param.userOp);
            accountNonceInEntryPoint = await this.getAccountNonceFromEntryPoint(entryPointContractInstance, param.userOp.sender, userOpNonce);
            senderAddress = epService.getSenderAddress(param.userOp);
        }
        if (userOpNonce && accountNonceInEntryPoint && userOpNonce != accountNonceInEntryPoint) {
            suggestedActions = [
                `Please check the accountNonce of the sender in the userOp. It should be ${accountNonceInEntryPoint.toString()}.`,
                `You can query the accountNonce mapping of EntryPoint contract to get the correct accountNonce for the sender ${senderAddress}`
            ];
        }

        return {
            message: `The nonce: ${userOpNonce} of the sender in the userOp is not correct. It should be ${accountNonceInEntryPoint}.`,
            errorSource: ErrorSource.ENTRY_POINT,
            suggestions: suggestedActions
        }
    }

    // To get a value from the mapping `nonceSequenceNumber` in `NonceManager.sol`
    getAccountNonceKey(userOpNonce: bigint) : bigint {
        let nonce = BigNumber.from(userOpNonce);
        let seq = nonce.mask(64).toBigInt();
        return seq;
    }

    async getAccountNonceFromEntryPoint(entryPointContractInstance: ethers.Contract, userOpSender: string, userOpNonce: bigint) : Promise<bigint> {
        let accountNonceKey = this.getAccountNonceKey(userOpNonce);
        let nonceSequenceForSender = await entryPointContractInstance.nonceSequenceNumber(userOpSender, accountNonceKey);
        return nonceSequenceForSender;
    }
}