import { PaymasterInfo } from "../../types";
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

    decodePaymaster(param: DecodePaymasterConfig): Promise<PaymasterInfo> {
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
        return paymasterDecoder.decodePaymaster(param);
    }
}