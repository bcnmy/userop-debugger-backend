import { gql, ApolloClient, InMemoryCache } from '@apollo/client/core';

export type SubGraphClientConfig = {
    uri: string;
}

export class SubGraphClient {

    client: ApolloClient<any>;

    constructor(config: SubGraphClientConfig) {
        if(!config.uri || config.uri === "") {
            throw new Error("Subgraph URI not provided");
        }
        
        this.client = new ApolloClient({
            uri: config.uri,
            cache: new InMemoryCache()
        });
    }

    query(query: string) {
        return this.client.query({
            query: gql(query),
        });
    }
}