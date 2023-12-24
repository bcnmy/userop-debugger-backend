import { formatEther } from "viem";
import { Actors, DecodedUserOp } from "../../types";
import { EntryPointFactory } from "../entryPoint/factory";
import { IPaymasterDecoder } from "../paymasterDecoder/interface/IPaymasterDecoder";
import { ISmartAccountDecoder } from "../smartAccountDecoder/interface/ISmartAccountDecoder";
import { DecodeUserOpParam, IUserOpDecoder } from "./interface/IUserOpDecoder";
import { networkConfig } from "../../config";
import { isPaymasterUsed } from "../../utils";

export type UserOpDecoderServiceConfig = {
    networkId: string;
    smartAccountDecoder: ISmartAccountDecoder;
    paymasterDecoder: IPaymasterDecoder;
}
export class UserOpDecoderService implements IUserOpDecoder {
    
    smartAccountDecoder: ISmartAccountDecoder;
    paymasterDecoder: IPaymasterDecoder;
    networkId: string;

    constructor(config: UserOpDecoderServiceConfig) {
        this.smartAccountDecoder = config.smartAccountDecoder;
        this.paymasterDecoder = config.paymasterDecoder;
        this.networkId = config.networkId;
    }

    async decodeUserOp(param: DecodeUserOpParam): Promise<DecodedUserOp> {
        try {
            let smartAccountInfo = await this.smartAccountDecoder.decodeSmartAccount(param.userOp);
            console.log("SmartAccountInfo ", smartAccountInfo);
            let intentInfo = await this.smartAccountDecoder.decodeIntent(param.userOp);
            console.log("IntentInfo ", intentInfo);
            let paymasterInfo = await this.paymasterDecoder.decodePaymaster(param.userOp);
    
            let entryPointService = EntryPointFactory.getEntryPointService(param.entryPointAddress.toLowerCase());
            let requiredPreFund = entryPointService.getRequiredPreFund(param.userOp);
            let symbol = networkConfig[this.networkId].nativeSymbol;
            let maxTransactionFee = `${formatEther(requiredPreFund)} ${symbol}`;
            
            let gasPaidBy: Actors;
            if(isPaymasterUsed(param.userOp)) {
                gasPaidBy = Actors.PAYMASTER;
            } else {
                gasPaidBy = Actors.SMART_ACCOUNT
            }
            
            console.log("MaxTransactionFee ", maxTransactionFee);
            console.log("GasPaidBy ", gasPaidBy);
            // Use SmartAccountDecoder and Paymaster Decoder instances to decodeUserOp
            return {
                smartAccount: smartAccountInfo,
                intent: intentInfo,
                paymaster: paymasterInfo,
                maxTransactionFee,
                gasPaidBy,
            }
        } catch(e) {
            console.log(e);
        }
        throw new Error("Unable to decode user operation");
    }
    
}