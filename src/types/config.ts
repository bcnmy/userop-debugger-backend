import { ModuleConstructor, ModuleInfo } from "./modules";
import { PaymasterProvider } from "./paymaster";
import { SmartAccountProvider } from "./smartAccount";

export type NetworkConfig = {
    [networkId: string]: {
        entryPointV6: string;
        nativeSymbol: string;
        smartAccountProvider: SmartAccountProvider[];
        paymasterProvider: PaymasterProvider[];
        modules: {
            [address: string] : ModuleInfo & {
                implementationClass: ModuleConstructor
            }
        };
        [SmartAccountProvider.BICONOMY]: {
            [version: string]: {
                subgraphUri: string;
            }
        };
    };
};