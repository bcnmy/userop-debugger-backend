import { NetworkConfig } from "../types";
import { BiconomySAVersion, SmartAccountProvider } from "../types/smartAccount";
import { PaymasterProvider } from "../types/paymaster";
import { EntryPointV6Address } from ".";
import dotenv from "dotenv";
import { HttpTransport, createPublicClient, fallback, http } from "viem";
import {polygon} from "viem/chains"
dotenv.config();

export const splitProviderUrls = (providerUrls: string) => {
    if (providerUrls) {
        return providerUrls.split(',');
    } else {
        return [];
    }
}

// Add all addresses in lowercase
export const networkConfig: NetworkConfig = {
    "137": {
        entryPointV6: EntryPointV6Address.toLowerCase(),
        providerURLs: splitProviderUrls(process.env.MATIC_RPC_URLs as string),
        nativeSymbol: "Matic",
        chain: polygon,
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

export const getFallbackProviderTransport = (providerUrls: string[]) : HttpTransport[] => {
    return providerUrls.map((url) => { return http(url) });
}

export const getFallbackProviderTransportByNetworkId = (networkId: string) : HttpTransport[] => {
    const networkConfigEntry = networkConfig[networkId];
    return networkConfigEntry.providerURLs.map((url) => { return http(url) });
}

export const getViemPublicClient = (networkId: string) => {
    const networkConfigEntry = networkConfig[networkId];
    return createPublicClient({
        chain: networkConfigEntry.chain,
        transport: fallback(getFallbackProviderTransportByNetworkId(networkId)),
    });
}
