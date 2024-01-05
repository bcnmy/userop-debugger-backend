import { DecodedError, JsonRpcError, UserOperation } from "../../../types";

export type ErrorDecoderParams = {
    error: JsonRpcError;
    userOp: UserOperation;
    entryPointAddress: string;
    networkId: string;
}

export interface IErrorDecoder {
    decodeError(param: ErrorDecoderParams): Promise<DecodedError>;
}

export interface IErrorDecoderService {
    decodeError(param: ErrorDecoderParams): Promise<DecodedError[]>;
}