import { ModuleInfo, UserOperation } from "../../../types";

export interface IModule {
    getModuleInfo(userOp: UserOperation): Promise<ModuleInfo>;
    getName(): string;
}