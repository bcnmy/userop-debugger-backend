import { DecodedError, ErrorSource } from "../../../../../types";
import { ErrorDecoderParams, IErrorDecoder } from "../../../interface/IErrorDecoder";

export class AA91Decoder implements IErrorDecoder {

    async decodeError(param: ErrorDecoderParams): Promise<DecodedError> {
        // Extract more information that is related to this error 
        let suggestedActions: string[] = [];

        if (param.beneficiaryAddress) {
            suggestedActions = [
                `Please check the native balance of entryPoint address: ${param.entryPointAddress} sent in he userOp.`,
                `It has insufficient balance to pay collected fees to beneficiary address ${param.beneficiaryAddress}.`
            ];
        }

        return {
            message: `Compensate the caller's beneficiary address: ${param.beneficiaryAddress} with the collected fees of all UserOperations`,
            errorSource: ErrorSource.ENTRY_POINT,
            suggestions: suggestedActions
        }
    }
}