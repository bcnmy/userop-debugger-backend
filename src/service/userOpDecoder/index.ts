import { formatEther } from "viem";
import { Actors, DecodedUserOp } from "../../types";
import { EntryPointFactory } from "../../repository/entryPoint/factory";
import { IPaymasterDecoder } from "../paymasterDecoder/interface/IPaymasterDecoder";
import { ISmartAccountDecoder } from "../smartAccountDecoder/interface/ISmartAccountDecoder";
import { DecodeUserOpParam, IUserOpDecoder } from "./interface/IUserOpDecoder";
import { networkConfig } from "../../config/network";
import { isPaymasterUsed } from "../../utils";
import { ethers } from "ethers";

export type UserOpDecoderServiceConfig = {
    networkId: string;
    entryPointContractInstance: ethers.Contract;
    smartAccountDecoder: ISmartAccountDecoder;
    paymasterDecoder: IPaymasterDecoder;
}

export class UserOpDecoderService implements IUserOpDecoder {
    
    smartAccountDecoder: ISmartAccountDecoder;
    paymasterDecoder: IPaymasterDecoder;
    networkId: string;
    entryPointContractInstance: ethers.Contract;

    constructor(config: UserOpDecoderServiceConfig) {
        this.smartAccountDecoder = config.smartAccountDecoder;
        this.paymasterDecoder = config.paymasterDecoder;
        this.networkId = config.networkId;
        this.entryPointContractInstance = config.entryPointContractInstance;
    }

    async decodeUserOp(param: DecodeUserOpParam): Promise<DecodedUserOp> {
        try {
            let smartAccountInfo, intentInfo, paymasterInfo;

            try {
                smartAccountInfo = await this.smartAccountDecoder.decodeSmartAccount(param.userOp);
                console.log("SmartAccountInfo ", smartAccountInfo);
            } catch(e) {
                console.log("Error in decoding smart account: ", e);
            }
            try {
                intentInfo = await this.smartAccountDecoder.decodeIntent(param.userOp);
                console.log("IntentInfo ", intentInfo);
            } catch(e) {
                console.log("Error in decoding intent: ", e);
            }
            try {
                paymasterInfo = await this.paymasterDecoder.decodePaymaster({
                    entryPointAddress: param.entryPointAddress,
                    userOp: param.userOp,
                });
                console.log("PaymasterInfo ", paymasterInfo);
            } catch(e) {
                console.log("Error in decoding paymaster: ", e);
            }

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
            let decodedUserOp: DecodedUserOp = {
                maxTransactionFee,
                gasPaidBy,
            }
            if(smartAccountInfo) { 
                decodedUserOp.smartAccount = smartAccountInfo;
            }
            if(intentInfo) {
                decodedUserOp.intent = intentInfo;
            }
            if(paymasterInfo) {
                decodedUserOp.paymaster = paymasterInfo;
            }
            return decodedUserOp;
        } catch(e) {
            console.log(e);
        }
        throw new Error("Unable to decode user operation");
    }
    
}