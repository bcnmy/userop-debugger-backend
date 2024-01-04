import { DecodedError } from "../../types";
import { ErrorDecoderFactory } from "./factory";
import { ErrorDecoderParams, IErrorDecoderService } from "./interface/IErrorDecoder";

export type ErrorDecoderConfig = {
    networkId: string;
    entryPointAddress: string;
}

/**
 * ErrorDecoderService is a service that decodes the error and return human readable error messages.
 * It uses ErrorDecoderFactory to get all the decoders that can decode the error and runs them in parallel.
 * It returns the decoded error messages from all the decoders.
 */
export class ErrorDecoderService implements IErrorDecoderService {

    networkId: string;

    constructor(config: ErrorDecoderConfig) {
        this.networkId = config.networkId;
    }

    async decodeError(param: ErrorDecoderParams): Promise<DecodedError[]> {
        let errorDecoders = await ErrorDecoderFactory.getErrorDecoders({
            error: param.error,
            userOp: param.userOp,
            networkId: this.networkId,
            entryPointAddress: param.entryPointAddress
        });

        let decodedErrors: DecodedError[] = [];
        for (let decoder of errorDecoders) {
            if (decoder) { // Check if decoder is not undefined
                let decodedError = await decoder.decodeError(param);
                decodedErrors.push(decodedError);
            }
        }

        if (decodedErrors.length === 0) {
            throw new Error("No decoders were able to decode the error.");
        }
        console.log("Decoded Errors: ", decodedErrors);
        return decodedErrors;
    }
}