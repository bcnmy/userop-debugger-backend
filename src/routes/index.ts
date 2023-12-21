import debugUserOpRequest from './request';
import Router from 'koa-router';

const router = new Router();

router.post('/request', debugUserOpRequest.middleware);

export default router;