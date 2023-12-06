import { initServer } from "./server";

(async () => {
    const server = await initServer();

    process.once("SIGUSR2", async () => {
        await server.close();
        process.kill(process.pid, "SIGUSR2");
    });
})();