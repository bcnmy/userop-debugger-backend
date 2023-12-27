import { ModuleInfo } from "./modules";

export interface SmartAccountInfo {
    provider?: SmartAccountProvider;
    smartAccountAddress: string;
    version?: string;
    firstTransaction: boolean;
    deploymentTransaction: boolean;
    factoryAddress?: string;
    moduleUsedInDeployment?: ModuleInfo;
    moduleUsedInValidation?: ModuleInfo;
    erc7579Compatible?: boolean;
    moreInfo?: {};
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
    action: {};
}

export enum ExecutionType {
    SINGLE = "SINGLE",
    BATCH = "BATCH",
}

export enum SmartAccountProvider {
    BICONOMY = "BICONOMY",
}

export enum BiconomySAVersion {
    v1 = "v1",
    v2 = "v2",
}