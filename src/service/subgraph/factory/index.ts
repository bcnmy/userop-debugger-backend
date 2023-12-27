import { SubGraphClient } from "..";

export class SubGraphClientFactory {

    static map: Map<string, SubGraphClient>;
    
    static createClient(uri: string): SubGraphClient {
        if(!SubGraphClientFactory.map) {
            SubGraphClientFactory.map = new Map<string, SubGraphClient>();
        }
        let client = SubGraphClientFactory.map.get(uri);
        if(!client) {
            client = new SubGraphClient({
                uri: uri
            });
            SubGraphClientFactory.map.set(uri, client);
        }
        return client;
    }
}