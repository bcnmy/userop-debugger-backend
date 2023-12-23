import { SmartAccountInfo, UserOperation } from "../../../types";

/**
 * ISmartAccount is the interface for Smart Account. Each provider's SmartAccount must implement this interface
 * and provide the implementation for the methods.
 * Classes implementing this interface should be named as <ProviderName>SA<Version>. For example, BiconomySAV2.
 */
export interface ISmartAccount {
    /**
     * This method checks if the given userOp belongs to the Smart Account by checking the sender address 
     * and initCode.
     * @param userOp UserOperation object
     */
    canHandleUserOp(userOp: UserOperation): Promise<boolean>

    /**
     * This method decodes the user operation and returns the Smart Account information.
     * @param userOp UserOperation object
     */
    getSmartAccountInfo(userOp: UserOperation): Promise<SmartAccountInfo>
}