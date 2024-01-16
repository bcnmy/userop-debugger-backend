import { DecodedError, JsonRpcError, UserOperation } from "../../../types";
import { ethers } from "ethers";

export type ErrorDecoderParams = {
    error: JsonRpcError;
    userOp: UserOperation;
    entryPointAddress: string;
    networkId: string;
    entryPointContractInstance: ethers.Contract;
}

export interface IErrorDecoder {
    decodeError(param: ErrorDecoderParams): Promise<DecodedError>;
}

export interface IErrorDecoderService {
    decodeError(param: ErrorDecoderParams): Promise<DecodedError[]>;
}