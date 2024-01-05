import Koa from 'koa';
import debugUserOpRequest from './request';
import Router from 'koa-router';
import { validateNetworkId } from '../middlewares/rpc-validation/network-validation.middleware';

const router = new Router();

export const registerRoutes = (app: Koa) => {
    router.post('/api/v1/chains', debugUserOpRequest.middleware);
    router.post('/api/v1/:networkId', validateNetworkId, debugUserOpRequest.middleware);
    router.post('/api/v1/:networkId/supported-entrypoints', validateNetworkId, debugUserOpRequest.middleware);
    app.use(router.routes());
    return app;
}
