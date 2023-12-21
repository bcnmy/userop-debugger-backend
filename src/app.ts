import Koa from "koa";
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import router from "./routes";
import setRequestId from "./middlewares/request-id.middleware";
import errorHandler from "./middlewares/error-handler.middleware";
import responseTime from "./middlewares/response-time.middleware";

export const createApp = async () => {
    const app = new Koa();

    app.use(helmet());
    app.use(bodyParser());
    app.use(router.routes());
    app.use(setRequestId);
    app.use(errorHandler);
    app.use(responseTime);

    return app;
}