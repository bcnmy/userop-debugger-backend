import { BiconomySAVersion, SmartAccountProvider } from "../../../types";
import { BiconomySAV2 } from "../biconomy/BiconomySAV2";
import { ISmartAccount } from "../interface";
import { supportedNetworks } from "../../../config";

type SmartAccountVersionMap = { [version: string]: () => ISmartAccount };
type SmartAccountProviderMap = { [provider: string]: SmartAccountVersionMap };
type SmartAccountNetworkMap = { [networkId: string]: SmartAccountProviderMap };

export type GetSmartAccountConfig = {
    networkId: string;
    provider: SmartAccountProvider;
    version: string
}
/**
 * Factory class to create SmartAccount instances based on networkId, provider and version,
 * It is usually used in provider's Resolver and Decoder classes
 */
export class SmartAccountFactory {
    
    private static smartAccountNetworkMap: SmartAccountNetworkMap = {};

    static {
        // Initialize the smartAccountNetworkMap
        supportedNetworks.forEach((networkId) => {
            // If a different implementation is needed for a network, this can be handled here
            this.smartAccountNetworkMap[networkId] = {
                [SmartAccountProvider.BICONOMY]: {
                    [BiconomySAVersion.v2]: () => new BiconomySAV2({ networkId }),
                    // Add other versions here
                },
                // Add other providers here
            };
        });
    }

    static getSmartAccount(params: GetSmartAccountConfig): ISmartAccount {
        const providerMap = this.smartAccountNetworkMap[params.networkId];
        if (!providerMap) {
            throw new Error(`Network ID ${params.networkId} is not supported.`);
        }

        const versionMap = providerMap[params.provider];
        if (!versionMap) {
            throw new Error(`Provider ${params.provider} is not supported for network ${params.networkId}.`);
        }

        const smartAccountCreator = versionMap[params.version];
        if (!smartAccountCreator) {
            throw new Error(`Version ${params.version} for provider ${params.provider} is not supported.`);
        }

        return smartAccountCreator();
    }
}