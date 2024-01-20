import { DecodedError, ErrorSource } from "../../../../../types";
import { ErrorDecoderParams, IErrorDecoder } from "../../../interface/IErrorDecoder";
import {ethers} from 'ethers';

export class AA90Decoder implements IErrorDecoder {

    async decodeError(param: ErrorDecoderParams): Promise<DecodedError> {
        // Extract more information that is related to this error 
        let suggestedActions: string[] = [];

        if (!param.userOp.beneficiary || param.userOp.beneficiary === '0x' || param.userOp.beneficiary === ethers.ZeroAddress) {
            suggestedActions = [
                `Please check the beneficiary address sent in he userOp. It should not be ZeroAddress or 0x or null.`,
                `You can populate the sender address in case if you are not using paymaster`
            ];
        }

        return {
            message: `The beneficiary: ${param.userOp.beneficiary} in the userOp is not correct. It should be non-zero address.`,
            errorSource: ErrorSource.ENTRY_POINT,
            suggestions: suggestedActions
        }
    }
}