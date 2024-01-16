import { EntryPointFactory } from "../../../../../repository/entryPoint/factory";
import { DecodedError, ErrorSource } from "../../../../../types";
import { ErrorDecoderParams, IErrorDecoder } from "../../../interface/IErrorDecoder";

export class AA25Decoder implements IErrorDecoder {

    async decodeError(param: ErrorDecoderParams): Promise<DecodedError> {
        // TODO: Extract more information that is related to this error 
        // eg., expected accountNonce from the smart account and actual accountNonce from the userOp
        let epService = EntryPointFactory.getEntryPointService(param.entryPointAddress);
        let userOpNonce: bigint | undefined = undefined;
        let accountNonceInEntryPoint: bigint | undefined = undefined;
        let senderAddress: string | undefined = undefined;
        let suggestedActions: string[] = [];
        if (epService) {
            userOpNonce = epService.getUserOpNonce(param.userOp);
            accountNonceInEntryPoint = epService.getAccountNonceOfSender(param.userOp);
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

}