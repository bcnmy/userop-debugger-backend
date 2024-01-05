import Koa from "koa";
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import { registerRoutes, } from "./routes";
import setRequestId from "./middlewares/request-id.middleware";
import errorHandler from "./middlewares/error-handler.middleware";
import responseTime from "./middlewares/response-time.middleware";
import corsMiddleware from "./middlewares/cors.middleware";

export const createApp = async () => {
    const app = new Koa();


    app.use(helmet());
    app.use(bodyParser());
    app.use(corsMiddleware());

    registerRoutes(app);

    app.use(setRequestId);
    app.use(errorHandler);
    app.use(responseTime);
    return app;
}