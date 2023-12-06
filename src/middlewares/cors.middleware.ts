import koaCors from "koa2-cors";

export default () =>
    koaCors({
        origin: "*",
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: [
            "cache-control",
            "authorization",
            "content-type",
            "x-response-time",
        ],
    });