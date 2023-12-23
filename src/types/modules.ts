import { IModule } from "../repository/modules/interface";

export type ModuleConstructor = new (config: ModuleInfo) => IModule;

export interface ModuleInfo {
    moduleAddress: string;
    provider: ModuleProvider;
    name: string;
    type: ModuleType;
    erc7579Compatible?: boolean;
    moreInfo?: {};
}

export enum ModuleProvider {
    BICONOMY = "BICONOMY",
}

export enum ModuleType {
    VALIDATION = "VALIDATION",
    EXECUTION = "EXECUTION",
    HOOK = "HOOK",
}
