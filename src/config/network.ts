import { ModuleProvider, ModuleType, NetworkConfig } from "../types";
import { BiconomySAVersion, SmartAccountProvider } from "../types/smartAccount";
import { PaymasterProvider, PaymasterType } from "../types/paymaster";
import { ECDSAOwnershipModule } from "../repository/modules/biconomy/ECDSAOwnershipModule";
import { BiconomySponsorshipPaymasterV1_1_0 } from "../repository/paymaster/biconomy/BiconomyPaymasterV1_1_0";
import { BiconomyPaymasterDecoder } from "../service/paymasterDecoder/providers/biconomy/BiconomyPaymasterDecoder";
import { EntryPointV6Address } from ".";

// Add all addresses in lowercase

export const networkConfig: NetworkConfig = {
    "137": {
        entryPointV6: EntryPointV6Address.toLowerCase(),
        nativeSymbol: "Matic",
        supportedSAProviders: [SmartAccountProvider.BICONOMY],
        supportedPaymasterProviders: [PaymasterProvider.BICONOMY],
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
        paymasters: {
            "0x00000f79b7faf42eebadba19acc07cd08af44789": {
                paymasterAddress: "0x00000f79b7faf42eebadba19acc07cd08af44789",
                provider: PaymasterProvider.BICONOMY,
                type: PaymasterType.SPONSORSHIP_PAYMASTER,
                name: "Biconomy Sponsorship Paymaster v1.1.0",
                entryPointAddress: EntryPointV6Address.toLowerCase(),
                implementationClass: BiconomySponsorshipPaymasterV1_1_0,
                decoderClass: BiconomyPaymasterDecoder
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
};
