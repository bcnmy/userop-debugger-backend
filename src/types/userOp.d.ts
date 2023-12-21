export interface UserOperation {
    sender: string;
    nonce: string;
    initCode: string;
    callData: string;
    callGasLimit: string;
    verificationGasLimit: string;
    preVerificationGas: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    paymasterAndData: string;
    signature: string;
}

export interface DecodedUserOp {
    smartAccount: SmartAccountInfo;
    paymaster: PaymasterInfo;
    intent: IntentInfo;
    maxTransactionFee: string;
    gasPaidBy: Actors;
}

export interface SmartAccountInfo {
    provider?: SmartAccountProvider;
    smartAccountAddress: string;
    firstTransaction: boolean;
    factoryAddress?: string;
    modulesUsed: ModuleInfo[];
    moreInfo?: JSON;
}

export interface PaymasterInfo {
    provider?: PaymasterProvider;
    paymasterAddress: string;
    type: PaymasterType;
    gasPaymentToken?: TokenInfo;
    exchangeRate?: string;
}

export interface IntentInfo {
    executionType: ExecutionType;
    targetContracts: TargetContract[];
    executionModule?: ModuleInfo;
}

export interface TargetContract {
    address: string;
    name: string;
    value: string;
    callData: string;
    action: JSON;
}

export interface ModuleInfo {
    moduleAddress: string;
    name: string;
    type: ModuleType;
    moreInfo?: JSON;
}

export interface TokenInfo {
    address: string;
    symbol: string;
    decimals: number;
}

export interface Error {
    code: number;
    message: string;
}

export interface DecodedError {
    message: string;
    type: ErrorType;
}

export enum ExecutionType {
    SINGLE = "SINGLE",
    BATCH = "BATCH",
}

export enum ErrorType {
    SMART_ACCOUNT = "SMART_ACCOUNT",
    PAYMASTER = "PAYMASTER",
    TARGET_CONTRACT = "TARGET_CONTRACT",
}

export enum Actors {
    SMART_ACCOUNT = "SMART_ACCOUNT",
    PAYMASTER = "PAYMASTER",
}

export enum SmartAccountProvider {
    BICONOMY = "BICONOMY",
    ZERO_DEV = "ZERO_DEV",
}

export enum PaymasterProvider {
    BICONOMY = "BICONOMY",
    ALCHEMY = "ALCHEMY",
    PIMLICO = "PIMLICO",
}

export enum ModuleType {
    VALIDATION = "VALIDATION",
    EXECUTION = "EXECUTION",
    HOOK = "HOOK",
}

export enum PaymasterType {
    SPONSORSHIP_PAYMASTER = "SPONSORSHIP_PAYMASTER",
    ERC20_TOKEN_PAYMASTER = "ERC20_TOKEN_PAYMASTER"
}