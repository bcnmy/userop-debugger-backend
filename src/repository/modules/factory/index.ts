import { moduleConfig } from "../../../config/modules";
import { ECDSAOwnershipModule } from "../biconomy/ECDSAOwnershipModule";
import { IModule } from "../interface";

type ModuleAddressMap = { [address: string]: IModule };
type ModuleNetworkMap = { [networkId: string]: ModuleAddressMap };

export class ModuleFactory {
    private static moduleNetworkMap: ModuleNetworkMap = {
        "137": {
            "0x0000001c5b32f37f5bea87bdd5374eb2ac54ea8e": new ECDSAOwnershipModule(moduleConfig["0x0000001c5b32f37f5bea87bdd5374eb2ac54ea8e"])
            // Add more modules for this network as needed
        },
        // Add other networks as needed
    };

    // Default module map for modules that are the same across networks
    private static defaultModuleMap: ModuleAddressMap = {
        "0x0000001c5b32f37f5bea87bdd5374eb2ac54ea8e": new ECDSAOwnershipModule(moduleConfig["0x0000001c5b32f37f5bea87bdd5374eb2ac54ea8e"])
        // Add more modules as needed
    };

    static getModule(networkId: string, moduleAddress: string): IModule | undefined {
        // Check if there's a network-specific implementation
        const networkSpecificModule = ModuleFactory.moduleNetworkMap[networkId]?.[moduleAddress];
        if (networkSpecificModule) {
            return networkSpecificModule;
        }

        // Fallback to the default implementation
        return ModuleFactory.defaultModuleMap[moduleAddress];
    }
}
