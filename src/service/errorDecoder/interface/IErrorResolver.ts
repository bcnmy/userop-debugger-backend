import { JsonRpcError, UserOperation } from "../../../types";
import { IErrorDecoder } from "./IErrorDecoder";

export type ErrorResolverParams = {
    error: JsonRpcError;
    userOp: UserOperation;
}

export interface IErrorResolver {
    resolve(param: ErrorResolverParams): Promise<IErrorDecoder>;
}