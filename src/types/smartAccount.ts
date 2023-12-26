export interface SmartAccountInfo {
    provider?: SmartAccountProvider;
    smartAccountAddress: string;
    firstTransaction: boolean;
    factoryAddress?: string;
    modulesUsed: ModuleInfo[];
    moreInfo?: JSON;
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

export enum ExecutionType {
    SINGLE = "SINGLE",
    BATCH = "BATCH",
}

export enum ModuleType {
    VALIDATION = "VALIDATION",
    EXECUTION = "EXECUTION",
    HOOK = "HOOK",
}

export enum SmartAccountProvider {
    BICONOMY = "BICONOMY",
}

export enum BiconomySAVersion {
    v1 = "v1",
    v2 = "v2",
}