import { formatEther } from "viem";
import { networkConfig } from "../../../../../config/network";
import { EntryPointFactory } from "../../../../../repository/entryPoint/factory";
import { DecodedError, ErrorSource } from "../../../../../types";
import { ErrorDecoderParams, IErrorDecoder } from "../../../interface/IErrorDecoder";

export class AA21Decoder implements IErrorDecoder {
    async decodeError(param: ErrorDecoderParams): Promise<DecodedError> {
        // TODO: Extract more information that is related to this error eg., the amount of native balance the smart account has
        // and how much is needed to pay for the gas.
        let epService = EntryPointFactory.getEntryPointService(param.entryPointAddress);
        let requiredFunds;
        if(epService) {
            let maxTransactionFee = await epService.getRequiredPreFund(param.userOp);
            let symbol = networkConfig[param.networkId].nativeSymbol;
            requiredFunds = `${formatEther(maxTransactionFee)} ${symbol}`;
        }

        return {
            message: `Smart Account is supposed to pay for this userOp but it does not have enough native balance to pay for the gas.
            Max ${requiredFunds} is required to pay for the gas.}`,
            errorSource: ErrorSource.SMART_ACCOUNT
        }
    }
    
}