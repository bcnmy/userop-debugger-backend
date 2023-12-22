import { networkConfig, supportedNetworks } from "../config";
import { PaymasterDecoderService } from "../service/paymasterDecoder";
import { SmartAccountDecoderService } from "../service/smartAccountDecoder";
import { ISmartAccountResolver } from "../service/smartAccountDecoder/interface/ISmartAccountResolver";
import { BiconomyResolver } from "../service/smartAccountDecoder/providers/biconomy/BiconomyResolver";
import { UserOpDecoderService } from "../service/userOpDecoder";
import { IUserOpDecoder } from "../service/userOpDecoder/interface/IUserOpDecoder";
import { BiconomySAVersion } from "../types";

const userOpDecoderMap = new Map<string, IUserOpDecoder>();
const smartAccountResolverMap = new Map<string, ISmartAccountResolver[]>();

supportedNetworks.forEach((networkId: string) => {

    let _networkConfig = networkConfig[networkId];
    if(_networkConfig) {
        let smartAccountDecoder = new SmartAccountDecoderService({ networkId });
        let paymasterDecoder = new PaymasterDecoderService({ networkId });
        userOpDecoderMap.set(networkId, new UserOpDecoderService({
            networkId,
            smartAccountDecoder,
            paymasterDecoder
        }));
    
        if(!smartAccountResolverMap.has(networkId)) {
            smartAccountResolverMap.set(networkId, []);
        }
    
        // Add Biconomy Resolver for Biconomy SA v2
        smartAccountResolverMap.get(networkId)?.push(new BiconomyResolver({
            networkId,
            uri: _networkConfig.BICONOMY[BiconomySAVersion.v2].subgraphUri,
            version: BiconomySAVersion.v2
        }));
    } else {
        throw new Error(`Network config not found for networkId: ${networkId}`);
    }
});

export function getUserOpDecoderService(networkId: string): IUserOpDecoder | undefined {
    return userOpDecoderMap.get(networkId);
}

export function getSmartAccountResolver(networkId: string): ISmartAccountResolver[] | undefined {
    return smartAccountResolverMap.get(networkId);
}