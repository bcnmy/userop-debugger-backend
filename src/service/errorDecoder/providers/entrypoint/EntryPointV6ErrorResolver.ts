import { IErrorDecoder } from "../../interface/IErrorDecoder";
import { ErrorResolverParams, IErrorResolver } from "../../interface/IErrorResolver";
import { AA21Decoder } from "./decoders/AA21Decoder";

export type EPV6ErrorResolverParam = {
    networkId: string;
}

/**
 * EntryPointV6ErrorResolver is responsible for returning the correct Error Decoder for a given
 * error object and network id.
 * It maintains a map of error codes to their respective Error Decoders classes.
 */
export class EntryPointV6ErrorResolver implements IErrorResolver {

    networkId: string;

    constructor(param: EPV6ErrorResolverParam) {
        this.networkId = param.networkId;
    }
    
    private errorDecoderMap: { [code: string]: IErrorDecoder } = {
        'AA21': new AA21Decoder(),
        // ... map other error codes to their respective decoder classes
    };

    async resolve(param: ErrorResolverParams): Promise<IErrorDecoder> {
        let { error } = param;
        
        for (const code of Object.keys(this.errorDecoderMap)) {
            if (error.message.includes(code)) {
                return this.errorDecoderMap[code];
            }
        }

        throw new Error("No suitable error decoder found.");
    }
    
}