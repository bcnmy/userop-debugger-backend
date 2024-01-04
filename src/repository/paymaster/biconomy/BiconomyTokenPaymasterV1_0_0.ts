import { Hex, decodeAbiParameters } from "viem";
import { EntryPointFactory } from "../../entryPoint/factory";
import { IEntryPointService } from "../../entryPoint/interface/IEntryPointService";
import { UserOperation, PaymasterInfo, PaymasterInfoExtended, PaymasterProvider, PaymasterType } from "../../../types";
import { IPaymaster, PaymasterInfoParams } from "../interface";
import { formatDate, formatDuration, formatRelativeTime } from "../../../utils";

enum ExchangeRateSource {
    EXTERNAL_EXCHANGE_RATE,
    ORACLE_BASED
}

export class BiconomyTokenPaymasterV1_0_0 implements IPaymaster {

    name: string;
    address: string;
    type: PaymasterType;
    provider: PaymasterProvider;
    entryPointAddress: string;
    entryPointService: IEntryPointService;
    version: string;

    constructor(config: PaymasterInfoExtended) {
        this.name = config.name;
        this.address = config.paymasterAddress;
        this.type = config.type;
        this.provider = config.provider;
        this.entryPointAddress = config.entryPointAddress;
        this.entryPointService = EntryPointFactory.getEntryPointService(this.entryPointAddress);
        this.version = config.version;
    }
    
    async canHandleUserOp(userOp: UserOperation): Promise<boolean> {
        try {
            let paymasterAddressFromUserOp = this.entryPointService.getPaymasterAddress(userOp);
            if (paymasterAddressFromUserOp === this.address) {
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error in canHandleUserOp:", error);
            return false; // or handle error as appropriate for your system
        }
    }

    async getPaymasterInfo(param: PaymasterInfoParams): Promise<PaymasterInfo> {
        let { networkId: _networkId, userOp } = param;
        let paymasterInfo: PaymasterInfo = {
            name: this.name,
            provider: this.provider,
            paymasterAddress: this.entryPointService.getPaymasterAddress(userOp),
            type: this.type,
            version: this.version
        };
        
        // Extract more data from paymasterAndData as per Biconomy Token Paymaster v1.0.0
        if (userOp.paymasterAndData) {
            const paymasterAndData = userOp.paymasterAndData;

            // 20 bytes for paymasterAddress, 1 for '0x', 1 byte for priceSource
            const VALID_PND_OFFSET = (20 + 1 + 1) * 2; // Multiply by 2 for hex string
            const SIGNATURE_OFFSET = (213 + 1) * 2;

            // Decode priceSource (1 byte)
            const priceSourceByte = paymasterAndData.substring(VALID_PND_OFFSET - 2, VALID_PND_OFFSET);
            const priceSource = parseInt(priceSourceByte, 16);

            // Decode the rest using viem
            const dataToDecode = '0x' + paymasterAndData.substring(VALID_PND_OFFSET, SIGNATURE_OFFSET);
            const decoded = decodeAbiParameters(
                [
                    { name: 'validUntil', type: 'uint48' },
                    { name: 'validAfter', type: 'uint48' },
                    { name: 'feeToken', type: 'address' },
                    { name: 'oracleAggregator', type: 'address' },
                    { name: 'exchangeRate', type: 'uint256' },
                    { name: 'priceMarkup', type: 'uint32' }
                ],
                dataToDecode as Hex
            );

            const signature = '0x' + paymasterAndData.substring(SIGNATURE_OFFSET);

            paymasterInfo = {
                ...paymasterInfo,
                moreInfo: {
                    priceSource: ExchangeRateSource[priceSource],
                    validUntil: {
                        value: decoded[0],
                        formatted: formatDate(decoded[0])
                    },
                    validAfter: {
                        value: decoded[1],
                        formatted: formatDate(decoded[1])
                    },
                    expiringIn: formatRelativeTime(decoded[0]),
                    validityDuration: formatDuration(decoded[0], decoded[1]),
                    feeToken: decoded[2],
                    oracleAggregator: decoded[3],
                    exchangeRate: decoded[4].toString(),
                    priceMarkup: {
                        value: decoded[5],
                        percentage: this.calculatePercentageMarkup(decoded[5])
                    },
                    signature
                }
            };
        }
        return paymasterInfo;
    }
    
    private calculatePercentageMarkup(priceMarkup: number): string {
        const base = 1000000; // 10^6
        // Calculate percentage based on the provided logic
        let percentageMarkup = ((priceMarkup - base) / base) * 100;
    
        // Ensure that the percentage is not negative
        percentageMarkup = Math.max(0, percentageMarkup);
    
        // Format the output to two decimal places
        return percentageMarkup.toFixed(2) + '%';
    }
}