import { Context, Next } from 'koa';
import { v4 as uuid } from 'uuid';

const setRequestId = async (ctx: Context, next: Next): Promise<void> => {
    await next();

    ctx.set('X-Request-Id', uuid());
};

export default setRequestId;