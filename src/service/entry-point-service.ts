import { Chain, PublicClient } from "viem";
import { createPublicClient, fallback } from "viem";

export class EntryPointContractService {
    entrypointContractAddress: string;
    publicClient: PublicClient;
    networkId: number;

    constructor(chain: Chain, entrypointContractAddress: string) {
      this.entrypointContractAddress = entrypointContractAddress;
      this.networkId = chain.id;
      this.publicClient = createPublicClient({
        chain: chain,
        transport: fallback(this.rpcUrls)
      });
    }

    async getRequiredPreFund(userOp: any) {
      //create viem public Client

      //using viem public client, get the required preFund from the entrypoint contract
        //return the required preFund
    }
  
  }