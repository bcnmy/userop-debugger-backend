import mongodb, { Db, MongoClient } from "mongodb";

export type Options = {
    password?: string;
    username?: string;
    host: string;
    port: string | number;
    database: string;
    uri?: string;
};

export type Mongo = {
    db: mongodb.Db;
    client: mongodb.MongoClient;
    close: Function;
}

let db: Db;
let mongoClient: MongoClient;

const createMongo = async ({ database, host, port, password, uri: dbLocation, username }: Options) => {
    try {
        const auth = username || password ? `${username}:${password}@` : "";
        const uri = dbLocation || `mongodb://${auth}${host}:${port}/${database}`;

        mongoClient = await mongodb.MongoClient.connect(uri, {});

        db = await mongoClient.db(database);
    } catch (error) {
        console.error("Error create mongodb", error);
        throw error;
    }
}

export const createMongoClient = async (options: Options): Promise<Mongo> => {
    await createMongo(options);
    return { client: mongoClient, db, close: mongoClient.close };
}

export const getMongo = (): Mongo => {
    if (!db || !mongoClient) throw new Error("Mongo not initialized");
    return { client: mongoClient, db, close: mongoClient.close }
}