import { NetworkConfig } from "../types";
import { BiconomySAVersion, SmartAccountProvider } from "../types/smartAccount";
import { PaymasterProvider } from "../types/paymaster";
import { EntryPointV6Address } from ".";

// Add all addresses in lowercase

export const networkConfig: NetworkConfig = {
    "137": {
        entryPointV6: EntryPointV6Address.toLowerCase(),
        nativeSymbol: "Matic",
        supportedSAProviders: [SmartAccountProvider.BICONOMY],
        supportedPaymasterProviders: [PaymasterProvider.BICONOMY],
        [SmartAccountProvider.BICONOMY]: {
            [BiconomySAVersion.v2]: {
                subgraphUri: process.env.BICONOMY_SA_V2_SUBGRAPH_URL || "",
                humanReadableABI: [
                    'function execute(address dest, uint256 value, bytes calldata func)',
                    'function executeBatch(address[] calldata dest, uint256[] calldata value, bytes[] calldata func)',
                    'function execute_ncC(address dest, uint256 value, bytes calldata func)',
                    'function executeBatch_y6U(address[] calldata dest, uint256[] calldata value, bytes[] calldata func)',
                ]
            }
        }
    }
};
