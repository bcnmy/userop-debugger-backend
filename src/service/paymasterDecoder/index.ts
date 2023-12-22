import { UserOperation, PaymasterInfo } from "../../types";
import { IPaymasterDecoder } from "./interface/IPaymasterDecoder";

export type PaymasterDecoderConfig = {
    networkId: string;
}
export class PaymasterDecoderService implements IPaymasterDecoder {

    networkId: string;

    constructor(config: PaymasterDecoderConfig) {
        this.networkId = config.networkId;
    }

    decodePaymaster(userOp: UserOperation): Promise<PaymasterInfo> {
        console.log(userOp)
        throw new Error("Method not implemented.");
    }
    
}