import Koa from 'koa';
import userOp from './userop';

export const registerRoutes = (app: Koa) => {
    app.use(userOp.middleware());
    return app;
}

export default [userOp]