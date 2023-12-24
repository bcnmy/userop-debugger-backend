import { config } from "dotenv";
import { resolve } from "path";
import { ModuleProvider, ModuleType, NetworkConfig } from "../types";
import { BiconomySAVersion, SmartAccountProvider } from "../types/smartAccount";
import { PaymasterProvider } from "../types/paymaster";
import { ECDSAOwnershipModule } from "../repository/modules/biconomy/ECDSAOwnershipModule";
config({ path: resolve(__dirname, "../../.env") });

export const SERVER_PORT = Number(process.env.PORT) || 8000;
export const BASE_URL = process.env.BASE_URL
export const EntryPointV6Address = "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789";

export const supportedNetworks: string[] = process.env.SUPPORTED_NETWORKS ? JSON.parse(process.env.SUPPORTED_NETWORKS) : ["137"];

// Add all addresses in lowercase
export const networkConfig: NetworkConfig = {
    "137" : {
        entryPointV6: EntryPointV6Address.toLowerCase(),
        nativeSymbol: "Matic",
        smartAccountProvider: [SmartAccountProvider.BICONOMY],
        paymasterProvider: [PaymasterProvider.BICONOMY],
        modules: {
            "0x0000001c5b32f37f5bea87bdd5374eb2ac54ea8e": {
                moduleAddress: "0x0000001c5b32f37f5bea87bdd5374eb2ac54ea8e",
                name: "EcdsaOwnershipModule",
                type: ModuleType.VALIDATION,
                erc7579Compatible: false,
                provider: ModuleProvider.BICONOMY,
                implementationClass: ECDSAOwnershipModule
            }
        },
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
}
