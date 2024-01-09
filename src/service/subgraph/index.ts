import { gql, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import fetch from 'cross-fetch';

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
            link: new HttpLink({ uri: config.uri, fetch }),
            cache: new InMemoryCache()
        });
    }

    query(query: string) {
        return this.client.query({
            query: gql(query),
        });
    }
}