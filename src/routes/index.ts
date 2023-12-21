import Koa from 'koa';
import debugUserOpRequest from './request';
import Router from 'koa-router';

const router = new Router();

export const registerRoutes = (app: Koa) => {
    router.get('/request', debugUserOpRequest.middleware);
    app.use(router.routes());
    return app;
}
