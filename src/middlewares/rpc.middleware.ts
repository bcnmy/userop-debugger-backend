import { Context } from "koa";

export const jsonRpcMiddleware = async (ctx: Context, next: Function) => {
    const req: JsonRpcRequest = ctx.request.body as JsonRpcRequest;

    if (!req || req.jsonrpc !== '2.0' || typeof req.method !== 'string') {
        ctx.body = { jsonrpc: '2.0', id: req.id || null, error: { code: -32600, message: 'Invalid Request' } };
        return;
    }

    try {
        const result = handleRpcMethod(req.method, req.params);
        ctx.body = { jsonrpc: '2.0', id: req.id, result };
        next();
    } catch (error) {
        ctx.body = { jsonrpc: '2.0', id: req.id, error: { code: -32603, message: 'Internal error' } };
    }

    next();
}

function handleRpcMethod(method: string, params: unknown) {
    switch (method) {
        case 'userOp':
            return userOp(params);
        default:
            throw new Error('Method not found');
    }
}
