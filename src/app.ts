import Koa from "koa";
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import router from "./routes";
import setRequestId from "./middlewares/request-id.middleware";
import errorHandler from "./middlewares/error-handler.middleware";
import responseTime from "./middlewares/response-time.middleware";
import { Mongo } from "./database";

export const createApp = async (mongo: Mongo) => {
    const app = new Koa();

    app.use(helmet());
    app.use(bodyParser());
    app.use(router.routes());
    app.use(setRequestId);
    app.use(errorHandler);
    app.use(responseTime);

    // inject mongo to context
    Object.assign(app.context, { db: mongo.db, client: mongo.client });

    return app;
}