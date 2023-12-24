import { SmartAccountFactory } from "../../../../repository/smart-account/factory";
import { ISmartAccount } from "../../../../repository/smart-account/interface";
import { BiconomySAVersion, SmartAccountProvider, UserOperation } from "../../../../types";
import { ISmartAccountDecoder } from "../../interface/ISmartAccountDecoder";
import { ISmartAccountResolver } from "../../interface/ISmartAccountResolver";
import { BiconomySADecoder } from "./BiconomySADecoder";

export type BiconomyResolverConfig = {
    networkId: string;
    version: BiconomySAVersion
}

/**
 * BiconomyResolver is the implementation of ISmartAccountResolver for Biconomy Smart Account.
 * It initializes the BiconomySADecoder and Biocnomy Smart Account in constructor based on the given networkId and version.
 * It relies on BiconomySmartAccount implementation to check if the given user operation belongs to Biconomy Smart Account.
 */
export class BiconomyResolver implements ISmartAccountResolver {

    networkId: string;
    version: string;
    decoder: ISmartAccountDecoder;
    smartAccount: ISmartAccount;
    
    constructor(config: BiconomyResolverConfig) {        
        this.version = config.version;
        this.networkId = config.networkId;
        this.decoder =  new BiconomySADecoder({    
            networkId: this.networkId,
            resolver: this,
            version: config.version,
        });
        this.smartAccount = SmartAccountFactory.getSmartAccount({
            provider: SmartAccountProvider.BICONOMY,
            version: config.version,
            networkId: config.networkId,
        });
    }

    async resolve(userOp: UserOperation): Promise<ISmartAccountDecoder | undefined> {
        if(this.smartAccount) {
            let canHandle = await this.smartAccount.canHandleUserOp(userOp);
            if(canHandle) {
                return this.decoder;
            }            
        }
        return undefined;
    }
}