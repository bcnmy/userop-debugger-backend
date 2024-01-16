import { ModuleConstructor, ModuleInfo } from "./modules";
import { PaymasterInfo, PaymasterProvider } from "./paymaster";
import { SmartAccountProvider } from "./smartAccount";

export type PaymasterInfoExtended = PaymasterInfo & {
    entryPointAddress: string;
};

export type ModuleInfoExtended = ModuleInfo & {
    implementationClass: ModuleConstructor;
};

export type NetworkConfig = {
    [networkId: string]: {
        entryPointV6: string;
        providerURL: string;
        nativeSymbol: string;
        supportedSAProviders: SmartAccountProvider[];
        supportedPaymasterProviders: PaymasterProvider[];
        [SmartAccountProvider.BICONOMY]: {
            [version: string]: {
                subgraphUri: string;
                humanReadableABI: string[];
            }
        };
    };
};

export type PaymasterConfig = {
    [address: string]: PaymasterInfoExtended;
}

export type ModuleConfig = {
    [address: string]: ModuleInfo;
}