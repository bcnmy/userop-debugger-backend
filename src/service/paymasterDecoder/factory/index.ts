import { networkConfig } from "../../../config/network";
import { PaymasterDecoderConstructor } from "../../../types";
import { UserOperation } from "../../../types/userOp";
import { EntryPointFactory } from "../../entryPoint/factory";
import { IPaymasterDecoder } from "../interface/IPaymasterDecoder";

export type GetPaymasterDecoderConfig = {
    networkId: string;
    entryPointAddress: string;
    userOp: UserOperation;
};
type PaymasterDecoderAddressMap = { [address: string]: IPaymasterDecoder };
type PaymasterNetworkMap = { [networkId: string]: PaymasterDecoderAddressMap };
export class PaymasterDecoderFactory {

    private static paymasterNetworkMap: PaymasterNetworkMap = {};

    static {
        Object.keys(networkConfig).forEach(networkId => {
            const networkPaymasters = networkConfig[networkId].paymasters;
            PaymasterDecoderFactory.paymasterNetworkMap[networkId] = {};

            if(networkPaymasters) {
                Object.keys(networkPaymasters).forEach(paymasterAddress => {
                    const paymasterConfig = networkPaymasters[paymasterAddress];
                    const PaymasterDecoderClass: PaymasterDecoderConstructor = paymasterConfig.decoderClass;
                    PaymasterDecoderFactory.paymasterNetworkMap[networkId][paymasterAddress] = new PaymasterDecoderClass({networkId});
                });
            }
        });
    };
    
    static getPaymasterDecoder(param: GetPaymasterDecoderConfig): IPaymasterDecoder {
        const {networkId, entryPointAddress, userOp} = param;
        const entryPointService = EntryPointFactory.getEntryPointService(entryPointAddress.toLowerCase());
        if(entryPointService) {
            const paymasterAddress = entryPointService.getPaymasterAddress(userOp);
            console.debug("PaymasterDecoderFactory.getPaymasterDecoder: paymasterAddress:", paymasterAddress);
            const paymasterDecoder = PaymasterDecoderFactory.paymasterNetworkMap[networkId][paymasterAddress.toLowerCase()];
            return paymasterDecoder;
        }
        throw new Error(`Unable to get paymaster decoder for networkId: ${networkId}, entryPointAddress: ${entryPointAddress}, userOp: ${userOp}`);
    }
}