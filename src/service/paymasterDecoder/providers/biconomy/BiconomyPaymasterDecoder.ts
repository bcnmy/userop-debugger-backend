import { PaymasterFactory } from "../../../../repository/paymaster/factory";
import { PaymasterInfo } from "../../../../types";
import { EntryPointFactory } from "../../../entryPoint/factory";
import { DecodePaymasterConfig, IPaymasterDecoder } from "../../interface/IPaymasterDecoder";

export type BiconomyPaymasterDecoderConfig = {
    networkId?: string;
};
export class BiconomyPaymasterDecoder implements IPaymasterDecoder {

    networkId?: string;

    constructor(config: BiconomyPaymasterDecoderConfig) {
        this.networkId = config.networkId;
    }

    decodePaymaster(param: DecodePaymasterConfig): Promise<PaymasterInfo> {
        let entryPointAddress = param.entryPointAddress;
        let userOp = param.userOp;

        let entryPointService = EntryPointFactory.getEntryPointService(entryPointAddress.toLowerCase());
        let paymasterAddress = entryPointService.getPaymasterAddress(userOp);
        let paymaster = PaymasterFactory.getPaymaster({
            networkId: this.networkId, 
            paymasterAddress
        });
        if(paymaster && this.networkId) {
            return paymaster.getPaymasterInfo({userOp, networkId: this.networkId});
        }
        throw new Error("Unable to decode paymaster");
    }
}