import { ModuleInfo, ModuleProvider, ModuleType, UserOperation } from "../../../types";
import { IModule } from "../interface";

export class ECDSAOwnershipModule implements IModule {
    address: string;
    provider: ModuleProvider;
    name: string;
    type: ModuleType;
    erc7579Compatible?: boolean;

    constructor(config: ModuleInfo) {
        this.address = config.moduleAddress;
        this.provider = config.provider;
        this.name = config.name;
        this.type = config.type;
        this.erc7579Compatible = config.erc7579Compatible;
    }

    getName(): string {
        return this.name;
    }

    async getModuleInfo(_userOp: UserOperation): Promise<ModuleInfo> {
        let moduleInfo = {
            moduleAddress: this.address,
            provider: this.provider,
            name: this.name,
            type: this.type,
            erc7579Compatible: this.erc7579Compatible,
        };
        return moduleInfo;
    }
}