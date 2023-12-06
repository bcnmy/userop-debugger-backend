import { Server } from "http";
import https from "https";
import { createApp } from "./app";
import { SERVER_PORT } from "./config";


export const initServer = async () => {
    // @todo configure database
    return createServer();
}

export const createServer = async () => {

    let server: Server | https.Server;

    const app = await createApp();

    const close = async () => {
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