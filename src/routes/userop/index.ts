import Router from 'koa-router';
import { userOp } from './handler';

const router = new Router();
router.get('/userop', userOp);

export default router;