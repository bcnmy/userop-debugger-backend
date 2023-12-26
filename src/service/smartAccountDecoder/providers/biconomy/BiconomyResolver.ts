import { BiconomySAVersion, UserOperation } from "../../../../types";
import { SubGraphClient } from "../../../subgraph";
import { ISmartAccountDecoder } from "../../interface/ISmartAccountDecoder";
import { ISmartAccountResolver } from "../../interface/ISmartAccountResolver";
import { BiconomySADecoderV2 } from "./BiconomySADecoder";

export type BiconomyResolverConfig = {
    uri: string;
    networkId: string;
    version: BiconomySAVersion
}

export class BiconomyResolver implements ISmartAccountResolver {

    client: SubGraphClient;
    networkId: string;
    version: string;
    decoder: Map<string, ISmartAccountDecoder>;
    
    constructor(config: BiconomyResolverConfig) {
        this.client = new SubGraphClient({
            uri: config.uri
        });
        this.version = config.version;
        this.networkId = config.networkId;
        this.decoder = new Map<string, ISmartAccountDecoder>();
        this.decoder.set(BiconomySAVersion.v2, new BiconomySADecoderV2);
    }

    async resolve(userOp: UserOperation): Promise<ISmartAccountDecoder | undefined> {
        let query = this.getSmartAccountSubgraphQuery(userOp.sender);
        let result = await this.client.query(query);
        if(result.data.accountCreations.length > 0 && this.version === BiconomySAVersion.v2) {
            return this.decoder.get(this.version);
        }
        return undefined;
    }

    private getSmartAccountSubgraphQuery(sender: string) : string {
        return `{
            accountCreations(where: {account:"${sender}"}) {
            id
            account
            initialAuthModule
            index
            }
        }`;
    }
}