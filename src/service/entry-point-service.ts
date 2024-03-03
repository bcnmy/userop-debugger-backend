import { Chain, PublicClient } from "viem";

export class EntryPointContractService {
    entrypointContractAddress: string;
    publicClient: PublicClient;
    networkId: number;

    constructor(chain: Chain, entrypointContractAddress: string, _publicClient: PublicClient) {
        this.entrypointContractAddress = entrypointContractAddress;
        this.networkId = chain.id;
        this.publicClient = _publicClient;
    }

    async getRequiredPreFund(userOp: any) {
        //create viem public Client

        //using viem public client, get the required preFund from the entrypoint contract
        //return the required preFund
        //const requiredPreFundData = await this.publicClient.readContract(this.entrypointContractAddress, "getRequiredPreFund", [userOp]);
    }

}