import { IntentInfo, SmartAccountInfo, UserOperation } from "../../../types";

/**
 * ISmartAccountDecoder is the interface for Smart Account Decoder.
 * Each provider's SmartAccountDecoder must implement this interface.
 * Class implementing this interface should be named as <ProviderName>SmartAccountDecoder. For example, BiconomySmartAccountDecoder.
 * This interface is responsible for decoding the user operation and returning the Smart Account information.
 */
export interface ISmartAccountDecoder {
    /**
     * This method decodes the user operation and returns the Smart Account information based on
     * userOp.sender and userOp.initCode. Once it finds the correct Smart Account implementation,
     * it further should decode any module information it can get from the user operation.
     * @param userOp UserOperation object
     */
    decodeSmartAccount(userOp: UserOperation): Promise<SmartAccountInfo>;
    decodeIntent(userOp: UserOperation): Promise<IntentInfo>;
}