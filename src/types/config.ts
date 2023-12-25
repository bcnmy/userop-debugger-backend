import { ModuleConstructor, ModuleInfo } from "./modules";
import { PaymasterConstructor, PaymasterDecoderConstructor, PaymasterInfo, PaymasterProvider } from "./paymaster";
import { SmartAccountProvider } from "./smartAccount";

export type PaymasterInfoExtended = PaymasterInfo & {
    implementationClass: PaymasterConstructor;
    decoderClass: PaymasterDecoderConstructor;
    entryPointAddress: string;
};

export type ModuleInfoExtended = ModuleInfo & {
    implementationClass: ModuleConstructor;
};

export type NetworkConfig = {
    [networkId: string]: {
        entryPointV6: string;
        nativeSymbol: string;
        supportedSAProviders: SmartAccountProvider[];
        supportedPaymasterProviders: PaymasterProvider[];
        modules: {
            [address: string] : ModuleInfoExtended
        };
        paymasters: {
            [address: string]: PaymasterInfoExtended
        };
        [SmartAccountProvider.BICONOMY]: {
            [version: string]: {
                subgraphUri: string;
                humanReadableABI: string[];
            }
        };
    };
};