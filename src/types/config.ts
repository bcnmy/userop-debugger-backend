import { PaymasterProvider } from "./paymaster";
import { SmartAccountProvider } from "./smartAccount";

export type NetworkConfig = {
    [key: string]: {
        entryPointV6: string;
        nativeSymbol: string;
        smartAccountProvider: SmartAccountProvider[];
        paymasterProvider: PaymasterProvider[];
        [SmartAccountProvider.BICONOMY]: {
            [version: string]: {
                subgraphUri: string;
            }
        }
    };
};