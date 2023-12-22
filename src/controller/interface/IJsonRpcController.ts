export interface IJsonRpcController {
    handleParams(networkId: string, params: any[]): Promise<any>;
}