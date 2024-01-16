import { EntryPointV6Address, supportedNetworks } from "../config";
import { networkConfig } from "../config/network";
import { ErrorDecoderService } from "../service/errorDecoder";
import { IErrorDecoderService } from "../service/errorDecoder/interface/IErrorDecoder";
import { IErrorResolver } from "../service/errorDecoder/interface/IErrorResolver";
import { EntryPointV6ErrorResolver } from "../service/errorDecoder/providers/entrypoint/EntryPointV6ErrorResolver";
import { PaymasterDecoderService } from "../service/paymasterDecoder";
import { SmartAccountDecoderService } from "../service/smartAccountDecoder";
import { ISmartAccountResolver } from "../service/smartAccountDecoder/interface/ISmartAccountResolver";
import { BiconomyResolver } from "../service/smartAccountDecoder/providers/biconomy/BiconomyResolver";
import { UserOpDecoderService } from "../service/userOpDecoder";
import { IUserOpDecoder } from "../service/userOpDecoder/interface/IUserOpDecoder";
import { BiconomySAVersion } from "../types";
import  EntryPointV6ABI from "../abi/EntryPointV6.json";
import { ethers } from "ethers";

const userOpDecoderMap = new Map<string, IUserOpDecoder>();
const smartAccountResolverMap = new Map<string, ISmartAccountResolver[]>();
const errorDecoderMap = new Map<string, IErrorDecoderService>();
const errorResolverMap = new Map<string, IErrorResolver[]>();

supportedNetworks.forEach((networkId: string) => {

    let _networkConfig = networkConfig[networkId];
    if(_networkConfig) {
        let smartAccountDecoder = new SmartAccountDecoderService({ networkId });
        let paymasterDecoder = new PaymasterDecoderService({ networkId });
        const provider = new ethers.JsonRpcProvider(_networkConfig.providerURL);
        const entryPointContractInstance : ethers.Contract = new ethers.Contract(_networkConfig.entryPointV6, EntryPointV6ABI, provider);
        userOpDecoderMap.set(networkId, new UserOpDecoderService({
            networkId,
            entryPointContractInstance: entryPointContractInstance,
            smartAccountDecoder,
            paymasterDecoder,
        }));
        errorDecoderMap.set(networkId, new ErrorDecoderService({
            networkId,
            entryPointAddress: EntryPointV6Address
        }));
    
        if(!smartAccountResolverMap.has(networkId)) {
            smartAccountResolverMap.set(networkId, []);
        }
        // Add Biconomy Resolver for Biconomy SA v2
        smartAccountResolverMap.get(networkId)?.push(new BiconomyResolver({
            networkId,
            version: BiconomySAVersion.v2
        }));

        if(!errorResolverMap.has(networkId)) {
            errorResolverMap.set(networkId, []);
        }
        errorResolverMap.get(networkId)?.push(new EntryPointV6ErrorResolver({
            networkId 
        }));
        // Add more error resolvers here
    
    } else {
        throw new Error(`Network config not found for networkId: ${networkId}`);
    }
});

export function getUserOpDecoderService(networkId: string): IUserOpDecoder | undefined {
    return userOpDecoderMap.get(networkId);
}

export function getErrorDecoderService(networkId: string): IErrorDecoderService | undefined {
    return errorDecoderMap.get(networkId);
}

export function getSmartAccountResolvers(networkId: string): ISmartAccountResolver[] | undefined {
    return smartAccountResolverMap.get(networkId);
}

export function getErrorResolvers(networkId: string): IErrorResolver[] | undefined {
    return errorResolverMap.get(networkId);
}

export function getEntryPointContractInstance(networkId: string): ethers.Contract {
  const userOpDecoderService :UserOpDecoderService = userOpDecoderMap.get(networkId) as UserOpDecoderService;
  return userOpDecoderService?.entryPointContractInstance;
}