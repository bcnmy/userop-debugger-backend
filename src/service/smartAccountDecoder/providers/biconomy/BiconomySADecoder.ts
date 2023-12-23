import { SmartAccountFactory } from "../../../../repository/smart-account/factory";
import { ISmartAccount } from "../../../../repository/smart-account/interface";
import { 
    UserOperation, SmartAccountInfo, IntentInfo, 
    BiconomySAVersion, SmartAccountProvider} from "../../../../types";
import { ISmartAccountDecoder } from "../../interface/ISmartAccountDecoder";
import { BiconomyResolver } from "./BiconomyResolver";

export type BiconomySADecoderConfig = {
    version: BiconomySAVersion;
    networkId: string;
    resolver: BiconomyResolver;
}
/**
 * BiconomySADecoder is the implementation of ISmartAccountDecoder for Biconomy Smart Account.
 * It initializes the correct Biconomy SmartAccount instance based on the version and networkId
 * and uses it to decode the user operation in decodeSmartAccount method.
 */
export class BiconomySADecoder implements ISmartAccountDecoder {
    
    version: BiconomySAVersion;
    networkId: string;
    resolver: BiconomyResolver;
    smartAccount: ISmartAccount;

    constructor(config: BiconomySADecoderConfig) {
        this.networkId = config.networkId;
        this.resolver = config.resolver;
        this.version = config.version;
        this.smartAccount = SmartAccountFactory.getSmartAccount({
            provider: SmartAccountProvider.BICONOMY,
            version: config.version,
            networkId: config.networkId,
        });
    }

    async decodeSmartAccount(userOp: UserOperation): Promise<SmartAccountInfo> {
        return this.smartAccount.getSmartAccountInfo(userOp);
    }

    async decodeIntent(userOp: UserOperation): Promise<IntentInfo> {
        console.log("IN BiconomySADecoderV2 decodeIntent method", userOp);
        throw new Error("Method not implemented.");
    }
}