import { PaymasterInfo, PaymasterProvider, PaymasterType } from "../../types";
import { EntryPointFactory } from "../entryPoint/factory";
import { PaymasterDecoderFactory } from "./factory";
import { DecodePaymasterConfig, IPaymasterDecoder } from "./interface/IPaymasterDecoder";

export type PaymasterDecoderConfig = {
    networkId: string;
}
export class PaymasterDecoderService implements IPaymasterDecoder {

    networkId: string;

    constructor(config: PaymasterDecoderConfig) {
        this.networkId = config.networkId;
    }

    async decodePaymaster(param: DecodePaymasterConfig): Promise<PaymasterInfo> {
        let paymasterInfo: PaymasterInfo;
        try {
            // Get paymaster decoder from PayamsterFactory and call decodeUserOp
            const paymasterDecoder = PaymasterDecoderFactory.getPaymasterDecoder({
                networkId: this.networkId,
                entryPointAddress: param.entryPointAddress,
                userOp: param.userOp
            });
            if(!paymasterDecoder) {
                throw new Error(`Unable to get paymaster decoder for networkId: ${this.networkId}, 
                    entryPointAddress: ${param.entryPointAddress}, paymasterAndData: ${param.userOp.paymasterAndData}`);
            }
            paymasterInfo = await paymasterDecoder.decodePaymaster(param);
        } catch (error) {
            let entryPointService = EntryPointFactory.getEntryPointService(param.entryPointAddress.toLowerCase());
            if(!entryPointService) {
                throw new Error(`Unable to get entry point service for entry point address: ${param.entryPointAddress}`);
            }
            let paymasterAddress = entryPointService.getPaymasterAddress(param.userOp);
            paymasterInfo = {
                name: "Unknown",
                provider: PaymasterProvider.UNKNOWN,
                paymasterAddress: paymasterAddress,
                type: PaymasterType.UNKNOWN
            }
        }
        return paymasterInfo;
    }
}