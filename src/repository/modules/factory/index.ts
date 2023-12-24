import { networkConfig } from "../../../config";
import { ModuleConstructor } from "../../../types";
import { IModule } from "../interface";

type ModuleAddressMap = { [address: string]: IModule };
type ModuleNetworkMap = { [networkId: string]: ModuleAddressMap };

/**
 * ModuleFactory is a singleton class that creates and stores all the module instances
 * for each network and module address based on the config file.
 */
export class ModuleFactory {
    private static moduleNetworkMap: ModuleNetworkMap = {};

    static {
        Object.keys(networkConfig).forEach(networkId => {
            const networkModules = networkConfig[networkId].modules;
            ModuleFactory.moduleNetworkMap[networkId] = {};

            Object.keys(networkModules).forEach(moduleAddress => {
                const moduleConfig = networkModules[moduleAddress];
                const ModuleClass: ModuleConstructor = moduleConfig.implementationClass;
                ModuleFactory.moduleNetworkMap[networkId][moduleAddress] = new ModuleClass(moduleConfig);
            });
        });
    }

    static getModule(networkId: string, moduleAddress: string): IModule | undefined {
        return ModuleFactory.moduleNetworkMap[networkId][moduleAddress];
    }
}