import { UserOperation, PaymasterInfo } from "../../../types"

export interface PaymasterInfoParams {
    networkId: string,
    userOp: UserOperation
}
export interface IPaymaster {
    /**
     * This method checks if the given userOp belongs to the Paymaster by checking the paymasterAndData field.
     * @param userOp UserOperation object
     */
    canHandleUserOp(userOp: UserOperation): Promise<boolean>

    /**
     * This method decodes the user operation and returns the Paymaster information.
     * @param param PaymasterInfoParams object
     */
    getPaymasterInfo(param: PaymasterInfoParams): Promise<PaymasterInfo>
}