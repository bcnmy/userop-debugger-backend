import { paymasterConfig } from "../../../config/paymasters";
import { BiconomySponsorshipPaymasterV1_0_0 } from "../biconomy/BiconomyPaymasterV1_0_0";
import { BiconomySponsorshipPaymasterV1_1_0 } from "../biconomy/BiconomyPaymasterV1_1_0";
import { BiconomyTokenPaymasterV1_0_0 } from "../biconomy/BiconomyTokenPaymasterV1_0_0";
import { IPaymaster } from "../interface";

type PaymasterAddressMap = { [address: string]: IPaymaster };
type PaymasterNetworkMap = { [networkId: string]: PaymasterAddressMap };

export type GetPaymasterConfig = {
    networkId?: string, 
    paymasterAddress: string
}
export class PaymasterFactory {
    private static paymasterNetworkMap: PaymasterNetworkMap = {
        // Add network-specific mappings here
        "137": { // Example for networkId "137"
            "0x00000f79b7faf42eebadba19acc07cd08af44789": 
                new BiconomySponsorshipPaymasterV1_1_0(paymasterConfig["0x00000f79b7faf42eebadba19acc07cd08af44789"])
        },
        // Add other networks as needed
    };

    // Default paymaster map for addresses that are the same across networks
    private static defaultPaymasterMap: PaymasterAddressMap = {
        "0x00000f79b7faf42eebadba19acc07cd08af44789": 
            new BiconomySponsorshipPaymasterV1_1_0(paymasterConfig["0x00000f79b7faf42eebadba19acc07cd08af44789"]),
        "0x000031dd6d9d3a133e663660b959162870d755d4":
            new BiconomySponsorshipPaymasterV1_0_0(paymasterConfig["0x000031dd6d9d3a133e663660b959162870d755d4"]),
        "0x00000f7365ca6c59a2c93719ad53d567ed49c14c":
            new BiconomyTokenPaymasterV1_0_0(paymasterConfig["0x00000f7365ca6c59a2c93719ad53d567ed49c14c"]),
    };

    static getPaymaster(param: GetPaymasterConfig): IPaymaster | undefined {
        const { networkId, paymasterAddress } = param;

        // Check if networkId is provided and there's a network-specific implementation
        if (networkId && PaymasterFactory.paymasterNetworkMap[networkId]) {
            const networkSpecificPaymaster = PaymasterFactory.paymasterNetworkMap[networkId][paymasterAddress];
            if (networkSpecificPaymaster) {
                return networkSpecificPaymaster;
            }
        }

        // Fallback to the default implementation
        return PaymasterFactory.defaultPaymasterMap[paymasterAddress];
    }
}
