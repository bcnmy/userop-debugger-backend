import { UserOperation } from "../../../types";
import { ISmartAccountDecoder } from "./ISmartAccountDecoder";

/**
 * ISmartAccountResolver is the interface for Smart Account Resolver.
 * Each provider's SmartAccountResolver must implement this interface.
 * Class implementing this interface should be named as <ProviderName>SmartAccountResolver. For example, BiconomySmartAccountResolver.
 * This interface is responsible for resolving the correct Smart Account Decoder for the given user operation.
 */
export interface ISmartAccountResolver {
    resolve(userOp: UserOperation): Promise<ISmartAccountDecoder | undefined>;
}