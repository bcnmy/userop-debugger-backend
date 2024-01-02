import { UserOperation } from "../../../types/userOp";
import { EntryPointFactory } from "../../entryPoint/factory";
import { IPaymasterDecoder } from "../interface/IPaymasterDecoder";
import { BiconomyPaymasterDecoder } from "../providers/biconomy/BiconomyPaymasterDecoder";

export type GetPaymasterDecoderConfig = {
    networkId: string;
    entryPointAddress: string;
    userOp: UserOperation;
};

type PaymasterDecoderAddressMap = { [address: string]: IPaymasterDecoder };
type PaymasterNetworkMap = { [networkId: string]: PaymasterDecoderAddressMap };

export class PaymasterDecoderFactory {

    private static paymasterNetworkMap: PaymasterNetworkMap = {
        // Add network-specific mappings here
        "137": {
            "0x00000f79b7faf42eebadba19acc07cd08af44789": new BiconomyPaymasterDecoder({
                networkId: "137"
            }),
            "0x000031dd6d9d3a133e663660b959162870d755d4": new BiconomyPaymasterDecoder({
                networkId: "137"
            }),
            "0x00000f7365ca6c59a2c93719ad53d567ed49c14c": new BiconomyPaymasterDecoder({
                networkId: "137"
            }),
            // Add more paymaster addresses and their decoders as needed for this network
        },
        // Add more networks and their paymaster decoders as needed
    };

    // Default paymaster decoder map for addresses that are the same across networks
    private static defaultPaymasterDecoderMap: PaymasterDecoderAddressMap = {
        // Add more paymaster addresses and their decoders as needed
    };

    static getPaymasterDecoder(param: GetPaymasterDecoderConfig): IPaymasterDecoder {
        const { networkId, entryPointAddress, userOp } = param;
        const entryPointService = EntryPointFactory.getEntryPointService(entryPointAddress.toLowerCase());
        if (entryPointService) {
            const paymasterAddress = entryPointService.getPaymasterAddress(userOp).toLowerCase();
            const networkSpecificDecoder = PaymasterDecoderFactory.paymasterNetworkMap[networkId]?.[paymasterAddress];
            if (networkSpecificDecoder) {
                return networkSpecificDecoder;
            }
            const defaultDecoder = PaymasterDecoderFactory.defaultPaymasterDecoderMap[paymasterAddress];            
            if (defaultDecoder) {
                return defaultDecoder;
            }
            throw new Error(`Paymaster Decoder not found for paymaster address ${paymasterAddress}`);
        }
        throw new Error(`Entry point service not found in PaymasterDecoderFactory for entry point address ${entryPointAddress}`);
    }
}
