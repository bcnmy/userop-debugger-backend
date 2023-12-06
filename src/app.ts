import Koa from "koa";
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import Router from "koa-router";
import routes, { registerRoutes, } from "./routes";
import setRequestId from "./middlewares/request-id.middleware";
import errorHandler from "./middlewares/error-handler.middleware";
import responseTime from "./middlewares/response-time.middleware";

const apiRouter = new Router();

apiRouter.prefix("/api/v1");

routes.forEach((a: any) => apiRouter.use(a.middleware()));

export const createApp = async () => {
    const app = new Koa();

    app.use(helmet());
    app.use(cors());
    app.use(bodyParser());

    app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

    app.use(setRequestId);
    app.use(errorHandler);
    app.use(responseTime);

    registerRoutes(app);

    return app;
}