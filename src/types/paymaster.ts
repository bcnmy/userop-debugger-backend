import { IPaymaster } from "../repository/paymaster/interface";
import { PaymasterDecoderConfig } from "../service/paymasterDecoder";
import { IPaymasterDecoder } from "../service/paymasterDecoder/interface/IPaymasterDecoder";
import { PaymasterInfoExtended } from "./config";

export type PaymasterConstructor = new (config: PaymasterInfoExtended) => IPaymaster;
export type PaymasterDecoderConstructor = new (config: PaymasterDecoderConfig) => IPaymasterDecoder;

export interface PaymasterInfo {
    name: string;
    version: string;
    provider: PaymasterProvider;
    paymasterAddress: string;
    type: PaymasterType;
    gasPaymentToken?: TokenInfo;
    exchangeRate?: string;
    moreInfo?: {};
}

export interface TokenInfo {
    address: string;
    symbol: string;
    decimals: number;
}

export enum PaymasterType {
    SPONSORSHIP_PAYMASTER = "SPONSORSHIP_PAYMASTER",
    ERC20_TOKEN_PAYMASTER = "ERC20_TOKEN_PAYMASTER",
    UNKNOWN = "UNKNOWN"
}

export enum PaymasterProvider {
    BICONOMY = "BICONOMY",
    UNKNOWN = "UNKNOWN"
}