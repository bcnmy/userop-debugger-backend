export interface IJsonRpcController {
    handleParams(params: any[]): Promise<any>;
}