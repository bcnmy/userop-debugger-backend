export interface JsonRpcRequest {
    jsonrpc: string;
    method: string;
    params: any[]; // You can refine this to a more specific type if needed
    id: number | string | null;
}

export interface JsonRpcError {
    code: number;
    message: string;
}