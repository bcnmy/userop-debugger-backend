import debugUserOpRequest from './request';
import Router from 'koa-router';

const router = new Router();

router.get('/api/v1/:networkId', debugUserOpRequest.middleware);

export default router;