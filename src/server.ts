import { Server } from "http";
import https from "https";
import { createApp } from "./app";
import { SERVER_PORT } from "./config";
import { mongoConfig } from "./config/mongo"
import { Mongo, Options, createMongoClient } from "./database";


export const initServer = async () => {
    const mongo = await createMongoClient(mongoConfig as Options);

    return createServer(mongo);
}

export const createServer = async (mongo: Mongo) => {

    let server: Server | https.Server;

    const app = await createApp(mongo);

    const close = async () => {
        if (mongo) await mongo.close();
        if (server) server.close();
    }

    try {
        server = await app.listen(SERVER_PORT);

        console.info("Server started on port ", SERVER_PORT);

        return { close };
    } catch (error) {
        await close();
        throw error;
    }
}