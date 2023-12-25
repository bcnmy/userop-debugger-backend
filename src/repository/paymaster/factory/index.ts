import { networkConfig } from "../../../config/network";
import { PaymasterConstructor } from "../../../types";
import { IPaymaster } from "../interface";

type PaymasterAddressMap = { [address: string]: IPaymaster };
type PaymasterNetworkMap = { [networkId: string]: PaymasterAddressMap };

export class PaymasterFactory {
    private static paymasterNetworkMap: PaymasterNetworkMap = {};

    static {
        if(networkConfig) {
            Object.keys(networkConfig).forEach(networkId => {
                const networkPaymasters = networkConfig[networkId].paymasters;
                PaymasterFactory.paymasterNetworkMap[networkId] = {};
                if(networkPaymasters) {
                    Object.keys(networkPaymasters).forEach(paymasterAddress => {
                        const paymasterConfig = networkPaymasters[paymasterAddress];
                        const PaymasterClass: PaymasterConstructor = paymasterConfig.implementationClass;
                        PaymasterFactory.paymasterNetworkMap[networkId][paymasterAddress] = new PaymasterClass(paymasterConfig);
                    });
                }
            });
        }
    }

    static getPaymaster(networkId: string, paymasterAddress: string): IPaymaster | undefined {
        return PaymasterFactory.paymasterNetworkMap[networkId][paymasterAddress];
    }
}