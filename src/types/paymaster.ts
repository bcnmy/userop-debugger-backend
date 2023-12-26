export interface PaymasterInfo {
    provider?: PaymasterProvider;
    paymasterAddress: string;
    type: PaymasterType;
    gasPaymentToken?: TokenInfo;
    exchangeRate?: string;
}

export interface TokenInfo {
    address: string;
    symbol: string;
    decimals: number;
}

export enum PaymasterType {
    SPONSORSHIP_PAYMASTER = "SPONSORSHIP_PAYMASTER",
    ERC20_TOKEN_PAYMASTER = "ERC20_TOKEN_PAYMASTER"
}

export enum PaymasterProvider {
    BICONOMY = "BICONOMY",
}